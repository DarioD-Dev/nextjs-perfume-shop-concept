import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function AnnouncementBar() {
  const t = await getTranslations("Header");

  return (
    <div className="bg-surface-editorial text-text-on-editorial dark:border-b dark:border-text-on-editorial/15">
      <Container>
        <p className="py-2 text-center font-sans text-xs whitespace-nowrap uppercase tracking-[0.1em] sm:tracking-[0.18em]">
          {t("announcementCore")}
          <span className="hidden sm:inline"> — {t("announcementSuffix")}</span>
        </p>
      </Container>
    </div>
  );
}
