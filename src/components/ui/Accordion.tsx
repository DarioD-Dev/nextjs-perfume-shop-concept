import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Accordion({
  title,
  children,
  className,
  defaultOpen = false,
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}) {
  return (
    <details className={cn("group border-b border-border-subtle py-4", className)} open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between font-sans text-text [&::-webkit-details-marker]:hidden">
        {title}
        <span className="ml-4 text-accent-gold transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="pt-3 font-sans text-text-secondary">{children}</div>
    </details>
  );
}
