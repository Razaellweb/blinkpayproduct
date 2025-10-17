import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { forbidden, ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'

const started = Date.now()

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    if (auth.role !== 'ADMIN') return forbidden('admin only')

    const [users, wallets, txs] = await Promise.all([
      prisma.user.count(),
      prisma.wallet.count(),
      prisma.transaction.count(),
    ])

    return ok({ users, wallets, transactions: txs, uptimeSec: Math.floor((Date.now() - started)/1000) })
  } catch (error) {
    console.error(error)
    return serverError('failed to get monitor data')
  }
}
