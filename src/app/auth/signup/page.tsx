"use client";
import { useState } from "react";
import { Mail, Phone, ShieldCheck } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const strength = Math.min(100, (password.length * 10));
  const valid = (email || phone) && password.length >= 6 && agree;
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-card] p-6 shadow-xl">
        <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-[#1d4ed8]/30 via-[#0f766e]/30 to-[#f59e0b]/30 blur-2xl" />
        <h1 className="text-xl font-semibold">Create your BlinkPay account</h1>
        <p className="text-xs text-muted-foreground">Sign up with phone or email. BVN/NIN KYC required later.</p>
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
          <div className="h-1 rounded-full bg-[--color-muted]">
            <div className="h-1 rounded-full bg-gradient-to-r from-[#1d4ed8] via-[#0f766e] to-[#f59e0b]" style={{width: `${strength}%`}} />
          </div>
          <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} /> I agree to the terms</label>
          <button disabled={!valid} onClick={()=>{window.location.href='/auth/signin'}} className="rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-4 py-2 text-white disabled:opacity-50">Create account</button>
          <p className="text-xs text-muted-foreground">Already have an account? <a className="underline" href="/auth/signin">Sign in</a></p>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4" /> Bank‑grade security. PCI‑DSS practices.</div>
        </div>
      </div>
    </div>
  );
}
