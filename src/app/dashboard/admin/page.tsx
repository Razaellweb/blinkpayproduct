"use client";
import { Card, CardHeader, CardContent } from "@/features/ui/Card";
import Sparkline from "@/features/charts/Sparkline";
import Bars from "@/features/charts/Bars";

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader title="System health" subtitle="Nodes online" />
          <CardContent>
            <Sparkline data={[20,22,21,23,24,26,25,27]} />
            <p className="mt-2 text-sm"><span className="text-emerald-600 dark:text-emerald-300 font-medium">99.9%</span> uptime</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Flagged transactions" subtitle="Last hour" />
          <CardContent>
            <Bars data={[2,6,4,8,3,7,5]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="KYC queue" subtitle="Pending reviews" />
          <CardContent>
            <Bars data={[5,3,6,2,7,4,8]} />
          </CardContent>
        </Card>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader title="User management" subtitle="Freeze/Unfreeze" />
          <CardContent>
            <div className="overflow-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-[--color-muted] text-left">
                  <tr>
                    <th className="p-2">User</th>
                    <th className="p-2">KYC</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({length:6}).map((_,i)=> (
                    <tr key={i} className="border-t">
                      <td className="p-2">user{i+1}@mail.ng</td>
                      <td className="p-2">Tier {1 + (i%3)}</td>
                      <td className="p-2">Active</td>
                      <td className="p-2">
                        <button className="rounded-lg border px-2 py-1">Freeze</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Audit logs" subtitle="Exportable" />
          <CardContent>
            <div className="h-60 overflow-auto rounded-xl border p-2 text-xs text-muted-foreground">
              {Array.from({length:30}).map((_,i)=> (<p key={i}>[{new Date().toLocaleTimeString()}] Action #{i+1} • OK</p>))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
