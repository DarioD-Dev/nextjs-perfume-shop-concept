"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { NotifyForm } from "@/components/product/NotifyForm";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

// Size selection, price, and add-to-cart share one piece of state (the
// selected size), so they live in a single client component rather than
// being split across separate SizeSelector/AddToCartButton files.
export function PurchasePanel({
  sizes,
  locale,
  soldOut,
}: {
  sizes: { ml: number; priceEur: number }[];
  locale: string;
  soldOut?: boolean;
}) {
  const t = useTranslations("Product");
  const [selectedMl, setSelectedMl] = useState(sizes[0]?.ml);
  const [added, setAdded] = useState(false);

  const selected = sizes.find((size) => size.ml === selectedMl) ?? sizes[0];

  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans text-2xl text-text">{formatPrice(selected.priceEur, locale)}</p>

      <div>
        <p className="mb-2 font-sans text-xs uppercase tracking-wide text-text-secondary">
          {t("size")}
        </p>
        <div className="flex gap-2">
          {sizes.map((size) => {
            const active = size.ml === selected.ml;
            return (
              <button
                key={size.ml}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setSelectedMl(size.ml);
                  setAdded(false);
                }}
                className={cn(
                  "rounded-full border px-4 py-2 font-sans text-sm transition-colors",
                  active
                    ? "border-accent-gold bg-accent-gold text-text-on-accent"
                    : "border-border-strong text-text hover:border-accent-gold hover:text-accent-gold",
                )}
              >
                {size.ml} ml
              </button>
            );
          })}
        </div>
      </div>

      {soldOut ? (
        <>
          <p className="mt-2 inline-flex w-fit items-center rounded-full border border-border-strong px-4 py-2 font-sans text-xs uppercase tracking-wide text-text-secondary">
            {t("soldOut")}
          </p>
          <NotifyForm />
        </>
      ) : (
        <>
          <Button variant="primary" size="lg" onClick={() => setAdded(true)} className="mt-2">
            {t("addToCart")}
          </Button>
          {added && (
            <p role="status" className="font-sans text-sm text-accent-gold">
              {t("addedToCart")}
            </p>
          )}
        </>
      )}
    </div>
  );
}
