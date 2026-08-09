import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Rule } from "@/components/ui/Rule";
import { Section } from "@/components/ui/Section";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

export async function NewsletterSection() {
  const t = await getTranslations("Home");

  return (
    <Section tone="editorial">
      <Container className="flex flex-col items-center gap-5 text-center">
        <Rule className="w-16" />
        <Heading level={2} variant="section" className="text-text-on-editorial">
          {t("newsletterTitle")}
        </Heading>
        <p className="max-w-md font-sans text-text-on-editorial/80">{t("newsletterBody")}</p>
        <NewsletterForm />
      </Container>
    </Section>
  );
}
