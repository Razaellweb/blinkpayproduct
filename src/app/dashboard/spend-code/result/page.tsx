"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/features/ui/Card";
import Radial from "@/features/charts/Radial";

function SpendCodeResultInner() {
  const q = useSearchParams();
  const status = (q.get("status") || "pending") as "success" | "pending" | "failed";
  const map = { success: 100, pending: 60, failed: 10 } as const;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="p-5">
        <h2 className="text-lg font-semibold">Spend code {status}</h2>
        <div className="mt-4 flex items-center gap-6">
          <Radial value={map[status]} />
          <div className="text-sm">
            <p>{status === 'pending' ? 'Queued offline — will auto‑sync' : 'Processed'}</p>
            <p>Last sync: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        <a href="/dashboard" className="mt-4 inline-block rounded-lg border px-3 py-2 text-sm">Back to dashboard</a>
      </Card>
      <Card className="p-5">
        <h3 className="text-sm font-semibold">Tips</h3>
        <p className="text-sm text-muted-foreground">SMS/USSD can be used if there is no data connectivity.</p>
      </Card>
    </div>
  );
}

export default function SpendCodeResult() {
  return (
    <Suspense fallback={<div className="p-5 text-sm text-muted-foreground">Syncing…</div>}>
      <SpendCodeResultInner />
    </Suspense>
  );
}
