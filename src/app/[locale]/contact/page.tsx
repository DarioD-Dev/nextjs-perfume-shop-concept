import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { ContactDetails } from "@/components/content/ContactDetails";
import { ContactForm } from "@/components/content/ContactForm";
import { ContactMap } from "@/components/content/ContactMap";
import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/routing";
import { pickMessages } from "@/lib/pickMessages";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("title") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
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
