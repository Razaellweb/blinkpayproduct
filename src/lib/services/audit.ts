import { prisma } from '@/lib/db/prisma'

export async function auditLog(params: { userId?: string; action: string; entityType?: string; entityId?: string; ipAddress?: string; userAgent?: string; metadata?: unknown }) {
  await prisma.auditLog.create({ data: params })
}
