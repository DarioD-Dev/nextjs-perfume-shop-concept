"use client";

import { ChevronDown, Flower2, Leaf, Mars, Search, Snowflake, Sun, Venus, VenusAndMars, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { PriceRangeFilter } from "@/components/shop/PriceRangeFilter";
import { SortSelect } from "@/components/shop/SortSelect";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { Product } from "@/data/types";
import { CONCENTRATION_LABELS } from "@/lib/concentration";
import { cn } from "@/lib/cn";

const CATEGORIES = ["damen", "herren", "unisex"] as const;

const CATEGORY_LABEL_KEYS = {
  damen: "categoryDamen",
  herren: "categoryHerren",
  unisex: "categoryUnisex",
} as const;

const CATEGORY_ICONS = {
  damen: Venus,
  herren: Mars,
  unisex: VenusAndMars,
} as const;

const SEASONS = ["spring", "summer", "autumn", "winter"] as const;

const SEASON_LABEL_KEYS = {
  spring: "seasonSpring",
  summer: "seasonSummer",
  autumn: "seasonAutumn",
  winter: "seasonWinter",
} as const;

const SEASON_ICONS = {
  spring: Flower2,
  summer: Sun,
  autumn: Leaf,
  winter: Snowflake,
} as const;

type PriceRange = { min: number; max: number };

// "Mehr Filter" folds open below the primary row (grid-rows 0fr/1fr trick —
// animates smoothly in both directions, unlike native <details>). An
// absolute-positioned overlay was tried too, but that only earned its
// complexity back when the trigger and the panel lived in two differently
// coloured sections; now that both are back in one section, the simpler
// push-down reveal is the better fit.
export function CollectionFilters({
  brands,
  notes,
  concentrations,
  priceRange,
}: {
  brands: string[];
  notes: string[];
  concentrations: Product["concentration"][];
  priceRange: PriceRange;
}) {
  const t = useTranslations("Shop");
  const tHome = useTranslations("Home");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const moreFiltersRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  // Panel content is clipped (overflow-hidden) only while the height is
  // animating, so the reveal looks like a slide-open — but once fully open
  // it must stop clipping, otherwise the Select/PriceRangeFilter dropdowns
  // inside get cut off instead of floating over the page. A timeout matching
  // the transition duration is used instead of a transitionend listener so
  // this doesn't depend on a transition actually firing (prefers-reduced-
  // motion can skip it, which would otherwise leave it clipped forever).
  const [panelSettled, setPanelSettled] = useState(false);

  function toggleMoreFilters() {
    setMoreFiltersOpen((open) => {
      const next = !open;
      if (next) {
        setTimeout(() => setPanelSettled(true), 300);
      } else {
        setPanelSettled(false);
      }
      return next;
    });
  }

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
  }

  function resetAll() {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
  }

  const hasActiveFilters = searchParams.toString().length > 0;
  const hasMoreFiltersActive =
    Boolean(searchParams.get("brand")) ||
    Boolean(searchParams.get("season")) ||
    Boolean(searchParams.get("note")) ||
    Boolean(searchParams.get("concentration")) ||
    Boolean(searchParams.get("priceMin")) ||
    Boolean(searchParams.get("priceMax"));

  // Debounced so we don't push a URL update on every keystroke.
  useEffect(() => {
    const current = searchParams.get("search") ?? "";
    if (searchInput === current) return;
    const timeout = setTimeout(() => updateParam("search", searchInput), 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    if (!moreFiltersOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!moreFiltersRef.current?.contains(event.target as Node)) setMoreFiltersOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreFiltersOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreFiltersOpen]);

  const brandOptions = [
    { value: "", label: t("allBrands") },
    ...brands.map((brand) => ({ value: brand, label: brand })),
  ];
  const seasonOptions = [
    { value: "", label: t("allSeasons") },
    ...SEASONS.map((season) => {
      const Icon = SEASON_ICONS[season];
      return {
        value: season,
        label: t(SEASON_LABEL_KEYS[season]),
        icon: <Icon size={14} strokeWidth={1.5} />,
      };
    }),
  ];
  const noteOptions = [{ value: "", label: t("allNotes") }, ...notes.map((note) => ({ value: note, label: note }))];
  const concentrationOptions = [
    { value: "", label: t("allConcentrations") },
    ...concentrations.map((concentration) => ({
      value: concentration,
      label: CONCENTRATION_LABELS[concentration],
    })),
  ];

  return (
    <div ref={moreFiltersRef} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-100 min-w-40">
          <Search
            size={14}
            strokeWidth={1.5}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <Input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="w-full rounded-full border-border-strong py-2 pr-4 pl-9 text-sm"
          />
        </div>
        <div className="flex gap-2">
          {CATEGORIES.map((category) => {
            const active = searchParams.get("category") === category;
            const Icon = CATEGORY_ICONS[category];
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => updateParam("category", active ? "" : category)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-wide transition-colors",
                  active
                    ? "border-accent-gold bg-accent-gold text-text-on-accent"
                    : "border-border-strong text-text hover:border-accent-gold hover:text-accent-gold",
                )}
              >
                <Icon size={14} strokeWidth={1.5} aria-hidden />
                {tHome(CATEGORY_LABEL_KEYS[category])}
                {active && <X size={12} strokeWidth={2} aria-hidden />}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-expanded={moreFiltersOpen}
          aria-controls={panelId}
          onClick={toggleMoreFilters}
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-wide transition-colors",
            moreFiltersOpen || hasMoreFiltersActive
              ? "border-accent-gold text-accent-gold"
              : "border-border-strong text-text hover:border-accent-gold hover:text-accent-gold",
          )}
        >
          {t("moreFilters")}
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className={cn("transition-transform", moreFiltersOpen && "rotate-180")}
          />
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetAll}
            className="flex items-center gap-1 font-sans text-xs uppercase tracking-wide text-text-secondary transition-colors hover:text-accent-gold"
          >
            <X size={12} strokeWidth={2} aria-hidden />
            {t("resetFilters")}
          </button>
        )}
        <SortSelect className="sm:ml-auto" />
      </div>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          moreFiltersOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className={panelSettled ? "overflow-visible" : "overflow-hidden"}>
          <div className="flex flex-wrap items-start gap-4 rounded-2xl border border-border-strong bg-surface-raised p-4 shadow-lg">
            <Select
              ariaLabel={t("filterBrand")}
              placeholder={t("filterBrand")}
              value={searchParams.get("brand") ?? ""}
              onChange={(value) => updateParam("brand", value)}
              options={brandOptions}
            />
            <Select
              ariaLabel={t("filterSeason")}
              placeholder={t("filterSeason")}
              value={searchParams.get("season") ?? ""}
              onChange={(value) => updateParam("season", value)}
              options={seasonOptions}
            />
            <Select
              ariaLabel={t("filterNote")}
              placeholder={t("filterNote")}
              value={searchParams.get("note") ?? ""}
              onChange={(value) => updateParam("note", value)}
              options={noteOptions}
            />
            <Select
              ariaLabel={t("filterConcentration")}
              placeholder={t("filterConcentration")}
              value={searchParams.get("concentration") ?? ""}
              onChange={(value) => updateParam("concentration", value)}
              options={concentrationOptions}
            />
            <PriceRangeFilter priceRange={priceRange} />
          </div>
        </div>
      </div>
    </div>
  );
}
