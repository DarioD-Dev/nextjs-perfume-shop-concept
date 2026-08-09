import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Rule({ className, ...props }: ComponentPropsWithoutRef<"hr">) {
  return <hr className={cn("h-px border-0 bg-accent-gold", className)} {...props} />;
}
