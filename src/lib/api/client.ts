type Json = Record<string, unknown> | Array<unknown> | string | number | boolean | null

function getAccessToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

function getRefreshToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refreshToken')
}

export function setTokens(tokens: { accessToken?: string; refreshToken?: string } | null) {
  if (typeof window === 'undefined') return
  if (!tokens) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return
  }
  if (tokens.accessToken) localStorage.setItem('accessToken', tokens.accessToken)
  if (tokens.refreshToken) localStorage.setItem('refreshToken', tokens.refreshToken)
}

async function refreshAccessTokenOnce(): Promise<string | null> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return null
  const res = await fetch('/api/v1/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })
  if (!res.ok) return null
  const json = await res.json()
  const token = json?.data?.accessToken as string | undefined
  if (token) {
    setTokens({ accessToken: token })
    return token
  }
  return null
}

async function request<T = any>(input: string, init: RequestInit & { retryOn401?: boolean } = {}): Promise<T> {
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  if (!headers.has('Content-Type') && init.body) headers.set('Content-Type', 'application/json')
  const token = getAccessToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(input, { ...init, headers })
  if (res.status === 401 && init.retryOn401 !== false) {
    const newToken = await refreshAccessTokenOnce()
    if (newToken) {
      headers.set('Authorization', `Bearer ${newToken}`)
      const { retryOn401: _, ...initWithoutRetry } = init
      const retry = await fetch(input, { ...initWithoutRetry, headers })
      return parseJson<T>(retry)
    }
  }
  return parseJson<T>(res)
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text()
  const json = text ? JSON.parse(text) : null
  if (!res.ok) {
    const msg = json?.message || res.statusText
    const err: any = new Error(msg)
    err.status = res.status
    err.body = json
    throw err
  }
  return json as T
}

export async function apiGet<T = any>(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(path, typeof window === 'undefined' ? 'http://localhost' : window.location.origin)
  if (params) Object.entries(params).forEach(([k, v]) => { if (v !== undefined) url.searchParams.set(k, String(v)) })
  return request<T>(url.pathname + url.search, { method: 'GET' })
}

export async function apiPost<T = any>(path: string, body?: Json, headers?: HeadersInit) {
  return request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined, headers })
}

export async function apiPatch<T = any>(path: string, body?: Json) {
  return request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined })
}

export function extractData<T = any>(json: any): T { return (json && json.data) as T }
