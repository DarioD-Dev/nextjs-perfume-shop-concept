import { getTranslations } from "next-intl/server";
import { Heading } from "@/components/ui/Heading";

// `as const` plus Wächter statt einer Record<string, string>-Annotation:
// Die Annotation verbreitert die Werte zu `string` und wirft genau die
// Literaltypen weg, die t() zum Prüfen des Schlüssels braucht — der Aufruf
// unten war dadurch ungeprüft, obwohl die Typprüfung der Nachrichten aktiv
// ist. Dasselbe Muster steckte in der Leistungen-Seite von Salon Kupferglanz.
const TITLE_KEY_BY_CATEGORY = {
  damen: "titleDamen",
  herren: "titleHerren",
  unisex: "titleUnisex",
} as const;

function istKategorie(wert: string): wert is keyof typeof TITLE_KEY_BY_CATEGORY {
  return wert in TITLE_KEY_BY_CATEGORY;
}

// Deliberately compact — the active "Kollektion" nav link already tells you
// where you are, so a second giant centered title just underneath was pure
// duplication. Title and count sit close together on the left instead of a
// tall standalone block or a justify-between spread (which left a big empty
// gap on wide screens).
export async function CollectionHeader({ count, category }: { count: number; category?: string }) {
  const t = await getTranslations("Shop");
  const titleKey = category && istKategorie(category) ? TITLE_KEY_BY_CATEGORY[category] : "title";

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <Heading level={1} variant="section">
        {t(titleKey)}
      </Heading>
      <p className="font-sans text-sm text-text-secondary">{t("resultCount", { count })}</p>
    </div>
  );
}
