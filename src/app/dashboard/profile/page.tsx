"use client";
import { Card } from "@/features/ui/Card";
import Radial from "@/features/charts/Radial";

export default function ProfileSettings() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="p-4 md:col-span-2">
        <h2 className="text-lg font-semibold">Profile & settings</h2>
        <div className="mt-4 grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Full name" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" />
            <input placeholder="Language (en/pidgin)" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Change password" type="password" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" />
            <input placeholder="Change PIN" type="password" className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm" />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Privacy: GDPR compliant
          </div>
          <button className="rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#0f766e] px-4 py-2 text-white w-max">Save changes</button>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold">KYC status</h3>
        <div className="mt-3 grid place-items-center">
          <Radial value={72} />
        </div>
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          <li>BVN verification: submitted</li>
          <li>NIN verification: pending</li>
          <li>ID photo: submitted</li>
        </ul>
      </Card>
    </div>
  );
}
