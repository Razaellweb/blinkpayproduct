import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { spendCodeGenerateSchema } from '@/lib/validation/validators'
import { badRequest, created, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'
import { addMinutes } from 'date-fns'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    const json = await req.json()
    const parsed = spendCodeGenerateSchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())

    const wallet = await prisma.wallet.findFirst({ where: { userId: auth.sub } })
    if (!wallet) return badRequest('wallet not found')

    const code = nanoid(10).toUpperCase()
    const expiresAt = addMinutes(new Date(), parsed.data.expiresInMinutes)
    const spend = await prisma.spendCode.create({ data: { walletId: wallet.id, code, amountKobo: BigInt(Math.round(parsed.data.amount * 100)), expiresAt, offline: parsed.data.offline } })

    return created({ code: spend.code, expiresAt: spend.expiresAt })
  } catch (error) {
    console.error(error)
    return serverError('failed to generate spend code')
  }
}
