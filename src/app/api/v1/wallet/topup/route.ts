import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { walletTopupSchema } from '@/lib/validation/validators'
import { badRequest, ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'
import { getPaymentService } from '@/lib/services/payments'
import { kobo, genRef } from '@/lib/utils/helpers'
import { getOrCreateIdempotency, completeIdempotency, hashRequest } from '@/lib/idempotency'
import { rateLimit } from '@/lib/security/rate-limit'

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, 'wallet:topup')
  if (!rl.allowed) return badRequest(`rate limit exceeded. retry in ${rl.retryAfter}s`)

  try {
    const auth = await requireAuth(req)
    const json = await req.json()
    const parsed = walletTopupSchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())

    const idk = req.headers.get('Idempotency-Key') || genRef('IDEMP')
    const reqHash = await hashRequest(parsed.data)
    await getOrCreateIdempotency(idk, reqHash)

    const wallet = await prisma.wallet.findFirst({ where: { userId: auth.sub } })
    if (!wallet) return badRequest('wallet not found')

    const reference = genRef('TOPUP')
    await prisma.transaction.create({ data: { walletId: wallet.id, type: 'TOPUP', status: 'PENDING', amountKobo: kobo(parsed.data.amount), reference, description: 'Wallet top-up' } })

    const pay = getPaymentService()
    const { paymentUrl } = await pay.checkout({ email: parsed.data.email, amount: parsed.data.amount, reference, callback_url: parsed.data.callbackUrl, metadata: parsed.data.metadata })

    await completeIdempotency(idk, { reference })
    return ok({ paymentUrl, reference })
  } catch (error) {
    console.error(error)
    return serverError('failed to init topup')
  }
}
