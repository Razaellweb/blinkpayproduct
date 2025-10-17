import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { badRequest, ok, serverError } from '@/lib/utils/responses'

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json()
    if (!refreshToken) return badRequest('refreshToken is required')
    await prisma.session.delete({ where: { refreshToken } }).catch(() => null)
    return ok({ loggedOut: true })
  } catch (error) {
    console.error(error)
    return serverError('failed to logout')
  }
}
