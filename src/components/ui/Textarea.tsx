import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Textarea({ className, rows = 5, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "w-full rounded-md border border-border-subtle bg-surface-raised px-4 py-3 font-sans text-text placeholder:text-text-secondary focus-visible:border-accent-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold",
        className,
      )}
      {...props}
    />
  );
}
