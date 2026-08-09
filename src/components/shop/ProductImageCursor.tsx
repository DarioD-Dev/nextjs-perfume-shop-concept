"use client";

import { useTranslations } from "next-intl";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// Cursor-replacement hint that follows the mouse while hovering a product
// image (cursor-none hides the native pointer, the pill takes its place).
// Position is written straight to the DOM on mousemove rather than through
// React state, same reasoning as Magnetic — re-rendering per pixel of
// movement would be wasteful. Visibility/scale are pure CSS (group-hover),
// no JS needed for that part. Mouse-only by nature: touch devices never
// fire mousemove, so this simply does nothing there.
export function ProductImageCursor({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Shop");

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    const pill = pillRef.current;
    if (!rect || !pill) return;
    pill.style.left = `${event.clientX - rect.left}px`;
    pill.style.top = `${event.clientY - rect.top}px`;
  }

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className={cn("group/cursor relative cursor-none", className)}>
      {children}
      <div
        ref={pillRef}
        aria-hidden
        className="pointer-events-none absolute z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-surface-raised/90 font-sans text-[10px] uppercase tracking-wide text-text opacity-0 transition-[opacity,transform] duration-200 group-hover/cursor:scale-100 group-hover/cursor:opacity-100"
      >
        {t("viewProduct")}
      </div>
    </div>
  );
}
