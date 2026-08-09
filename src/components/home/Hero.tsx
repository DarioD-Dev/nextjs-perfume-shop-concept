import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { Text } from "@/components/ui/Text";
import { HeroImage } from "./HeroImage";

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-surface-editorial">
      <HeroImage src="https://images.unsplash.com/photo-1627933234009-0f5ce6eb4e3a?w=1920&q=80&auto=format&fit=crop" />
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <Text variant="eyebrow" className="text-text-on-editorial/80">
          {t("heroEyebrow")}
        </Text>
        <h1 className="text-display-md font-display font-light text-text-on-editorial sm:text-display-lg">
          {t("heroTitle")}
        </h1>
        <Magnetic>
          {/* Outline-on-photo treatment instead of variant="primary"'s solid
              accent-gold fill — a solid warm color patch fights whatever hue
              the hero photo happens to be (looked muddy against a green
              bottle shot). A light border that fills on hover stays neutral
              regardless of the underlying image. */}
          <ButtonLink
            href="/shop"
            variant="secondary"
            size="lg"
            className="mt-4 border-text-on-editorial/60 text-text-on-editorial hover:border-text-on-editorial hover:bg-text-on-editorial hover:text-surface-editorial"
          >
            {t("heroCta")}
          </ButtonLink>
        </Magnetic>
      </div>
    </section>
  );
}
