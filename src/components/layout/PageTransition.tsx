"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Keying by pathname forces React to unmount the old page and mount the new
// one on every navigation, which re-triggers this element's CSS animation —
// a simple, universally-supported crossfade-in instead of the native View
// Transitions API (still experimental in Next.js, requires opting the whole
// app into an experimental runtime, and unsupported in Firefox as of now —
// too much risk for a client-facing demo over a plain CSS approach).
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-[page-fade-in_450ms_ease-out]">
      {children}
    </div>
  );
}
