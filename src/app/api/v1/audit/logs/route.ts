import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { forbidden, ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    if (auth.role !== 'ADMIN') return forbidden('admin only')
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId') || undefined
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = Math.min(100, parseInt(searchParams.get('pageSize') || '50'))

    const [items, total] = await Promise.all([
      prisma.auditLog.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, skip: (page-1)*pageSize, take: pageSize }),
      prisma.auditLog.count({ where: { userId } })
    ])

    return ok({ items, total, page, pageSize })
  } catch (error) {
    console.error(error)
    return serverError('failed to get audit logs')
  }
}
