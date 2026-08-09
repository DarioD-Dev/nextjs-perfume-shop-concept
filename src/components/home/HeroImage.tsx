"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// Can't isolate just the bottle inside a flat photo (no separate layer/3D
// asset) — this animates the whole image settling into place on load
// instead: slightly rotated, zoomed in and invisible, then eases into its
// final resting state. Reads as a "drops/settles in" moment.
export function HeroImage({ src }: { src: string }) {
  const [visible, setVisible] = useState(false);

  // Plain useEffect (not layout effect, no requestAnimationFrame) — it
  // already runs after the browser paints the initial state, which is
  // what lets the CSS transition animate. rAF is unnecessary here and,
  // worse, browsers throttle/skip it entirely for non-visible/backgrounded
  // tabs, which made this silently never animate in some environments.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deliberate mount-triggered CSS transition, see comment above
    setVisible(true);
  }, []);

  return (
    <Image
      src={src}
      alt=""
      fill
      priority
      sizes="100vw"
      className={cn(
        "object-cover transition-[transform,opacity] duration-[1400ms] ease-out motion-reduce:opacity-50 motion-reduce:transition-none",
        visible ? "rotate-0 scale-100 opacity-50" : "rotate-1 scale-110 opacity-0",
      )}
    />
  );
}
