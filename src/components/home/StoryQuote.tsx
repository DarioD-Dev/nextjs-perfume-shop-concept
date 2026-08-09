import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Section } from "@/components/ui/Section";

export async function StoryQuote() {
  const t = await getTranslations("Home");

  return (
    <Section tone="muted">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Rule className="w-16" />
        <blockquote className="max-w-2xl text-2xl font-display font-light italic text-text sm:text-3xl">
          {t("quote")}
        </blockquote>
        <p className="font-sans text-sm uppercase tracking-wide text-text-secondary">{t("quoteAttribution")}</p>
      </Container>
    </Section>
  );
}
