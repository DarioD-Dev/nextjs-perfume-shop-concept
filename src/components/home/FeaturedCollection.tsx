import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { ProductGrid } from "@/components/shop/ProductGrid";
import type { Locale } from "@/i18n/routing";
import { getProducts, type ProductFilters } from "@/lib/products";

// Which products fill this homepage slot is a one-line swap, not a
// re-architecture: pass a different `sort` at the call site (page.tsx).
// "newest" for now since it's honestly derivable from real product data
// (releaseYear) — "bestselling" would need real sales numbers, which this
// demo doesn't have. Once Shopify is wired up (see Bauplan Phase 2), this
// can point at Shopify's own BEST_SELLING sort key with no other change.
//
// Title, CTA copy, and the CTA link's ?sort= are all tied to "newest"
// right now (see messages: featuredTitle/featuredCta). If `sort` ever
// changes here, update those three together — not generalized into a
// per-strategy copy table yet since "newest" is still the only real case.
export async function FeaturedCollection({
  locale,
  sort = "newest",
}: {
  locale: Locale;
  sort?: ProductFilters["sort"];
}) {
  const t = await getTranslations("Home");
  const products = await getProducts(locale, { sort });
  const featured = products.slice(0, 4);

  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading level={2} variant="section">
            {t("featuredTitle")}
          </Heading>
        </div>
        <ProductGrid products={featured} locale={locale} />
        <div className="flex justify-center">
          <ButtonLink href={{ pathname: "/shop", query: { sort: "newest" } }} variant="secondary">
            {t("featuredCta")}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
