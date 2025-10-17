import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { signinSchema } from '@/lib/validation/validators'
import { badRequest, ok, serverError } from '@/lib/utils/responses'
import { verifyPassword } from '@/lib/auth/password'
import { signAccessToken, signRefreshToken } from '@/lib/auth/jwt'
import { rateLimit } from '@/lib/security/rate-limit'
import { auditLog } from '@/lib/services/audit'
import { generateOtp, verifyOtp } from '@/lib/services/otp'

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, 'auth:signin')
  if (!rl.allowed) return badRequest(`rate limit exceeded. retry in ${rl.retryAfter}s`)

  try {
    const json = await req.json()
    const parsed = signinSchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())
    const { email, phone, password, otp } = parsed.data

    const user = await prisma.user.findFirst({ where: { OR: [ { email: email ?? undefined }, { phone: phone ?? undefined } ] } })
    if (!user) return badRequest('invalid credentials')

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) return badRequest('invalid credentials')

    if (user.isTwoFAEnabled) {
      if (!otp) {
        // send otp
        if (user.phone) await generateOtp({ target: user.phone, channel: 'sms', purpose: 'login', userId: user.id })
        else if (user.email) await generateOtp({ target: user.email, channel: 'email', purpose: 'login', userId: user.id })
        return ok({ requires2FA: true }, '2fa required')
      } else {
        const target = user.phone || user.email!
        const verified = await verifyOtp({ target, code: otp, purpose: 'login' })
        if (!verified) return badRequest('invalid or expired otp')
      }
    }

    const access = await signAccessToken({ sub: user.id, role: user.role })
    const refresh = await signRefreshToken({ sub: user.id, role: user.role })

    const session = await prisma.session.create({ data: { userId: user.id, refreshToken: refresh, expiresAt: new Date(Date.now() + 30*24*60*60*1000) } })

    await auditLog({ userId: user.id, action: 'USER_SIGNIN' })

    return ok({ accessToken: access, refreshToken: refresh, sessionId: session.id })
  } catch (error) {
    console.error(error)
    return serverError('failed to sign in')
  }
}
