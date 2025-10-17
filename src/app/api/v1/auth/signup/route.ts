import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { signupSchema } from '@/lib/validation/validators'
import { badRequest, created, serverError } from '@/lib/utils/responses'
import { hashPassword } from '@/lib/auth/password'
import { signAccessToken, signRefreshToken } from '@/lib/auth/jwt'
import { rateLimit } from '@/lib/security/rate-limit'
import { auditLog } from '@/lib/services/audit'

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, 'auth:signup')
  if (!rl.allowed) return badRequest(`rate limit exceeded. retry in ${rl.retryAfter}s`)

  try {
    const json = await req.json()
    const parsed = signupSchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())
    const { email, phone, password, role } = parsed.data

    if (!email && !phone) return badRequest('email or phone is required')

    const exists = await prisma.user.findFirst({ where: { OR: [ { email: email ?? undefined }, { phone: phone ?? undefined } ] } })
    if (exists) return badRequest('user already exists')

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({ data: { email, phone, passwordHash, role } })

    await auditLog({ userId: user.id, action: 'USER_SIGNUP' })

    // create session
    const access = await signAccessToken({ sub: user.id, role: user.role })
    const refresh = await signRefreshToken({ sub: user.id, role: user.role })

    const session = await prisma.session.create({ data: { userId: user.id, refreshToken: refresh, expiresAt: new Date(Date.now() + 30*24*60*60*1000) } })

    return created({ accessToken: access, refreshToken: refresh, sessionId: session.id, kycStatus: user.kycStatus })
  } catch (error) {
    console.error(error)
    return serverError('failed to signup')
  }
}
