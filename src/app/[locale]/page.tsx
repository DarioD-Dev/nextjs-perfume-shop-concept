import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { BrandStrip } from "@/components/home/BrandStrip";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { EditorialSplit } from "@/components/home/EditorialSplit";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { Hero } from "@/components/home/Hero";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { StoryQuote } from "@/components/home/StoryQuote";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/routing";
import { pickMessages } from "@/lib/pickMessages";

type Props = { params: Promise<{ locale: Locale }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  // Footer: NewsletterForm inside NewsletterSection. Shop: ProductImageCursor's
  // "view" pill, used by ProductCard inside FeaturedCollection's ProductGrid.
  // See layout.tsx for why this is scoped per page instead of provided globally.
  const messages = pickMessages(await getMessages(), ["Footer", "Shop"]);

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex flex-col">
        <Hero />
        <BrandStrip />

        <StoryQuote />

        <Reveal>
          <FeaturedCollection locale={locale} />
        </Reveal>

        <Section size="lg">
          <div className="flex flex-col gap-24">
            <Reveal direction="left">
              <EditorialSplit
                image="/images/editorial/split-1.jpg"
                alt=""
                eyebrow={t("editorial1Eyebrow")}
                title={t("editorial1Title")}
                body={t("editorial1Body")}
              />
            </Reveal>
            <Reveal direction="right">
              <EditorialSplit
                image="/images/editorial/split-2.jpg"
                alt=""
                eyebrow={t("editorial2Eyebrow")}
                title={t("editorial2Title")}
                body={t("editorial2Body")}
                reverse
              />
            </Reveal>
          </div>
        </Section>

        <Reveal>
          <CategoryTiles />
        </Reveal>

        <NewsletterSection />
      </div>
    </NextIntlClientProvider>
  );
}
