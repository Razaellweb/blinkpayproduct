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

    const [items, total] = await Promise.all([
      prisma.billPayment.findMany({ where: { userId: auth.sub }, orderBy: { createdAt: 'desc' }, skip: (page-1)*pageSize, take: pageSize }),
      prisma.billPayment.count({ where: { userId: auth.sub } })
    ])

    return ok({ items, total, page, pageSize })
  } catch (error) {
    console.error(error)
    return serverError('failed to fetch bill history')
  }
}
