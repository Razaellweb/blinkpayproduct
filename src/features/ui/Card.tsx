import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[--color-border] bg-[--color-card] text-[--color-card-foreground] shadow-sm",
        "dark:bg-neutral-900/70 dark:backdrop-blur",
        "transition-all hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-4">
      {icon}
      <div>
        <h3 className="text-sm font-semibold leading-tight">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground/80">{subtitle}</p>}
      </div>
    </div>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-4 pt-0", className)}>{children}</div>;
}
