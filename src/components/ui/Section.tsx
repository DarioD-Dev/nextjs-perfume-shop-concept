import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Tone = "base" | "inverse" | "muted" | "editorial";

const toneStyles: Record<Tone, string> = {
  base: "bg-surface text-text",
  inverse: "bg-surface-inverse text-text-on-inverse",
  muted: "bg-surface-muted text-text",
  // Fixed dark band, independent of light/dark theme — see tokens.css.
  editorial: "bg-surface-editorial text-text-on-editorial",
};

export function Section({
  className,
  tone = "base",
  size = "default",
  ...props
}: ComponentPropsWithoutRef<"section"> & {
  tone?: Tone;
  size?: "default" | "lg";
}) {
  return (
    <section
      className={cn(toneStyles[tone], size === "lg" ? "py-section-lg" : "py-section", className)}
      {...props}
    />
  );
}
