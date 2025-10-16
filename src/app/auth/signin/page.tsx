"use client";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const valid = (email || phone) && password.length >= 6;
  const [error, setError] = useState("");
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-card] p-6 shadow-xl">
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-48 w-48 rounded-full bg-gradient-to-br from-[#1d4ed8]/30 via-[#0f766e]/30 to-[#f59e0b]/30 blur-2xl" />
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-xs text-muted-foreground">Sign in to continue to your dashboard</p>
        <div className="mt-4 grid gap-3">
          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <Mail className="h-4 w-4" />
            <input placeholder="Email (optional)" className="w-full bg-transparent text-sm outline-none" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <Phone className="h-4 w-4" />
            <input placeholder="Phone (optional)" className="w-full bg-transparent text-sm outline-none" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          </div>
          <input type="password" placeholder="Password" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" value={password} onChange={(e)=>setPassword(e.target.value)} />
          {error && <div className="rounded-lg border border-rose-300 bg-rose-50 p-2 text-xs text-rose-700">{error}</div>}
          <button disabled={!valid} onClick={()=>{ if(!valid){setError('Invalid credentials');} else {window.location.href='/dashboard';}}} className="rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-4 py-2 text-white disabled:opacity-50">Sign in</button>
          <div className="flex items-center justify-between text-xs">
            <a className="underline" href="/auth/reset">Forgot password?</a>
            <a className="underline" href="/auth/signup">Create account</a>
          </div>
        </div>
      </div>
    </div>
  );
}
