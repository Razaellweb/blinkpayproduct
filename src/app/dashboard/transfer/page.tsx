"use client";
import { useState } from "react";
import { Card } from "@/features/ui/Card";
import PinModal from "@/features/common/PinModal";
import Sparkline from "@/features/charts/Sparkline";
import { seriesDay, formatNaira } from "@/features/mock/data";

export default function TransferPage() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const valid = recipient && Number(amount) > 0;
  const fee = Math.max(10, Math.round(Number(amount) * 0.01));
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="md:col-span-2 p-4">
        <h2 className="text-lg font-semibold">Send money</h2>
        <p className="text-xs text-muted-foreground">Instant wallet or bank transfer</p>
        <div className="mt-4 grid gap-3">
          <input placeholder="Recipient (phone, email, or account)" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" value={recipient} onChange={(e)=>setRecipient(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Amount (NGN)" inputMode="numeric" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" value={amount} onChange={(e)=>setAmount(e.target.value.replace(/[^0-9.]/g,''))} />
            <input placeholder="Note (optional)" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" value={note} onChange={(e)=>setNote(e.target.value)} />
          </div>
          <div className="rounded-xl border p-3 text-sm">
            <div className="flex items-center justify-between"><span>Estimated fee</span><span>{formatNaira(fee)}</span></div>
            <div className="flex items-center justify-between"><span>Total</span><span>{formatNaira(Number(amount||0)+fee)}</span></div>
          </div>
          <button disabled={!valid} onClick={()=>setOpen(true)} className="rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-4 py-2 text-white disabled:opacity-50">Continue</button>
          <p className="text-xs text-muted-foreground">Transparent fees shown before confirmation. Sub‑second same‑bank transfers.</p>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold">Recent speed</h3>
        <p className="text-xs text-muted-foreground">Avg completion 0.6s</p>
        <div className="mt-3 rounded-xl bg-gradient-to-br from-[#1d4ed8]/10 via-[#0f766e]/10 to-[#f59e0b]/10 p-3">
          <Sparkline data={seriesDay} />
        </div>
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          <li>Success rate: 99.2%</li>
          <li>Interbank latency: 1.3s</li>
        </ul>
      </Card>
      <PinModal open={open} onClose={()=>setOpen(false)} onConfirm={()=>{window.location.href='/dashboard/transfer/result?status=success&amount='+amount}} />
    </div>
  );
}
