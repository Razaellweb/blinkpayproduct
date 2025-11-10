import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Basic security headers (you can expand this if needed)
  res.headers.set('Content-Security-Policy', "script-src 'self' 'unsafe-inline' https:")
  res.headers.set('Referrer-Policy', 'no-referrer')
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

  // Basic CORS setup for API routes
  const origin = req.headers.get('origin') || '*'
  res.headers.set('Access-Control-Allow-Origin', origin)
  res.headers.set('Vary', 'Origin')
  res.headers.set('Access-Control-Allow-Credentials', 'true')
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Idempotency-Key, X-Paystack-Signature'
  )

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: res.headers })
  }

  return res
}
