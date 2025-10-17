import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

export async function hashRequest(body: unknown) {
  const h = crypto.createHash('sha256')
  h.update(JSON.stringify(body || {}))
  return h.digest('hex')
}

export async function getOrCreateIdempotency(key: string, requestHash: string) {
  const existing = await prisma.idempotencyKey.findUnique({ where: { key } })
  if (existing) return existing
  return prisma.idempotencyKey.create({ data: { key, requestHash, status: 'PENDING' } })
}

export async function completeIdempotency(key: string, response: unknown) {
  await prisma.idempotencyKey.update({ where: { key }, data: { status: 'COMPLETED', response } })
}

export async function failIdempotency(key: string, message: string) {
  await prisma.idempotencyKey.update({ where: { key }, data: { status: 'FAILED', response: { message } } })
}
