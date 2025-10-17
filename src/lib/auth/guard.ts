import { NextRequest } from 'next/server'
import { verifyToken, JwtPayload } from './jwt'

export async function requireAuth(req: NextRequest): Promise<JwtPayload> {
  const auth = req.headers.get('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.substring(7) : null
  if (!token) throw new Error('Unauthorized')
  try {
    return await verifyToken<JwtPayload>(token)
  } catch (e) {
    throw new Error('Unauthorized')
  }
}
