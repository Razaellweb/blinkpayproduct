import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    const latest = await prisma.kycSubmission.findFirst({ where: { userId: auth.sub }, orderBy: { createdAt: 'desc' } })
    const user = await prisma.user.findUnique({ where: { id: auth.sub } })
    return ok({ kycStatus: user?.kycStatus, latest })
  } catch (error) {
    console.error(error)
    return serverError('failed to fetch kyc status')
  }
}
