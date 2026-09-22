import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { ContactDetails } from "@/components/content/ContactDetails";
import { ContactForm } from "@/components/content/ContactForm";
import { ContactMap } from "@/components/content/ContactMap";
import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pickMessages } from "@/lib/pickMessages";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const [t, tMeta] = await Promise.all([
    getTranslations({ locale, namespace: "Contact" }),
    getTranslations({ locale, namespace: "Meta" }),
  ]);
  return buildPageMetadata({
    title: t("title"),
    description: tMeta("description"),
    locale,
    href: "/contact",
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  // Only ContactForm is a client component that needs translations here.
  const messages = pickMessages(await getMessages(), ["Contact"] as const);

  return (
    <NextIntlClientProvider messages={messages}>
      <PageHeader title={t("title")} />
      <Section>
        <Container className="flex flex-col gap-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ContactDetails />
            <ContactForm />
          </div>
          <ContactMap />
        </Container>
      </Section>
    </NextIntlClientProvider>
  );
}
