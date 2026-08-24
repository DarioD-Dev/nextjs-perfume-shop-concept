import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EditorialSplit } from "@/components/home/EditorialSplit";
import { PageHeader } from "@/components/content/PageHeader";
import { ValuesGrid } from "@/components/content/ValuesGrid";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("title"), description: t("body") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("body")} />
      <Section>
        <EditorialSplit
          image="/images/editorial/about.jpg"
          alt=""
          eyebrow={t("storyEyebrow")}
          title={t("storyTitle")}
          body={t("storyBody")}
        />
      </Section>
      <Section tone="muted">
        <ValuesGrid />
      </Section>
    </>
  );
}
