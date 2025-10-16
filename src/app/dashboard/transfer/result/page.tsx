"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/features/ui/Card";
import Radial from "@/features/charts/Radial";
import { formatNaira } from "@/features/mock/data";

function TransferResultInner() {
  const q = useSearchParams();
  const status = (q.get("status") || "success") as "success" | "failed";
  const amount = Number(q.get("amount") || 0);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="p-5">
        <h2 className="text-lg font-semibold">Transfer {status === "success" ? "successful" : "failed"}</h2>
        <p className="text-sm text-muted-foreground mt-1">Amount: {formatNaira(amount)}</p>
        <div className="mt-4 flex items-center gap-6">
          <Radial value={status === "success" ? 100 : 12} />
          <div className="text-sm">
            <p>Reference: REF-{Math.floor(Math.random()*999999)}</p>
            <p>Completed: {new Date().toLocaleString()}</p>
            <p>Status: <span className={status === 'success' ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}>{status}</span></p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <a href="/dashboard" className="rounded-lg border px-3 py-2 text-sm">Back to dashboard</a>
          <button className="rounded-lg bg-[--color-foreground] px-3 py-2 text-sm text-[--color-background]">Download receipt</button>
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="text-sm font-semibold">Next actions</h3>
        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Notify recipient</li>
          <li>Categorize this transaction</li>
          <li>Set a recurring transfer</li>
        </ul>
      </Card>
    </div>
  );
}

export default function TransferResult() {
  return (
    <Suspense fallback={<div className="p-5 text-sm text-muted-foreground">Loading result…</div>}>
      <TransferResultInner />
    </Suspense>
  );
}
