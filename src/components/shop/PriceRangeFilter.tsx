"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

type PriceRange = { min: number; max: number };

// Mirrors Select's trigger-button + popover pattern (same shape, same
// open/close/click-outside behaviour) so it reads as one more dropdown in
// the row instead of a differently-shaped cluster — the earlier version
// (three separate price-bracket pills) broke that rhythm.
export function PriceRangeFilter({ priceRange }: { priceRange: PriceRange }) {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const urlPriceMin = searchParams.get("priceMin");
  const urlPriceMax = searchParams.get("priceMax");

  const [min, setMin] = useState(() => Number(urlPriceMin) || priceRange.min);
  const [max, setMax] = useState(() => Number(urlPriceMax) || priceRange.max);

  // Resync when the URL's price params change from outside this component
  // (e.g. the "Filter zurücksetzen" button) — without this, local state
  // stays stuck at the last value the user picked here even after a reset.
  // Adjusting state during render (React's recommended pattern for this)
  // instead of an effect, which would cause an extra render pass.
  const [syncedUrlPriceMin, setSyncedUrlPriceMin] = useState(urlPriceMin);
  const [syncedUrlPriceMax, setSyncedUrlPriceMax] = useState(urlPriceMax);
  if (urlPriceMin !== syncedUrlPriceMin || urlPriceMax !== syncedUrlPriceMax) {
    setSyncedUrlPriceMin(urlPriceMin);
    setSyncedUrlPriceMax(urlPriceMax);
    setMin(Number(urlPriceMin) || priceRange.min);
    setMax(Number(urlPriceMax) || priceRange.max);
  }

  const isActive = min > priceRange.min || max < priceRange.max;

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Debounced so typing a digit or dragging a slider thumb doesn't push a
  // URL update per keystroke/pixel.
  useEffect(() => {
    const currentMin = searchParams.get("priceMin") ?? "";
    const currentMax = searchParams.get("priceMax") ?? "";
    const nextMin = min > priceRange.min ? String(min) : "";
    const nextMax = max < priceRange.max ? String(max) : "";
    if (nextMin === currentMin && nextMax === currentMax) return;
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextMin) params.set("priceMin", nextMin);
      else params.delete("priceMin");
      if (nextMax) params.set("priceMax", nextMax);
      else params.delete("priceMax");
      router.replace(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max]);

  const span = priceRange.max - priceRange.min || 1;
  const minPercent = ((min - priceRange.min) / span) * 100;
  const maxPercent = ((max - priceRange.min) / span) * 100;

  function clampMin(value: number) {
    setMin(Math.min(Math.max(value, priceRange.min), max));
  }
  function clampMax(value: number) {
    setMax(Math.max(Math.min(value, priceRange.max), min));
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm transition-colors",
          open || isActive
            ? "border-accent-gold text-accent-gold"
            : "border-border-strong text-text hover:border-accent-gold hover:text-accent-gold",
        )}
      >
        {isActive ? `${formatPrice(min, locale)} – ${formatPrice(max, locale)}` : t("filterPrice")}
        <ChevronDown size={14} strokeWidth={1.5} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-72 rounded-xl border border-border-strong bg-surface-raised p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <label className="flex flex-1 items-center gap-1 rounded-md border border-border-subtle px-3 py-2">
              <span className="sr-only">{t("priceMinLabel")}</span>
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={min}
                onChange={(event) => clampMin(Number(event.target.value))}
                className="w-full appearance-[textfield] bg-transparent font-sans text-sm text-text outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="font-sans text-sm text-text-secondary">€</span>
            </label>
            <span className="font-sans text-text-secondary">–</span>
            <label className="flex flex-1 items-center gap-1 rounded-md border border-border-subtle px-3 py-2">
              <span className="sr-only">{t("priceMaxLabel")}</span>
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={max}
                onChange={(event) => clampMax(Number(event.target.value))}
                className="w-full appearance-[textfield] bg-transparent font-sans text-sm text-text outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="font-sans text-sm text-text-secondary">€</span>
            </label>
          </div>

          <div className="relative mt-4 flex h-4 items-center">
            <div className="pointer-events-none absolute inset-x-0 h-1 rounded-full bg-border-strong" />
            <div
              className="pointer-events-none absolute h-1 rounded-full bg-accent-gold"
              style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={min}
              aria-label={t("priceMinLabel")}
              onChange={(event) => clampMin(Number(event.target.value))}
              className="price-range-input absolute inset-x-0 h-4 w-full"
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={max}
              aria-label={t("priceMaxLabel")}
              onChange={(event) => clampMax(Number(event.target.value))}
              className="price-range-input absolute inset-x-0 h-4 w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
