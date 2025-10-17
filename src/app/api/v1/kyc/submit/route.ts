import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth/guard'
import { kycSubmitSchema } from '@/lib/validation/validators'
import { badRequest, ok, serverError } from '@/lib/utils/responses'
import { prisma } from '@/lib/db/prisma'
import { QoreIdClient } from '@/lib/kyc/quore-id'
import { encrypt } from '@/lib/security/crypto'

function getQoreId() {
  const clientId = process.env.QOREID_CLIENT_ID!
  const secret = process.env.QOREID_CLIENT_SECRET!
  if (!clientId || !secret) throw new Error('QoreID env not set')
  return new QoreIdClient({ baseURL: process.env.QOREID_BASE_URL || 'https://api.qoreid.com', clientId, clientSecret: secret })
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    const json = await req.json()
    const parsed = kycSubmitSchema.safeParse(json)
    if (!parsed.success) return badRequest('invalid input', parsed.error.flatten())

    const { method, value } = parsed.data

    const client = getQoreId()
    let response: unknown
    if (method === 'BVN') {
      response = await client.verifyBvnBasic(value, {})
      await prisma.user.update({ where: { id: auth.sub }, data: { bvnEncrypted: encrypt(value), kycStatus: 'PENDING' } })
    } else {
      response = await client.verifyNin(value, {})
      await prisma.user.update({ where: { id: auth.sub }, data: { ninEncrypted: encrypt(value), kycStatus: 'PENDING' } })
    }

    const sub = await prisma.kycSubmission.create({ data: { userId: auth.sub, method, provider: 'QOREID', requestRef: `QID_${Date.now()}`, responseRaw: response } })

    return ok({ submissionId: sub.id, status: sub.status })
  } catch (error) {
    console.error(error)
    return serverError('failed to submit kyc')
  }
}
