import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = Math.min(100, parseInt(searchParams.get('pageSize') || '20'))

    const wallet = await prisma.wallet.findFirst({ where: { userId: auth.sub } })
    if (!wallet) return ok({ items: [], total: 0, page, pageSize })

    const [items, total] = await Promise.all([
      prisma.transaction.findMany({ where: { walletId: wallet.id }, orderBy: { createdAt: 'desc' }, skip: (page-1)*pageSize, take: pageSize }),
      prisma.transaction.count({ where: { walletId: wallet.id } })
    ])

    return ok({ items, total, page, pageSize })
  } catch (error) {
    console.error(error)
    return serverError('failed to fetch ledger')
  }
}
