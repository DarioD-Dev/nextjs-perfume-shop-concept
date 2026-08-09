"use client";

import { useEffect, useRef, useState } from "react";
import type { ResolvedProduct } from "@/data/types";
import { cn } from "@/lib/cn";
import { ProductCard } from "./ProductCard";

// One IntersectionObserver on the grid itself (not one per card) triggers
// once when the grid first comes into view; each card then reveals with a
// small per-index delay for a left-to-right/row-by-row cascade instead of
// everything popping in at once. Capped so very long catalogues don't push
// the last cards' reveal out indefinitely.
export function ProductGrid({ products, locale }: { products: ResolvedProduct[]; locale: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {products.map((product, index) => (
        <div
          key={product.slug}
          style={{ transitionDelay: `${Math.min(index, 11) * 60}ms` }}
          className={cn(
            "transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <ProductCard product={product} locale={locale} />
        </div>
      ))}
    </div>
  );
}
