import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { spendCodeRedeemSchema } from '@/lib/validation/validators'
import { badRequest, ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'
import { genRef } from '@/lib/utils/helpers'
import { getOrCreateIdempotency, completeIdempotency, hashRequest } from '@/lib/idempotency'
import { rateLimit } from '@/lib/security/rate-limit'

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, 'spendcode:redeem')
  if (!rl.allowed) return badRequest(`rate limit exceeded. retry in ${rl.retryAfter}s`)

  try {
    const auth = await requireAuth(req) // vendor
    const json = await req.json()
    const parsed = spendCodeRedeemSchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())

    const vendorWallet = await prisma.wallet.findFirst({ where: { userId: auth.sub } })
    if (!vendorWallet) return badRequest('vendor wallet not found')

    const idk = req.headers.get('Idempotency-Key') || genRef('IDEMP')
    const reqHash = await hashRequest(parsed.data)
    await getOrCreateIdempotency(idk, reqHash)

    const spend = await prisma.spendCode.findUnique({ where: { code: parsed.data.code } })
    if (!spend) return badRequest('invalid code')
    if (spend.redeemedAt) return badRequest('code already redeemed')
    if (spend.expiresAt < new Date()) return badRequest('code expired')

    const consumerWallet = await prisma.wallet.findUnique({ where: { id: spend.walletId } })
    if (!consumerWallet) return badRequest('consumer wallet not found')
    if (consumerWallet.balanceKobo < spend.amountKobo) return badRequest('insufficient consumer balance')

    const ref = genRef('SPEND')

    await prisma.$transaction(async (db) => {
      await db.wallet.update({ where: { id: consumerWallet.id }, data: { balanceKobo: { decrement: spend.amountKobo } } })
      await db.wallet.update({ where: { id: vendorWallet.id }, data: { balanceKobo: { increment: spend.amountKobo } } })
      await db.transaction.create({ data: { walletId: consumerWallet.id, type: 'SPEND_REDEEM', status: 'SUCCESS', amountKobo: spend.amountKobo, reference: ref, description: 'Spend code redeem', counterpartyWalletId: vendorWallet.id } })
      await db.transaction.create({ data: { walletId: vendorWallet.id, type: 'TRANSFER_IN', status: 'SUCCESS', amountKobo: spend.amountKobo, reference: ref, description: 'Spend code redeem', counterpartyWalletId: consumerWallet.id } })
      await db.spendCode.update({ where: { id: spend.id }, data: { redeemedAt: new Date() } })
    })

    await completeIdempotency(idk, { reference: ref })

    return ok({ reference: ref })
  } catch (error) {
    console.error(error)
    return serverError('failed to redeem')
  }
}
