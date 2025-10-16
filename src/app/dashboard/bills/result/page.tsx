"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/features/ui/Card";
import Radial from "@/features/charts/Radial";
import { formatNaira } from "@/features/mock/data";

function BillResultInner() {
  const q = useSearchParams();
  const status = (q.get("status") || "success") as "success" | "failed";
  const amount = Number(q.get("amount") || 0);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="p-5">
        <h2 className="text-lg font-semibold">Bill payment {status === "success" ? "successful" : "failed"}</h2>
        <p className="text-sm text-muted-foreground mt-1">Amount: {formatNaira(amount)}</p>
        <div className="mt-4 flex items-center gap-6">
          <Radial value={status === "success" ? 100 : 10} />
          <div className="text-sm">
            <p>Receipt: BILL-{Math.floor(Math.random()*999999)}</p>
            <p>Provider: MTN/DSTV/etc</p>
            <p>Status: <span className={status === 'success' ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}>{status}</span></p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <a href="/dashboard" className="rounded-lg border px-3 py-2 text-sm">Back to dashboard</a>
          <button className="rounded-lg bg-[--color-foreground] px-3 py-2 text-sm text-[--color-background]">Download receipt</button>
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="text-sm font-semibold">Spending insights</h3>
        <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
          <div><p className="text-xs text-muted-foreground">This week</p><p className="font-semibold">{formatNaira(14500)}</p></div>
          <div><p className="text-xs text-muted-foreground">TV</p><p className="font-semibold">{formatNaira(6500)}</p></div>
          <div><p className="text-xs text-muted-foreground">Airtime</p><p className="font-semibold">{formatNaira(4800)}</p></div>
        </div>
      </Card>
    </div>
  );
}

export default function BillResult() {
  return (
    <Suspense fallback={<div className="p-5 text-sm text-muted-foreground">Loading bill result…</div>}>
      <BillResultInner />
    </Suspense>
  );
}
