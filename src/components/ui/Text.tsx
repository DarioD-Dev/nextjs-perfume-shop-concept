import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Variant = "body" | "lead" | "small" | "eyebrow";

const variantStyles: Record<Variant, string> = {
  body: "text-base leading-relaxed text-text",
  lead: "text-lg leading-relaxed text-text-secondary",
  small: "text-sm text-text-secondary",
  eyebrow: "text-eyebrow uppercase tracking-[0.18em] text-text-secondary",
};

export function Text({
  variant = "body",
  as,
  className,
  ...props
}: ComponentPropsWithoutRef<"p"> & {
  variant?: Variant;
  as?: ElementType;
}) {
  const Tag = as ?? "p";
  return <Tag className={cn("font-sans", variantStyles[variant], className)} {...props} />;
}
