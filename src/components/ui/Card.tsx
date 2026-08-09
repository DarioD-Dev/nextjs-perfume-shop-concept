import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  hover = false,
  ...props
}: ComponentPropsWithoutRef<"div"> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border-subtle bg-surface-raised p-6",
        // A default box-shadow reads fine in light mode but is nearly
        // invisible against a dark surface — pairing it with a border-color
        // shift keeps the hover state legible in both themes.
        hover &&
          "transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-accent-gold/60 hover:shadow-lg",
        className,
      )}
      {...props}
    />
  );
}
