import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { EditorialSplit } from "@/components/home/EditorialSplit";
import { PageHeader } from "@/components/content/PageHeader";
import { ValuesGrid } from "@/components/content/ValuesGrid";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("title"), description: t("body") };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = assertLocale((await params).locale);
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
