"use client";
import { useState } from "react";
import { Card } from "@/features/ui/Card";
import Bars from "@/features/charts/Bars";

export default function SpendCode() {
  const [code, setCode] = useState<string | null>(null);
  const [input, setInput] = useState("");
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="p-4 md:col-span-2">
        <h2 className="text-lg font-semibold">Spend Code</h2>
        <p className="text-xs text-muted-foreground">Generate or input one‑time code (offline‑ready)</p>
        <div className="mt-4 grid gap-3">
          <div className="flex gap-2">
            <button onClick={()=>setCode(Math.random().toString().slice(2,8))} className="rounded-lg border px-3 py-2 text-sm">Generate code</button>
            <input placeholder="Enter code" className="flex-1 rounded-lg border bg-transparent px-3 py-2 text-sm" value={input} onChange={(e)=>setInput(e.target.value)} />
            <a href={`/dashboard/spend-code/result?status=${input? 'pending':'success'}`} className="rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-4 py-2 text-white text-sm">Proceed</a>
          </div>
          {code && (
            <div className="rounded-xl border p-4 text-center">
              <p className="text-xs text-muted-foreground">Your one‑time code</p>
              <p className="mt-2 text-3xl font-bold tracking-widest">{code}</p>
              <p className="mt-1 text-xs text-muted-foreground">Share with vendor; expires in 5 minutes</p>
            </div>
          )}
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold">Offline queue</h3>
        <Bars data={[3,6,2,8,1,4,5]} />
        <p className="mt-2 text-xs text-muted-foreground">When offline, transactions queue and auto‑sync.</p>
      </Card>
    </div>
  );
}
