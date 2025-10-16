"use client";
import { useState } from "react";

export default function Reset() {
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-card] p-6 shadow-xl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,#1d4ed833,transparent_40%),radial-gradient(circle_at_90%_90%,#0f766e33,transparent_40%)]" />
        <h1 className="text-xl font-semibold">Reset password</h1>
        <p className="text-xs text-muted-foreground">Secure reset with OTP</p>
        {step === 1 ? (
          <div className="mt-4 grid gap-3">
            <input placeholder="Email or phone" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" />
            <button onClick={()=>setStep(2)} className="rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-4 py-2 text-white">Send OTP</button>
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            <div className="grid grid-cols-6 gap-2">
              {Array.from({length:6}).map((_,i)=> (
                <input key={i} maxLength={1} inputMode="numeric" className="h-12 rounded-lg border bg-transparent text-center text-xl" value={otp[i]||''} onChange={(e)=>{const v=e.target.value.replace(/\D/g,'').slice(-1); const next=otp.split(''); next[i]=v; setOtp(next.join(''));}} />
              ))}
            </div>
            <input type="password" placeholder="New password" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={()=>{window.location.href='/auth/signin'}} className="rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-4 py-2 text-white">Update password</button>
            <a className="text-xs underline" href="/support">Contact support</a>
          </div>
        )}
      </div>
    </div>
  );
}
