"use client";
import { Card } from "@/features/ui/Card";
import Bars from "@/features/charts/Bars";
import Link from "next/link";
import { Bolt, Smartphone, Tv, TrainFront } from "lucide-react";

const categories = [
  { name: "Airtime/Data", icon: Smartphone, color: "from-[#1d4ed8]/10" },
  { name: "TV (DSTV/GOtv)", icon: Tv, color: "from-[#0f766e]/10" },
  { name: "Utilities", icon: Bolt, color: "from-[#f59e0b]/10" },
  { name: "Transit (BRT)", icon: TrainFront, color: "from-[#1d4ed8]/10" },
];

export default function BillsPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="md:col-span-2 p-4">
        <h2 className="text-lg font-semibold">Bills</h2>
        <p className="text-xs text-muted-foreground">Select a category</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link key={c.name} href="/dashboard/bills/confirm" className={`rounded-xl border p-4 hover:shadow-md bg-gradient-to-br ${c.color}`}>
              <div className="flex items-center gap-2">
                <c.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{c.name}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Top billers: MTN, DSTV, GOtv, BRT</p>
            </Link>
          ))}
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold">Weekly spend</h3>
        <Bars data={[5,8,7,10,9,12,11]} />
        <p className="mt-2 text-xs text-muted-foreground">Fallback: static list if API fails.</p>
      </Card>
    </div>
  );
}
