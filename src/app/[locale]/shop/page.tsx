import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { BackToTopButton } from "@/components/shop/BackToTopButton";
import { CollectionFilters } from "@/components/shop/CollectionFilters";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { EmptyState } from "@/components/shop/EmptyState";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Section } from "@/components/ui/Section";
import type { Product, Season } from "@/data/types";
import { CONCENTRATION_ORDER } from "@/lib/concentration";
import { pickMessages } from "@/lib/pickMessages";
import {
  getAllNotes,
  getBrands,
  getConcentrations,
  getPriceRange,
  getProducts,
  type ProductFilters,
} from "@/lib/products";

const SORT_VALUES = ["price-asc", "price-desc", "newest"] as const;
const SEASON_VALUES = ["spring", "summer", "autumn", "winter"] as const;

function isSortValue(value: string | undefined): value is ProductFilters["sort"] {
  return value !== undefined && (SORT_VALUES as readonly string[]).includes(value);
}

function isSeasonValue(value: string | undefined): value is Season {
  return value !== undefined && (SEASON_VALUES as readonly string[]).includes(value);
}

function isConcentrationValue(value: string | undefined): value is Product["concentration"] {
  return value !== undefined && (CONCENTRATION_ORDER as readonly string[]).includes(value);
}

function toNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Ein Suchparameter kann mehrfach vorkommen — `?sort=a&sort=b` liefert ein
 * Array, kein `string`. Der frühere handgeschriebene Props-Typ behauptete
 * überall `string?`; die Prüffunktionen darunter casteten dann stillschweigend
 * und hätten ein Array als unbekannten Wert durchgewunken.
 *
 * `PageProps` gibt den ehrlichen Typ `string | string[] | undefined` her, und
 * diese Funktion trifft die Entscheidung sichtbar: Bei Mehrfachangabe zählt
 * der erste Wert. Danach greifen die bestehenden Guards unverändert.
 */
function ersterWert(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/shop">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Shop" });
  return { title: t("title") };
}

export default async function ShopPage({ params, searchParams }: PageProps<"/[locale]/shop">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Shop" });
  const sp = await searchParams;
  const season = ersterWert(sp.season);
  const concentration = ersterWert(sp.concentration);
  const sort = ersterWert(sp.sort);

  const filters: ProductFilters = {
    brand: ersterWert(sp.brand) || undefined,
    category: ersterWert(sp.category) || undefined,
    season: isSeasonValue(season) ? season : undefined,
    note: ersterWert(sp.note) || undefined,
    concentration: isConcentrationValue(concentration) ? concentration : undefined,
    search: ersterWert(sp.search) || undefined,
    priceMin: toNumber(ersterWert(sp.priceMin)),
    priceMax: toNumber(ersterWert(sp.priceMax)),
    sort: isSortValue(sort) ? sort : undefined,
  };

  const [products, brands, notes, concentrations, priceRange, messages] = await Promise.all([
    getProducts(locale, filters),
    getBrands(),
    getAllNotes(locale),
    getConcentrations(),
    getPriceRange(),
    // Shop: CollectionFilters/PriceRangeFilter/ProductImageCursor/SortSelect/
    // BackToTopButton. Home: CollectionFilters' category-pill labels
    // (tHome). Footer: NewsletterForm inside NewsletterSection below.
    getMessages().then((m) => pickMessages(m, ["Shop", "Home", "Footer"] as const)),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <Section tone="muted" className="pt-6 pb-6">
        <Container>
          <div id="shop-filters" className="flex scroll-mt-8 flex-col gap-6">
            <CollectionHeader count={products.length} category={filters.category} />
            <CollectionFilters
              brands={brands}
              notes={notes}
              concentrations={concentrations}
              priceRange={priceRange}
            />
          </div>
        </Container>
      </Section>
      <Section className="pt-10">
        <Container className="flex flex-col gap-10">
          {products.length === 0 ? (
            <EmptyState />
          ) : (
            <ProductGrid products={products} locale={locale} />
          )}
        </Container>
      </Section>
      <Section tone="muted">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Rule className="w-16" />
          <blockquote className="max-w-2xl font-display text-2xl font-light italic text-text sm:text-3xl">
            {t("collectionQuote")}
          </blockquote>
          <p className="font-sans text-sm uppercase tracking-wide text-text-secondary">
            {t("collectionQuoteAttribution")}
          </p>
        </Container>
      </Section>
      <NewsletterSection />
      <BackToTopButton targetId="shop-filters" />
    </NextIntlClientProvider>
  );
}
