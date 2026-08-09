import { getTranslations } from "next-intl/server";
import { Heading } from "@/components/ui/Heading";

const TITLE_KEY_BY_CATEGORY: Record<string, string> = {
  damen: "titleDamen",
  herren: "titleHerren",
  unisex: "titleUnisex",
};

// Deliberately compact — the active "Kollektion" nav link already tells you
// where you are, so a second giant centered title just underneath was pure
// duplication. Title and count sit close together on the left instead of a
// tall standalone block or a justify-between spread (which left a big empty
// gap on wide screens).
export async function CollectionHeader({ count, category }: { count: number; category?: string }) {
  const t = await getTranslations("Shop");
  const titleKey = (category && TITLE_KEY_BY_CATEGORY[category]) || "title";

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <Heading level={1} variant="section">
        {t(titleKey)}
      </Heading>
      <p className="font-sans text-sm text-text-secondary">{t("resultCount", { count })}</p>
    </div>
  );
}
