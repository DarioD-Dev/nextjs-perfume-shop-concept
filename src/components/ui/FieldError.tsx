import type { ComponentPropsWithoutRef } from "react";

export function FieldError({ children, ...props }: ComponentPropsWithoutRef<"p">) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-1 text-sm text-danger" {...props}>
      {children}
    </p>
  );
}
