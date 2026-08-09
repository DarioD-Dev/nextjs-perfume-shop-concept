"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { IconButton } from "@/components/ui/IconButton";

// Only two locales exist, so a single toggle (shows the current one, click
// switches to the other) reads clearer and takes less space than a de/en
// pill pair — especially in the mobile header, where every icon-cluster
// pixel counts.
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const otherLocale = routing.locales.find((l) => l !== locale) ?? locale;

  function switchLocale() {
    router.replace(
      // @ts-expect-error -- `params` matches the dynamic segments of the
      // current `pathname` (e.g. a product slug); TypeScript can't prove
      // that statically, but it always holds for the active route.
      { pathname, params },
      { locale: otherLocale },
    );
  }

  return (
    <IconButton
      label={t("switchLanguageTo", { locale: otherLocale.toUpperCase() })}
      onClick={switchLocale}
      className={className}
    >
      <span className="font-sans text-xs uppercase tracking-wide">{locale}</span>
    </IconButton>
  );
}
