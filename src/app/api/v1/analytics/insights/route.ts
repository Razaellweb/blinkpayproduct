import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    const wallet = await prisma.wallet.findFirst({ where: { userId: auth.sub } })
    if (!wallet) return ok({ insights: [] })

    const txs = await prisma.transaction.findMany({ where: { walletId: wallet.id, status: 'SUCCESS' } })

    const totalOut = txs.filter(t => t.type === 'TRANSFER_OUT' || t.type === 'BILL_PAYMENT' || t.type === 'SPEND_REDEEM').reduce((a, b) => a + Number(b.amountKobo), 0)
    const totalIn = txs.filter(t => t.type === 'TRANSFER_IN' || t.type === 'TOPUP').reduce((a, b) => a + Number(b.amountKobo), 0)

    return ok({ insights: [
      { key: 'total_out_ngn', value: totalOut / 100 },
      { key: 'total_in_ngn', value: totalIn / 100 },
    ] })
  } catch (error) {
    console.error(error)
    return serverError('failed to get insights')
  }
}
