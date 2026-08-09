import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Badge({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent-gold px-3 py-1 font-sans text-xs uppercase tracking-wide text-accent-gold",
        className,
      )}
      {...props}
    />
  );
}
