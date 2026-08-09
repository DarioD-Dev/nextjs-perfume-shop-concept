import { getTranslations } from "next-intl/server";

export async function EmptyState() {
  const t = await getTranslations("Shop");

  return <p className="py-20 text-center font-sans text-text-secondary">{t("empty")}</p>;
}
