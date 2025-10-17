import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { badRequest, ok, serverError } from '@/lib/utils/responses'
import { signAccessToken, verifyToken, JwtPayload } from '@/lib/auth/jwt'

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json()
    if (!refreshToken) return badRequest('refreshToken is required')

    const session = await prisma.session.findUnique({ where: { refreshToken } })
    if (!session || session.expiresAt < new Date()) return badRequest('invalid session')

    const payload = await verifyToken<JwtPayload>(refreshToken)
    const access = await signAccessToken({ sub: payload.sub, role: payload.role })
    return ok({ accessToken: access })
  } catch (error) {
    console.error(error)
    return serverError('failed to refresh')
  }
}
