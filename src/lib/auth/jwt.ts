import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from 'nanoid'

export type JwtPayload = { sub: string; role: 'ADMIN' | 'VENDOR' | 'CONSUMER'; sid?: string }

function getSecret() {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET is required')
  return new TextEncoder().encode(s)
}

export async function signAccessToken(payload: JwtPayload, expiresIn = '15m') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret())
}

export async function signRefreshToken(payload: JwtPayload, expiresIn = '30d') {
  return await new SignJWT({ ...payload, typ: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret())
}

export async function verifyToken<T = unknown>(token: string): Promise<T> {
  const { payload } = await jwtVerify(token, getSecret())
  return payload as T
}
