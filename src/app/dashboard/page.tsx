"use client";
import { Card, CardContent, CardHeader } from "@/features/ui/Card";
import Sparkline from "@/features/charts/Sparkline";
import Bars from "@/features/charts/Bars";
import Radial from "@/features/charts/Radial";
import { ArrowUpRight, ArrowDownRight, Send, QrCode, Banknote, Hash } from "lucide-react";
import StatusBadge from "@/features/common/StatusBadge";
import { formatNaira } from "@/lib/format";
import { useDashboardData } from "@/features/dashboard/hooks";

export default function OverviewPage() {
  const { loading, error, walletBalance, todayIn, todayOut, sparkIn, sparkOut, bars, recent } = useDashboardData();

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="col-span-1 md:col-span-2 overflow-hidden">
          <div className="p-4">
            <h2 className="text-sm text-muted-foreground">Wallet balance</h2>
            <p className="mt-1 text-3xl font-semibold">{loading ? 'Loading...' : formatNaira(walletBalance)}</p>
            {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 pt-0">
            <div className="rounded-xl bg-gradient-to-br from-[#1d4ed8]/10 via-[#0f766e]/10 to-[#f59e0b]/10 p-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300"><ArrowUpRight className="h-4 w-4" /> Inflow today</div>
              <div className="mt-1 text-xl font-medium">{loading ? '...' : formatNaira(todayIn)}</div>
              <Sparkline data={sparkIn} />
            </div>
            <div className="rounded-xl bg-gradient-to-br from-[#f59e0b]/10 via-[#0f766e]/10 to-[#1d4ed8]/10 p-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300"><ArrowDownRight className="h-4 w-4" /> Outflow today</div>
              <div className="mt-1 text-xl font-medium">{loading ? '...' : formatNaira(todayOut)}</div>
              <Sparkline data={sparkOut} />
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader title="Success rate" subtitle="Last 24h" />
          <CardContent className="flex items-center justify-center">
            <Radial value={92} />
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader title="Quick actions" />
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Action href="/dashboard/transfer" icon={<Send className="h-4 w-4" />} label="Send money" />
              <Action href="/dashboard/vendor/pay" icon={<QrCode className="h-4 w-4" />} label="Pay vendor" />
              <Action href="/dashboard/bills" icon={<Banknote className="h-4 w-4" />} label="Pay bills" />
              <Action href="/dashboard/spend-code" icon={<Hash className="h-4 w-4" />} label="Spend code" />
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader title="Category spend" subtitle="This week" />
          <CardContent>
            <Bars data={bars} />
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader title="Recent activity" />
          <CardContent>
            <ul className="divide-y divide-[--color-border]">
              {loading ? (
                <li className="py-3 text-sm text-muted-foreground">Loading...</li>
              ) : recent.length === 0 ? (
                <li className="py-3 text-sm text-muted-foreground">No transactions yet</li>
              ) : (
                recent.map((t) => (
                  <li key={t.id} className="flex items-center justify-between py-3">
                    <div className="text-sm">
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.time}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={t.status} />
                      <span className={(!t.incoming ? true : false) ? "text-rose-600 dark:text-rose-300" : "text-emerald-600 dark:text-emerald-300"}>
                        {(!t.incoming ? true : false) ? "-" : "+"}
                        {formatNaira(t.amount)}
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Performance" subtitle="Subsecond transfers" />
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <Metric label="Avg speed" value="0.6s" />
              <Metric label="MAU" value="62k" />
              <Metric label="Vendors" value="12k" />
            </div>
            <div className="mt-4 rounded-xl bg-gradient-to-r from-[#1d4ed8]/10 via-[#0f766e]/10 to-[#f59e0b]/10 p-3">
              <Sparkline data={sparkOut} height={90} />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Action({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-2 rounded-xl border p-3 hover:bg-gradient-to-r hover:from-[#1d4ed8]/10 hover:via-[#0f766e]/10 hover:to-[#f59e0b]/10"
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[--color-muted] text-[--color-foreground] group-hover:scale-105 transition">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
