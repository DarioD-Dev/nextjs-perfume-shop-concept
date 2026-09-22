import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { FaqSection } from "@/components/content/FaqSection";
import { PageHeader } from "@/components/content/PageHeader";
import { Section } from "@/components/ui/Section";

const QUESTION_NUMBERS = [1, 2, 3, 4, 5] as const;

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const [t, tMeta] = await Promise.all([
    getTranslations({ locale, namespace: "Faq" }),
    getTranslations({ locale, namespace: "Meta" }),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: tMeta("description"),
    locale,
    href: "/faq",
  });
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Faq");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QUESTION_NUMBERS.map((n) => ({
      "@type": "Question",
      name: t(`q${n}`),
      acceptedAnswer: { "@type": "Answer", text: t.markup(`a${n}`, { link: (chunks) => chunks }) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader title={t("title")} />
      <Section>
        <FaqSection />
      </Section>
    </>
  );
}
