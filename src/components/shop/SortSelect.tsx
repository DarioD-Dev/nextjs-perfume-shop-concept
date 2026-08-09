"use client";

import { ArrowDownWideNarrow, ArrowUpDown, ArrowUpNarrowWide, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const SORT_OPTIONS = [
  { value: "price-asc", icon: ArrowUpNarrowWide, labelKey: "sortPriceAsc" },
  { value: "price-desc", icon: ArrowDownWideNarrow, labelKey: "sortPriceDesc" },
  { value: "newest", icon: Sparkles, labelKey: "sortNewest" },
] as const;

export function SortSelect({ className }: { className?: string }) {
  const t = useTranslations("Shop");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentValue = searchParams.get("sort") ?? "";
  const current = SORT_OPTIONS.find((option) => option.value === currentValue);
  const TriggerIcon = current?.icon ?? ArrowUpDown;

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

  function updateSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.replace(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("sortLabel")}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
          open || current
            ? "border-accent-gold text-accent-gold"
            : "border-border-strong text-text hover:border-accent-gold hover:text-accent-gold",
        )}
      >
        <TriggerIcon size={18} strokeWidth={1.5} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("sortLabel")}
          className="absolute right-0 top-full z-20 mt-2 min-w-48 overflow-hidden rounded-xl border border-border-strong bg-surface-raised py-1 shadow-lg"
        >
          {SORT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = option.value === currentValue;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => updateSort(isSelected ? "" : option.value)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2 text-left font-sans text-sm transition-colors hover:bg-surface-muted hover:text-accent-gold",
                    isSelected && "text-accent-gold",
                  )}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  {t(option.labelKey)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
