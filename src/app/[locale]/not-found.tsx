import { getTranslations } from "next-intl/server";

export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-display-md font-display text-text">{t("title")}</h1>
    </div>
  );
}
