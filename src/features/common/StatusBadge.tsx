import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: "success" | "pending" | "failed" }) {
  const map = {
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
    failed: "bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
  } as const;
  return <span className={cn("px-2 py-0.5 rounded-full text-xs", map[status])}>{status}</span>;
}
