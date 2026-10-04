"use client";

import {
  ArrowLeft,
  Citrus,
  Coffee,
  Coins,
  Flame,
  Flower,
  Flower2,
  Gem,
  Leaf,
  PartyPopper,
  RotateCcw,
  Snowflake,
  Sun,
  TreeDeciduous,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { ScentProfile, Season } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { resolveProduct } from "@/lib/localizeProduct";
import { pickScentMatch, type Budget, type Occasion } from "@/lib/scentFinder";

// Von Hand aus den tatsächlichen Notenprofilen der Kollektion abgeleitet,
// siehe `profile` in data/types.ts. Keine Geschlechter-Frage mehr: Ein Duft
// riecht nicht nach "Damen" oder "Herren" — siehe pickScentMatch.
const PROFILES = ["frisch", "blumig", "holzig", "orientalisch"] as const;
const PROFILE_LABEL_KEYS = {
  frisch: "profileFrisch",
  blumig: "profileBlumig",
  holzig: "profileHolzig",
  orientalisch: "profileOrientalisch",
} as const;
const PROFILE_ICONS = {
  frisch: Citrus,
  blumig: Flower,
  holzig: TreeDeciduous,
  orientalisch: Flame,
} as const;

const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
const SEASON_LABEL_KEYS = {
  spring: "seasonSpring",
  summer: "seasonSummer",
  autumn: "seasonAutumn",
  winter: "seasonWinter",
} as const;
const SEASON_ICONS = { spring: Flower2, summer: Sun, autumn: Leaf, winter: Snowflake } as const;

const OCCASIONS = ["alltag", "besonders"] as const;
const OCCASION_LABEL_KEYS = { alltag: "occasionAlltag", besonders: "occasionBesonders" } as const;
const OCCASION_ICONS = { alltag: Coffee, besonders: PartyPopper } as const;

const BUDGETS = ["tief", "mittel", "hoch"] as const;
const BUDGET_LABEL_KEYS = {
  tief: "budgetTief",
  mittel: "budgetMittel",
  hoch: "budgetHoch",
} as const;
const BUDGET_ICONS = { tief: Coins, mittel: Wallet, hoch: Gem } as const;

const TOTAL_STEPS = 4;

const OPTION_BUTTON =
  "flex flex-col items-center gap-2 rounded-lg border border-border-strong px-4 py-6 font-sans text-sm uppercase tracking-wide text-text transition-colors hover:border-accent-gold hover:text-accent-gold";

const BACK_BUTTON =
  "flex items-center gap-1.5 font-sans text-xs uppercase tracking-wide text-text-secondary transition-colors hover:text-accent-gold";

export function ScentFinder({ locale }: { locale: Locale }) {
  const t = useTranslations("Finder");
  const tShop = useTranslations("Shop");

  const [profile, setProfile] = useState<ScentProfile | null>(null);
  const [season, setSeason] = useState<Season | null>(null);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  function restart() {
    setProfile(null);
    setSeason(null);
    setOccasion(null);
    setBudget(null);
  }

  // Vier echte Antworten, kein erfundenes Ergebnis: pickScentMatch wählt
  // immer eines der tatsächlichen Produkte aus data/products.ts aus.
  if (profile && season && occasion && budget) {
    const match = resolveProduct(pickScentMatch({ profile, season, occasion, budget }), locale);
    const allNotes = [...match.notes.top, ...match.notes.heart, ...match.notes.base];

    return (
      <div className="flex flex-col items-center gap-8 py-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-text-secondary">
            {t("resultEyebrow")}
          </p>
          <p className="max-w-md font-sans text-sm text-text-secondary">{t("resultNote")}</p>
        </div>

        <div className="w-full max-w-[16rem]">
          <ProductCard product={match} locale={locale} />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">
            {t("resultNotesTitle")}
          </p>
          <p className="max-w-sm font-sans text-sm text-text">{allNotes.join(" · ")}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={{ pathname: "/shop/[slug]", params: { slug: match.slug } }}>
            {t("viewProduct")}
          </ButtonLink>
          <button type="button" onClick={restart} className={BACK_BUTTON}>
            <RotateCcw size={14} strokeWidth={1.5} aria-hidden />
            {t("restart")}
          </button>
        </div>
      </div>
    );
  }

  const step = profile === null ? 0 : season === null ? 1 : occasion === null ? 2 : 3;

  return (
    <div className="flex flex-col items-center gap-8 py-4 text-center">
      <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">
        {t("stepOf", { step: step + 1, total: TOTAL_STEPS })}
      </p>

      {step === 0 && (
        <>
          <h2 className="font-display text-2xl font-light text-text">{t("questionProfile")}</h2>
          <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
            {PROFILES.map((value) => {
              const Icon = PROFILE_ICONS[value];
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setProfile(value)}
                  className={OPTION_BUTTON}
                >
                  <Icon size={22} strokeWidth={1.5} aria-hidden />
                  {t(PROFILE_LABEL_KEYS[value])}
                </button>
              );
            })}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2 className="font-display text-2xl font-light text-text">{t("questionSeason")}</h2>
          <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
            {SEASONS.map((value) => {
              const Icon = SEASON_ICONS[value];
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSeason(value)}
                  className={OPTION_BUTTON}
                >
                  <Icon size={22} strokeWidth={1.5} aria-hidden />
                  {tShop(SEASON_LABEL_KEYS[value])}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => setProfile(null)} className={BACK_BUTTON}>
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
            {t("back")}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="font-display text-2xl font-light text-text">{t("questionOccasion")}</h2>
          <div className="grid w-full max-w-sm grid-cols-2 gap-3">
            {OCCASIONS.map((value) => {
              const Icon = OCCASION_ICONS[value];
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setOccasion(value)}
                  className={OPTION_BUTTON}
                >
                  <Icon size={22} strokeWidth={1.5} aria-hidden />
                  {t(OCCASION_LABEL_KEYS[value])}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => setSeason(null)} className={BACK_BUTTON}>
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
            {t("back")}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="font-display text-2xl font-light text-text">{t("questionBudget")}</h2>
          <div className="grid w-full max-w-md grid-cols-3 gap-3">
            {BUDGETS.map((value) => {
              const Icon = BUDGET_ICONS[value];
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setBudget(value)}
                  className={OPTION_BUTTON}
                >
                  <Icon size={22} strokeWidth={1.5} aria-hidden />
                  {t(BUDGET_LABEL_KEYS[value])}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => setOccasion(null)} className={BACK_BUTTON}>
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
            {t("back")}
          </button>
        </>
      )}
    </div>
  );
}
