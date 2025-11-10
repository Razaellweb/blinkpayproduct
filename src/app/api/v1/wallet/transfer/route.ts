import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { transferSchema } from '@/lib/validation/validators'
import { badRequest, ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'
import { kobo, genRef } from '@/lib/utils/helpers'
import { scoreTransaction } from '@/lib/services/fraud'
import { getOrCreateIdempotency, completeIdempotency, hashRequest, failIdempotency } from '@/lib/idempotency'
import { rateLimit } from '@/lib/security/rate-limit'
import { Providus } from '@/lib/payment/providus'
import { verifyOtp } from '@/lib/services/otp'
import { Prisma } from '@prisma/client'

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, 'wallet:transfer')
  if (!rl.allowed) return badRequest(`rate limit exceeded. retry in ${rl.retryAfter}s`)

  try {
    const auth = await requireAuth(req)
    const json = await req.json()
    const parsed = transferSchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())

    const user = await prisma.user.findUnique({ where: { id: auth.sub } })
    if (!user) return badRequest('user not found')

    // OTP verification if 2FA enabled
    if (user.isTwoFAEnabled) {
      const otp = parsed.data.otp
      const target = user.phone || user.email
      if (!otp || !target) return badRequest('otp required')
      const okOtp = await verifyOtp({ target, code: otp, purpose: 'transfer' })
      if (!okOtp) return badRequest('invalid or expired otp')
    }

    const senderWallet = await prisma.wallet.findFirst({ where: { userId: auth.sub } })
    if (!senderWallet) return badRequest('wallet not found')

    const amountKobo = kobo(parsed.data.amount)
    if (senderWallet.balanceKobo < amountKobo) return badRequest('insufficient balance')

    // Idempotency
    const idk = req.headers.get('Idempotency-Key') || genRef('IDEMP')
    const reqHash = await hashRequest(parsed.data)
    await getOrCreateIdempotency(idk, reqHash)

    const isBankTransfer = !!(parsed.data.bankAccountNumber && parsed.data.bankCode)

    if (!isBankTransfer) {
      // P2P transfer
      let recipientWalletId: string | null = null
      if (parsed.data.toWalletId) recipientWalletId = parsed.data.toWalletId
      else if (parsed.data.toUserId) {
        const rw = await prisma.wallet.findFirst({ where: { userId: parsed.data.toUserId } })
        if (!rw) return badRequest('recipient wallet not found')
        recipientWalletId = rw.id
      } else {
        return badRequest('recipient not provided')
      }

      const ref = genRef('P2P')

      const txHourly = await prisma.transaction.count({
        where: { walletId: senderWallet.id, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } }
      })
      const score = scoreTransaction({ amountKobo, txPerHour: txHourly })
      if (score >= 70) return badRequest('transfer flagged for review')

      await prisma.$transaction(async (db) => {
        await db.wallet.update({ where: { id: senderWallet.id }, data: { balanceKobo: { decrement: amountKobo } } })
        await db.wallet.update({ where: { id: recipientWalletId! }, data: { balanceKobo: { increment: amountKobo } } })

        await db.transaction.create({
          data: {
            walletId: senderWallet.id,
            type: 'TRANSFER_OUT',
            status: 'SUCCESS',
            amountKobo,
            reference: ref,
            description: parsed.data.description,
            counterpartyWalletId: recipientWalletId!
          }
        })
        await db.transaction.create({
          data: {
            walletId: recipientWalletId!,
            type: 'TRANSFER_IN',
            status: 'SUCCESS',
            amountKobo,
            reference: ref,
            description: parsed.data.description,
            counterpartyWalletId: senderWallet.id
          }
        })
      })

      await completeIdempotency(idk, { reference: ref })
      return ok({ reference: ref })
    }

    // Interbank transfer via Providus NIP
    const ref = genRef('NIP')

    await prisma.$transaction(async (db) => {
      await db.wallet.update({ where: { id: senderWallet.id }, data: { balanceKobo: { decrement: amountKobo } } })
      await db.transaction.create({
        data: {
          walletId: senderWallet.id,
          type: 'TRANSFER_OUT',
          status: 'PENDING',
          amountKobo,
          reference: ref,
          description: parsed.data.description,
          metadata: {
            bankCode: parsed.data.bankCode,
            accountNumber: parsed.data.bankAccountNumber,
            accountName: parsed.data.bankAccountName
          } as Prisma.InputJsonValue
        }
      })
    })

    try {
      const providus = new Providus()
      const payload = {
        beneficiaryAccountName: parsed.data.bankAccountName || 'Beneficiary',
        transactionAmount: parsed.data.amount.toFixed(2),
        currencyCode: process.env.PROVIDUS_CURRENCY_CODE || '566',
        narration: parsed.data.description || 'BlinkPay transfer',
        sourceAccountName: 'BlinkPay Wallet',
        beneficiaryAccountNumber: parsed.data.bankAccountNumber!,
        beneficiaryBank: parsed.data.bankCode!,
        transactionReference: ref,
        userName: process.env.PROVIDUS_USERNAME || '',
        password: process.env.PROVIDUS_PASSWORD || '',
      }
      const resp = await providus.nIPFundTransfer(payload as any)

      if ((resp as any).responseCode && (resp as any).responseCode !== '00') {
        // failure
        await prisma.$transaction(async (db) => {
          await db.wallet.update({ where: { id: senderWallet.id }, data: { balanceKobo: { increment: amountKobo } } })
          await db.transaction.update({
            where: { reference: ref },
            data: { status: 'FAILED', metadata: resp as unknown as Prisma.InputJsonValue }
          })
        })
        await failIdempotency(idk, 'bank transfer failed')
        return badRequest('bank transfer failed')
      }

      await prisma.transaction.update({
        where: { reference: ref },
        data: { status: 'SUCCESS', metadata: resp as unknown as Prisma.InputJsonValue }
      })
      await completeIdempotency(idk, { reference: ref })
      return ok({ reference: ref, status: 'SUCCESS' })
    } catch (e) {
      await prisma.$transaction(async (db) => {
        await db.wallet.update({ where: { id: senderWallet.id }, data: { balanceKobo: { increment: amountKobo } } })
        await db.transaction.update({
          where: { reference: ref },
          data: { status: 'FAILED', metadata: { error: String(e) } as Prisma.InputJsonValue }
        })
      })
      await failIdempotency(idk, 'bank transfer error')
      return serverError('failed to process bank transfer')
    }
  } catch (error) {
    console.error(error)
    return serverError('failed to transfer')
  }
}
