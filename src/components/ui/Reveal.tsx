"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const HIDDEN_TRANSFORM = {
  up: "translate-y-6",
  left: "-translate-x-10",
  right: "translate-x-10",
} as const;

export function Reveal({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        visible ? "translate-x-0 translate-y-0 opacity-100" : cn(HIDDEN_TRANSFORM[direction], "opacity-0"),
        className,
      )}
    >
      {children}
    </div>
  );
}
