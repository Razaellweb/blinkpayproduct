import { NextResponse } from 'next/server'

export function ok(data: unknown, message = 'ok', status = 200) {
  return NextResponse.json({ success: true, message, data }, { status })
}

export function created(data: unknown, message = 'created') {
  return NextResponse.json({ success: true, message, data }, { status: 201 })
}

export function badRequest(message = 'bad request', errors?: unknown) {
  return NextResponse.json({ success: false, message, error: errors }, { status: 400 })
}

export function unauthorized(message = 'unauthorized') {
  return NextResponse.json({ success: false, message }, { status: 401 })
}

export function forbidden(message = 'forbidden') {
  return NextResponse.json({ success: false, message }, { status: 403 })
}

export function notFound(message = 'not found') {
  return NextResponse.json({ success: false, message }, { status: 404 })
}

export function serverError(message = 'internal server error', meta?: unknown) {
  return NextResponse.json({ success: false, message, error: meta }, { status: 500 })
}
