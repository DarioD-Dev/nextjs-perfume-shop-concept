"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function HeaderScrollState({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-border-subtle bg-surface/95 backdrop-blur"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
