"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Was `not-found.tsx` für falsche Adressen ist, ist diese Seite für Fehler
 * beim Rendern — in der Sprache und im Aussehen des Hauses statt der weißen
 * englischen Standardseite von Next.
 *
 * Zwei Wege hinaus, weil es zwei Fälle gibt: Ein vorübergehender Fehler geht
 * mit `reset()` weg, ohne dass die ganze Seite neu lädt. Bleibt er, ist der
 * Weg zur Startseite der Ausgang — ohne ihn wäre die Seite eine Sackgasse in
 * Markenfarbe, genau wie es die 404-Seite bis zum 14.09.2026 war.
 *
 * Der Namespace „Error" steht in der `pickMessages`-Liste des Layouts: Diese
 * Komponente ist eine Client-Komponente, und nur was dort aufgeführt ist,
 * erreicht den Browser.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-display-md font-display text-text">{t("title")}</h1>
      <p className="max-w-md font-sans text-text-secondary">{t("body")}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={reset}>
          {t("retry")}
        </Button>
        <ButtonLink href="/" variant="secondary">
          {t("home")}
        </ButtonLink>
      </div>
    </div>
  );
}
