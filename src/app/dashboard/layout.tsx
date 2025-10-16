import { ReactNode } from "react";
import { Home, Send, QrCode, Banknote, Hash, User, ShieldCheck, PanelLeft, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/transfer", label: "Transfer", icon: Send },
  { href: "/dashboard/vendor/pay", label: "Pay Vendor", icon: QrCode },
  { href: "/dashboard/bills", label: "Bills", icon: Banknote },
  { href: "/dashboard/spend-code", label: "Spend Code", icon: Hash },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/admin", label: "Admin", icon: ShieldCheck },
] as const;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div data-dashboard="true" className="grid min-h-screen w-full md:grid-cols-[260px_1fr]">
      <aside className="hidden md:block border-r border-[--color-sidebar-border] bg-[--color-sidebar]">
        <div className="p-4">
          <Link href="/dashboard" className="block">
            <div className="h-10 rounded-xl bg-gradient-to-r from-[#1d4ed8] via-[#0f766e] to-[#facc15]" />
            <p className="mt-2 text-xs text-muted-foreground">BlinkPay Dashboard</p>
          </Link>
        </div>
        <nav className="mt-3 px-2">
          {nav.map((n) => (
            <NavItem key={n.href} {...n} />
          ))}
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-40 border-b border-[--color-border] bg-[--color-card]/80 backdrop-blur custom-header-shadow">
          <div className="flex items-center gap-2 px-3 py-2 md:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="font-semibold">BlinkPay</span>
          </div>
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Welcome back</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border px-3 py-1.5 text-sm">NGN</button>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1d4ed8] to-[#0f766e]" />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  const active = typeof window !== "undefined" && window.location?.pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
        "hover:bg-[--color-sidebar-accent] hover:text-[--color-sidebar-accent-foreground]",
        active && "bg-[--color-sidebar-primary] text-[--color-sidebar-primary-foreground]"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}
