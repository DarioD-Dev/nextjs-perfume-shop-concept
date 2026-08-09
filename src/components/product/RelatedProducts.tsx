import { getTranslations } from "next-intl/server";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/routing";
import { getRelatedProducts } from "@/lib/products";

export async function RelatedProducts({ locale, slug }: { locale: Locale; slug: string }) {
  const t = await getTranslations("Product");
  const products = await getRelatedProducts(locale, slug, 4);

  if (products.length === 0) return null;

  return (
    <Section tone="muted">
      <Container className="flex flex-col gap-10">
        <Heading level={2} variant="section" className="text-center">
          {t("related")}
        </Heading>
        <ProductGrid products={products} locale={locale} />
      </Container>
    </Section>
  );
}
