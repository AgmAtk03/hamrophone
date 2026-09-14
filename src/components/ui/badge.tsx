import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  className,
  tone = "default",
  children,
}: {
  className?: string;
  tone?: "default" | "primary" | "muted";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
        tone === "default" && "bg-secondary text-fg",
        tone === "primary" && "bg-primary text-primary-foreground",
        tone === "muted" && "bg-bg text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
