import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { profileUpdateSchema } from '@/lib/validation/validators'
import { badRequest, ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'
import bcrypt from 'bcryptjs'
import { auditLog } from '@/lib/services/audit'

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    const json = await req.json()
    const parsed = profileUpdateSchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())

    const data: any = { ...parsed.data }
    if (data.pin) {
      data.pinHash = await bcrypt.hash(data.pin, 12)
      delete data.pin
    }

    const user = await prisma.user.update({ where: { id: auth.sub }, data })
    await auditLog({ userId: auth.sub, action: 'USER_UPDATE_PROFILE' })

    return ok({ user })
  } catch (error) {
    console.error(error)
    return serverError('failed to update profile')
  }
}
