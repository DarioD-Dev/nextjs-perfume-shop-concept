import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-gold text-text-on-accent hover:bg-accent-gold-hover",
  secondary:
    "border border-border-strong text-text hover:border-accent-gold hover:text-accent-gold",
  ghost: "text-text hover:text-accent-gold",
  link: "p-0 text-text underline underline-offset-4 hover:text-accent-gold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-sans uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    variant !== "link" && sizeStyles[size],
    variantStyles[variant],
    className,
  );
}
