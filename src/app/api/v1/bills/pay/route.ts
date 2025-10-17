import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { billsPaySchema } from '@/lib/validation/validators'
import { badRequest, ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'
import { genRef, kobo } from '@/lib/utils/helpers'
import { getOrCreateIdempotency, completeIdempotency, hashRequest } from '@/lib/idempotency'
import { rateLimit } from '@/lib/security/rate-limit'

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, 'bills:pay')
  if (!rl.allowed) return badRequest(`rate limit exceeded. retry in ${rl.retryAfter}s`)

  try {
    const auth = await requireAuth(req)
    const json = await req.json()
    const parsed = billsPaySchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())

    const wallet = await prisma.wallet.findFirst({ where: { userId: auth.sub } })
    if (!wallet) return badRequest('wallet not found')

    const amountKobo = kobo(parsed.data.amount)
    if (wallet.balanceKobo < amountKobo) return badRequest('insufficient balance')

    const idk = req.headers.get('Idempotency-Key') || genRef('IDEMP')
    const reqHash = await hashRequest(parsed.data)
    await getOrCreateIdempotency(idk, reqHash)

    const reference = genRef('BILL')

    await prisma.$transaction(async (db) => {
      await db.wallet.update({ where: { id: wallet.id }, data: { balanceKobo: { decrement: amountKobo } } })
      await db.billPayment.create({ data: { userId: auth.sub, walletId: wallet.id, provider: parsed.data.provider, productCode: parsed.data.productCode, amountKobo, reference, status: 'PENDING' } })
      await db.transaction.create({ data: { walletId: wallet.id, type: 'BILL_PAYMENT', status: 'PENDING', amountKobo, reference, description: `${parsed.data.provider} - ${parsed.data.productCode}` } })
    })

    await completeIdempotency(idk, { reference })
    // In real integration, enqueue job to call provider

    return ok({ reference, status: 'PENDING' })
  } catch (error) {
    console.error(error)
    return serverError('failed to pay bill')
  }
}
