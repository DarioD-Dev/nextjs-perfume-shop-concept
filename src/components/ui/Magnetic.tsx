"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

// Subtle "pulls toward the cursor" hover effect for a single primary CTA —
// deliberately not baked into Button/ButtonLink themselves, since applying
// this to every button/link site-wide would feel gimmicky rather than
// premium. Direct style manipulation (not React state) on mousemove is
// intentional: this fires on every pixel of movement, and re-rendering for
// that would be wasteful and visibly laggy compared to just writing the
// transform straight to the DOM node.
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-200 ease-out motion-reduce:transition-none"
    >
      {children}
    </div>
  );
}
