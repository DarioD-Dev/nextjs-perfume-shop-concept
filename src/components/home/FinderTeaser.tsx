import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export async function FinderTeaser() {
  const t = await getTranslations("Finder");

  return (
    <Section tone="editorial">
      <Container className="flex flex-col items-center gap-5 text-center">
        <Sparkles size={28} strokeWidth={1.25} className="text-text-on-editorial" aria-hidden />
        <Heading level={2} variant="section" className="text-text-on-editorial">
          {t("teaserTitle")}
        </Heading>
        <p className="max-w-md font-sans text-text-on-editorial/80">{t("teaserBody")}</p>
        <ButtonLink
          href="/duft-finder"
          variant="secondary"
          className="border-text-on-editorial/60 text-text-on-editorial hover:border-text-on-editorial hover:bg-text-on-editorial hover:text-surface-editorial"
        >
          {t("teaserCta")}
        </ButtonLink>
      </Container>
    </Section>
  );
}
