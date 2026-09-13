"use client";

import { useEffect, useRef } from "react";
import type { ResolvedProduct } from "@/data/types";
import { ProductCard } from "./ProductCard";

// One IntersectionObserver on the grid itself (not one per card) triggers
// once when the grid first comes into view; each card then reveals with a
// small per-index delay for a left-to-right/row-by-row cascade instead of
// everything popping in at once. Capped so very long catalogues don't push
// the last cards' reveal out indefinitely.
//
// Wie bei Reveal.tsx hängt der versteckte Zustand NICHT mehr an React-State.
// Vorher war „unsichtbar" Teil des ersten Renders, und ohne JavaScript blieb
// das Produktraster dauerhaft leer — auf der Kollektionsseite waren am
// 13.09.2026 mit abgeschaltetem JavaScript 70 von 74 Inhaltselementen
// unsichtbar. Bei einem Shop ist das die gesamte Ware.
//
// Jetzt rendern die Karten sichtbar, und nur ein Effekt nach dem Mount darf
// sie verstecken. Die Kaskade bleibt unverändert: Der Versatz steckt in
// --reveal-delay je Karte.
export function ProductGrid({ products, locale }: { products: ResolvedProduct[]; locale: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = [...node.querySelectorAll<HTMLElement>(":scope > *")];
    cards.forEach((card) => card.classList.add("is-pending"));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach((card) => card.classList.remove("is-pending"));
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [products]);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {products.map((product, index) => (
        <div
          key={product.slug}
          className="reveal"
          // Cast bleibt: React.CSSProperties kennt keine CSS-Variablen als
          // Schlüssel. Bekannte Lücke im Typ, kein Zweifelsfall.
          style={{ "--reveal-delay": `${Math.min(index, 11) * 60}ms` } as React.CSSProperties}
        >
          <ProductCard product={product} locale={locale} />
        </div>
      ))}
    </div>
  );
}
