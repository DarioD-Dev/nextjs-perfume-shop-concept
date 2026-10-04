import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { PageHeader } from "@/components/content/PageHeader";
import { ScentFinder } from "@/components/finder/ScentFinder";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pickMessages } from "@/lib/pickMessages";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/duft-finder">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Finder" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    href: "/duft-finder",
  });
}

export default async function ScentFinderPage({ params }: PageProps<"/[locale]/duft-finder">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Finder");
  // Shop: season-Labels — ScentFinder fragt sie ab, statt eigene
  // Übersetzungen zu duplizieren.
  const messages = pickMessages(await getMessages(), ["Finder", "Shop"] as const);

  return (
    <NextIntlClientProvider messages={messages}>
      <PageHeader title={t("title")} subtitle={t("intro")} />
      <Section>
        <Container className="flex justify-center">
          <ScentFinder locale={locale} />
        </Container>
      </Section>
    </NextIntlClientProvider>
  );
}
