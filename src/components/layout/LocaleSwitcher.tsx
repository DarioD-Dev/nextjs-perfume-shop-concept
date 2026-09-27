"use client";

import { Check, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

/**
 * Ein Knopf mit Globus, die Sprachen erst in der Liste darunter.
 *
 * Vorher stand hier ein Umschalter für genau zwei Sprachen: Er zeigte die
 * aktuelle und sprang auf „die andere". Mit einer dritten Sprache gibt es
 * keine andere mehr — `routing.locales.find(l => l !== locale)` hätte
 * willkürlich die erste genommen und die dritte unerreichbar gemacht.
 *
 * Globus statt Flagge: Windows liefert keine Flaggen-Emoji aus und zeigt
 * stattdessen das Buchstabenpaar des Ländercodes. Und Flaggen stehen für
 * Länder, nicht für Sprachen — 🇩🇪 wäre für ein Wiener Haus falsch, 🇦🇹
 * würde deutsche Kundschaft ausschließen.
 *
 * Aufbau und Optik folgen `ui/Select.tsx`, dem Dropdown, das dieses Projekt
 * schon für Sortierung und Filter benutzt: gerundeter Rahmen auf
 * `surface-raised`, Gold für die aktive Zeile, Häkchen als Bestätigung.
 */
const LANGUAGE_NAMES: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  hr: "Hrvatski",
};

export function LocaleSwitcher({ className }: { className?: string }) {
  // Kein Cast nötig: Seit die AppConfig in src/global.d.ts steht, liefert
  // useLocale() bereits die Union statt eines nackten string.
  const locale = useLocale();
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  // Schließen bei Klick nach außen und bei Escape. Escape gibt den Fokus an
  // den Knopf zurück — sonst fällt er auf <body>, und der nächste Tabulator
  // beginnt wieder ganz oben auf der Seite.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!(event.target instanceof Node) || !rootRef.current?.contains(event.target))
        setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function select(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    router.replace(
      // `params` muss mit: Dieses Projekt hat mit /shop/[slug] eine dynamische
      // Route, und `usePathname()` liefert dort die Vorlage, nicht den
      // gefüllten Pfad. Ohne die Parameter verlöre ein Sprachwechsel auf einer
      // Produktseite den Slug.
      //
      // @ts-expect-error -- `params` passt zu den dynamischen Segmenten des
      // aktuellen `pathname`; TypeScript kann das statisch nicht beweisen, für
      // die aktive Route gilt es aber immer.
      { pathname, params },
      { locale: next },
    );
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <IconButton
        ref={buttonRef}
        label={`${t("language")}: ${LANGUAGE_NAMES[locale]}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className={open ? "text-accent-gold" : undefined}
      >
        <Globe size={20} strokeWidth={1.5} />
      </IconButton>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t("language")}
          className="absolute right-0 top-full z-30 mt-2 min-w-max overflow-hidden rounded-xl border border-border-strong bg-surface-raised py-1 shadow-lg"
        >
          {routing.locales.map((l) => {
            const isSelected = l === locale;
            return (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  // Ohne eigenes lang-Attribut liest ein Screenreader
                  // „Hrvatski" mit der Stimme der Seitensprache vor.
                  lang={l}
                  onClick={() => select(l)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 whitespace-nowrap px-4 py-2 text-left font-sans text-sm transition-colors hover:bg-surface-muted hover:text-accent-gold",
                    isSelected && "text-accent-gold",
                  )}
                >
                  {LANGUAGE_NAMES[l]}
                  {isSelected && <Check size={14} strokeWidth={1.5} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
