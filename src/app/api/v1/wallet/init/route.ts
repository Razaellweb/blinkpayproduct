import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { badRequest, created, ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    const user = await prisma.user.findUnique({ where: { id: auth.sub } })
    if (!user) return badRequest('user not found')
    if (user.kycStatus !== 'APPROVED') return badRequest('kyc not approved')

    const existing = await prisma.wallet.findFirst({ where: { userId: auth.sub } })
    if (existing) return ok({ wallet: existing })

    const wallet = await prisma.wallet.create({ data: { userId: auth.sub, categories: { categories: ['default'] } } })
    return created({ wallet })
  } catch (error) {
    console.error(error)
    return serverError('failed to init wallet')
  }
}
