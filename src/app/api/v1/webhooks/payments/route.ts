import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { Prisma } from '@prisma/client'
import crypto from 'crypto'
import { getPaymentService } from '@/lib/services/payments'

function verifyPaystackSignature(rawBody: string, signature: string | null) {
  const secret = process.env.PAYSTACK_SECRET_KEY || ''
  if (!signature) return false
  const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex')
  return hash === signature
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  const sig = req.headers.get('x-paystack-signature')
  if (!verifyPaystackSignature(raw, sig)) {
    return new NextResponse('invalid signature', { status: 401 })
  }

  const event = JSON.parse(raw)
  try {
    if (event.event === 'charge.success' || event.event === 'paymentrequest.success') {
      const reference: string = event.data.reference
      const tx = await prisma.transaction.findUnique({ where: { reference } })
      if (!tx || tx.status === 'SUCCESS') return NextResponse.json({ ok: true })

      // verify with provider
      const pay = getPaymentService()
      const verify = await pay.confirm(reference)
      if (verify.status !== 'success') return NextResponse.json({ ok: true })

      await prisma.$transaction(async (db) => {
  await db.transaction.update({ where: { id: tx.id }, data: { status: 'SUCCESS', metadata: verify as unknown as Prisma.InputJsonValue } })
  await db.wallet.update({ where: { id: tx.walletId }, data: { balanceKobo: { increment: tx.amountKobo } } })
      })
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('webhook error', error)
    return new NextResponse('server error', { status: 500 })
  }
}
