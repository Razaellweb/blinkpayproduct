import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { passwordResetRequestSchema, passwordResetCompleteSchema } from '@/lib/validation/validators'
import { badRequest, ok, serverError } from '@/lib/utils/responses'
import { hashPassword } from '@/lib/auth/password'
import { generateOtp, verifyOtp } from '@/lib/services/otp'

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()

    // complete flow
    if (json?.token && json?.newPassword) {
      const parsed2 = passwordResetCompleteSchema.safeParse(json)
      if (!parsed2.success) return badRequest('invalid input', parsed2.error.flatten())
      const token: string = parsed2.data.token
      const newPassword: string = parsed2.data.newPassword

      // for simplicity, interpret token as otp:target
      const [code, target] = token.split(':')
      if (!code || !target) return badRequest('invalid token')
      const okOtp = await verifyOtp({ target, code, purpose: 'reset' })
      if (!okOtp) return badRequest('invalid or expired token')

      const user = await prisma.user.findFirst({ where: { OR: [ { email: target }, { phone: target } ] } })
      if (!user) return badRequest('user not found')

      const passwordHash = await hashPassword(newPassword)
      await prisma.user.update({ where: { id: user.id }, data: { passwordHash } })
      return ok({ reset: true }, 'password reset successful')
    }

    // request flow
    const parsed = passwordResetRequestSchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())
    const { emailOrPhone } = parsed.data

    const user = await prisma.user.findFirst({ where: { OR: [ { email: emailOrPhone }, { phone: emailOrPhone } ] } })
    if (!user) return ok({ sent: true })

    if (user.phone) {
      const { code } = await generateOtp({ target: user.phone, channel: 'sms', purpose: 'reset', userId: user.id })
      return ok({ sent: true, tokenHint: `${code}:${user.phone}` })
    }
    if (user.email) {
      const { code } = await generateOtp({ target: user.email, channel: 'email', purpose: 'reset', userId: user.id })
      return ok({ sent: true, tokenHint: `${code}:${user.email}` })
    }
    return ok({ sent: true })
  } catch (error) {
    console.error(error)
    return serverError('failed to process password reset')
  }
}
