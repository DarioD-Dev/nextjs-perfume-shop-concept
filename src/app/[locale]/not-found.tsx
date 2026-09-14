import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Der Rückweg ist der eigentliche Zweck einer 404-Seite. Ohne ihn war sie
// hier bis 14.09.2026 eine Sackgasse in Markenfarbe — die einzige der vier
// Seiten mit gestalteter Fehlerseite, aber ohne Ausgang.
export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-display-md font-display text-text">{t("title")}</h1>
      <p className="max-w-md font-sans text-text-secondary">{t("body")}</p>
      <ButtonLink href="/" className="mt-2">
        {t("home")}
      </ButtonLink>
    </div>
  );
}
