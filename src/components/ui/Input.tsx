import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-border-subtle bg-surface-raised px-4 py-3 font-sans text-text placeholder:text-text-secondary focus-visible:border-accent-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold",
        className,
      )}
      {...props}
    />
  );
}
