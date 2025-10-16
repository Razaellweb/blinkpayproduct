"use client";
import { useState } from "react";
import { Card } from "@/features/ui/Card";
import Bars from "@/features/charts/Bars";
import PinModal from "@/features/common/PinModal";

export default function VendorPay() {
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const valid = code.length >= 6 && Number(amount) > 0;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="md:col-span-2 p-4">
        <h2 className="text-lg font-semibold">Pay vendor</h2>
        <p className="text-xs text-muted-foreground">Scan QR or enter Spend Code</p>
        <div className="mt-4 grid gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border p-3 h-40 grid place-items-center bg-gradient-to-br from-[#1d4ed8]/10 via-[#0f766e]/10 to-[#f59e0b]/10 text-sm text-muted-foreground">
              Camera preview (permission required)
            </div>
            <div className="grid gap-3">
              <input placeholder="Spend Code" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" value={code} onChange={(e)=>setCode(e.target.value)} />
              <input placeholder="Amount (NGN)" inputMode="numeric" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" value={amount} onChange={(e)=>setAmount(e.target.value.replace(/[^0-9.]/g,''))} />
              <button disabled={!valid} onClick={()=>setOpen(true)} className="rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-4 py-2 text-white disabled:opacity-50">Confirm</button>
              <p className="text-xs text-muted-foreground">If camera is denied, enter code manually.</p>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold">Today’s sales</h3>
        <Bars data={[8,12,9,14,10,16,12]} />
        <p className="mt-2 text-xs text-muted-foreground">Offline spend codes queue when no data; auto‑sync on reconnect.</p>
      </Card>
      <PinModal open={open} onClose={()=>setOpen(false)} onConfirm={()=>{window.location.href='/dashboard/vendor/result?status=success&amount='+amount}} />
    </div>
  );
}
