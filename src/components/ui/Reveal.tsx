"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// Richtung als CSS-Wert statt als Klassenname: So genügt eine einzige
// CSS-Regel (.reveal.is-pending) für alle drei Varianten.
const HIDDEN_TRANSFORM = {
  up: "translateY(1.5rem)",
  left: "translateX(-2.5rem)",
  right: "translateX(2.5rem)",
} as const;

/**
 * Scroll-Reveal ohne No-JS-Falle.
 *
 * Bewusst KEIN React-State für den versteckten Zustand. Vorher war es einer
 * (`useState(false)`), und damit war „unsichtbar" Teil des **ersten** Renders
 * — das serverseitige HTML und der Client-Render vor der Hydration zeigten
 * den Inhalt bereits mit `opacity: 0`. Lief JavaScript nie (deaktiviert,
 * blockiert, Hydration gescheitert), blieb er für immer unsichtbar.
 *
 * Das war kein theoretisches Risiko: Gemessen am 13.09.2026 mit
 * abgeschaltetem JavaScript und nach Ablauf aller Einblendungen waren auf der
 * Startseite 40 von 59 Inhaltselementen unsichtbar und auf der
 * Kollektionsseite 70 von 74 — also praktisch der komplette Shop.
 *
 * Jetzt umgekehrt: Das Element rendert immer in seiner sichtbaren
 * Endposition. Nur ein Effekt nach dem Mount darf die Klasse `is-pending`
 * **hinzufügen**, und das auch nur außerhalb von `prefers-reduced-motion`.
 * Kein JavaScript → nichts wird je versteckt. JavaScript vorhanden → der
 * IntersectionObserver nimmt die Klasse beim ersten Sichtbarwerden wieder weg.
 */
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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.classList.add("is-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove("is-pending");
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
      className={cn("reveal", className)}
      // Cast bleibt: React.CSSProperties kennt keine CSS-Variablen als
      // Schlüssel. Bekannte Lücke im Typ, kein Zweifelsfall.
      style={{ "--reveal-from": HIDDEN_TRANSFORM[direction] } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
