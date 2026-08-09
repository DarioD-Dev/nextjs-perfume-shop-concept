import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;
type Variant = "display" | "section" | "card";

const variantStyles: Record<Variant, string> = {
  display: "text-display-md font-display font-light sm:text-display-lg",
  section: "text-3xl font-display font-light sm:text-4xl",
  card: "text-xl font-display font-light",
};

const tagByLevel: Record<Level, ElementType> = { 1: "h1", 2: "h2", 3: "h3", 4: "h4" };

export function Heading({
  level = 2,
  variant = "section",
  className,
  ...props
}: ComponentPropsWithoutRef<"h1"> & {
  level?: Level;
  variant?: Variant;
}) {
  const Tag = tagByLevel[level];
  return <Tag className={cn(variantStyles[variant], "text-text", className)} {...props} />;
}
