import { NextResponse } from 'next/server'

export async function GET() {
  const billers = [
    { provider: 'MTN', products: [{ code: 'AIRTIME_100', name: 'Airtime 100 NGN' }] },
    { provider: 'DSTV', products: [{ code: 'DSTV_PREM', name: 'DSTV Premium' }] },
  ]
  return NextResponse.json({ success: true, data: billers })
}
