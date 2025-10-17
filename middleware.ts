import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddleware } from 'next-safe-middleware'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}

const withSecurity = createMiddleware({
  contentSecurityPolicy: {
    'script-src': ["'self'", "'unsafe-inline'", 'https:'],
  },
  referrerPolicy: 'no-referrer',
  xFrameOptions: 'DENY',
  strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
})

export function middleware(req: NextRequest) {
  const res = withSecurity(req)
  // Basic CORS for API
  const origin = req.headers.get('origin') || '*'
  res.headers.set('Access-Control-Allow-Origin', origin)
  res.headers.set('Vary', 'Origin')
  res.headers.set('Access-Control-Allow-Credentials', 'true')
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Idempotency-Key, X-Paystack-Signature')

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: res.headers })
  }

  return res
}
