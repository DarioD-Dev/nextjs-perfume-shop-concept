"use client";

import {
  ArrowLeft,
  Coffee,
  Coins,
  Gem,
  Leaf,
  PartyPopper,
  RotateCcw,
  Snowflake,
  Sun,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, type ComponentType } from "react";
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
// Echte Flakon-Fotos statt Icons — ein Satz Icon-Kacheln sah für den
// wichtigsten Schritt zu mager aus, und erfundene Stimmungsbilder hätten dem
// Projekt widersprochen ("nichts vortäuschen"). Je ein tatsächliches Produkt
// der Kollektion, eines pro Charakter — dieselbe Auswahl wie im
// Portfolio-Vorgeschmack.
const PROFILE_IMAGES = {
  frisch: "/images/products/atelier-solane-neroli-sauvage.jpg",
  blumig: "/images/products/maison-verrier-fleur-nocturne.jpg",
  holzig: "/images/products/casa-brunelli-cuir-vetiver.jpg",
  orientalisch: "/images/products/maison-verrier-oud-imperial.jpg",
} as const;

const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
const SEASON_LABEL_KEYS = {
  spring: "seasonSpring",
  summer: "seasonSummer",
  autumn: "seasonAutumn",
  winter: "seasonWinter",
} as const;
// Flower2 wird hier bewusst nicht mehr gebraucht — "Frühling" bekommt sein
// eigenes Blatt-Icon, der Blumen-Charakter oben hat jetzt ein echtes Foto.
const SEASON_ICONS = { spring: Leaf, summer: Sun, autumn: Leaf, winter: Snowflake } as const;

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

// Kreis-Icon, Name, ein Goldstrich, der beim Hover aufgeht — dieselbe
// Wachstumsbewegung wie die Nav-Unterstreichung in Nav.tsx, hier nur auf
// eine Karte statt auf einen Link angewendet. Kein Farbfächer pro Karte:
// Die Palette ist bewusst auf Gold/Rost als einzigen Akzent begrenzt.
function OptionCard({
  icon: Icon,
  label,
  onClick,
}: {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-4 rounded-2xl border border-border-strong bg-surface-raised px-5 py-9 transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold hover:shadow-[0_20px_45px_-28px_rgba(0,0,0,0.5)]"
    >
      <span className="flex size-16 items-center justify-center rounded-full border border-border-strong text-text transition-colors duration-300 group-hover:border-accent-gold group-hover:text-accent-gold">
        <Icon size={26} strokeWidth={1.25} aria-hidden />
      </span>
      <span className="font-sans text-sm uppercase tracking-wide text-text">{label}</span>
      <span
        aria-hidden
        className="h-px w-6 origin-center scale-x-0 bg-accent-gold transition-transform duration-300 group-hover:scale-x-100"
      />
    </button>
  );
}

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
      <div className="flex w-full max-w-3xl flex-col items-center gap-10 py-6 text-center sm:flex-row sm:items-start sm:gap-14 sm:py-10 sm:text-left">
        <div className="w-full max-w-[18rem] shrink-0 sm:w-72">
          <ProductCard product={match} locale={locale} />
        </div>

        <div className="flex flex-1 flex-col items-center gap-7 sm:items-start">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-text-secondary">
              {t("resultEyebrow")}
            </p>
            <p className="mt-2 max-w-sm font-sans text-sm text-text-secondary">{t("resultNote")}</p>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">
              {t("resultNotesTitle")}
            </p>
            <p className="mt-1 max-w-sm font-sans text-sm text-text">{allNotes.join(" · ")}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <ButtonLink href={{ pathname: "/shop/[slug]", params: { slug: match.slug } }}>
              {t("viewProduct")}
            </ButtonLink>
            <button type="button" onClick={restart} className={BACK_BUTTON}>
              <RotateCcw size={14} strokeWidth={1.5} aria-hidden />
              {t("restart")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const step = profile === null ? 0 : season === null ? 1 : occasion === null ? 2 : 3;

  return (
    <div className="flex w-full flex-col items-center gap-9 py-6 text-center sm:py-10">
      <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">
        {t("stepOf", { step: step + 1, total: TOTAL_STEPS })}
      </p>

      {step === 0 && (
        <>
          <h2 className="font-display text-3xl font-light text-text sm:text-4xl">
            {t("questionProfile")}
          </h2>
          <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {PROFILES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setProfile(value)}
                className="group relative aspect-4/5 overflow-hidden rounded-xl"
              >
                <Image
                  src={PROFILE_IMAGES[value]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22vw, 42vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-surface-editorial/35 transition-colors duration-300 group-hover:bg-surface-editorial/50" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 pb-5">
                  <span
                    aria-hidden
                    className="h-px w-6 origin-center scale-x-0 bg-accent-gold transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <span className="font-sans text-xs uppercase tracking-wide text-text-on-editorial sm:text-sm">
                    {t(PROFILE_LABEL_KEYS[value])}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2 className="font-display text-3xl font-light text-text sm:text-4xl">
            {t("questionSeason")}
          </h2>
          <div className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {SEASONS.map((value) => (
              <OptionCard
                key={value}
                icon={SEASON_ICONS[value]}
                label={tShop(SEASON_LABEL_KEYS[value])}
                onClick={() => setSeason(value)}
              />
            ))}
          </div>
          <button type="button" onClick={() => setProfile(null)} className={BACK_BUTTON}>
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
            {t("back")}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="font-display text-3xl font-light text-text sm:text-4xl">
            {t("questionOccasion")}
          </h2>
          <div className="grid w-full max-w-md grid-cols-2 gap-4">
            {OCCASIONS.map((value) => (
              <OptionCard
                key={value}
                icon={OCCASION_ICONS[value]}
                label={t(OCCASION_LABEL_KEYS[value])}
                onClick={() => setOccasion(value)}
              />
            ))}
          </div>
          <button type="button" onClick={() => setSeason(null)} className={BACK_BUTTON}>
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
            {t("back")}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="font-display text-3xl font-light text-text sm:text-4xl">
            {t("questionBudget")}
          </h2>
          <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
            {BUDGETS.map((value) => (
              <OptionCard
                key={value}
                icon={BUDGET_ICONS[value]}
                label={t(BUDGET_LABEL_KEYS[value])}
                onClick={() => setBudget(value)}
              />
            ))}
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
