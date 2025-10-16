"use client";
import { useState } from "react";
import { Card } from "@/features/ui/Card";
import PinModal from "@/features/common/PinModal";
import { formatNaira } from "@/features/mock/data";

export default function ConfirmBill() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const fee = Math.max(5, Math.round(Number(amount||0)*0.005));
  const valid = account.length >= 6 && Number(amount) > 0;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Confirm bill payment</h2>
        <div className="mt-4 grid gap-3">
          <input placeholder="Account/Phone" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" value={account} onChange={(e)=>setAccount(e.target.value)} />
          <input placeholder="Amount (NGN)" inputMode="numeric" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" value={amount} onChange={(e)=>setAmount(e.target.value.replace(/[^0-9.]/g,''))} />
          <div className="rounded-xl border p-3 text-sm">
            <div className="flex items-center justify-between"><span>Fees</span><span>{formatNaira(fee)}</span></div>
            <div className="flex items-center justify-between"><span>Total</span><span>{formatNaira(Number(amount||0)+fee)}</span></div>
          </div>
          <button disabled={!valid} onClick={()=>setOpen(true)} className="rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-4 py-2 text-white disabled:opacity-50">Pay bill</button>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold">Tips</h3>
        <p className="text-sm text-muted-foreground">Ensure account/phone format is correct. Fees are shown before you confirm.</p>
      </Card>
      <PinModal open={open} onClose={()=>setOpen(false)} onConfirm={()=>{window.location.href='/dashboard/bills/result?status=success&amount='+amount}} />
    </div>
  );
}
