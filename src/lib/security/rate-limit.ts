import { NextRequest } from 'next/server'

type Bucket = { tokens: number; last: number }
const windowMs = 60_000
const maxPerWindow = 100
const store = new Map<string, Bucket>()
const MAX_KEYS = 10000

function evictIfNeeded() {
  if (store.size <= MAX_KEYS) return
  // remove oldest entries
  const entries = Array.from(store.entries()).sort((a, b) => a[1].last - b[1].last)
  for (let i = 0; i < entries.length - MAX_KEYS; i++) {
    store.delete(entries[i][0])
  }
}

export function rateLimit(req: NextRequest, keyExtra = '') {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const key = `${ip}:${keyExtra}`
  const now = Date.now()
  const bucket = store.get(key) || { tokens: maxPerWindow, last: now }
  const elapsed = now - bucket.last
  bucket.tokens = Math.min(maxPerWindow, bucket.tokens + (elapsed / windowMs) * maxPerWindow)
  bucket.last = now
  if (bucket.tokens < 1) return { allowed: false as const, retryAfter: Math.ceil((1 - bucket.tokens) * (windowMs / maxPerWindow) / 1000) }
  bucket.tokens -= 1
  store.set(key, bucket)
  evictIfNeeded()
  return { allowed: true as const }
}
