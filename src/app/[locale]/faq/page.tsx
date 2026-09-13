import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { FaqSection } from "@/components/content/FaqSection";
import { PageHeader } from "@/components/content/PageHeader";
import { Section } from "@/components/ui/Section";

const QUESTION_NUMBERS = [1, 2, 3, 4, 5] as const;

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Faq" });
  return { title: t("title") };
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
