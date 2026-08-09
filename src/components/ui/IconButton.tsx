import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function IconButton({
  children,
  className,
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className={cn(
        // "group" lets children opt into their own hover animation
        // (e.g. ThemeToggle rotating its icon) via group-hover:.
        "group flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:text-accent-gold",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
