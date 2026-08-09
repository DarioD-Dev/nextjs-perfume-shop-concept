import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
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
import type { Locale } from "@/i18n/routing";
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
    return SORT_VALUES.includes(value as (typeof SORT_VALUES)[number]);
}

function isSeasonValue(value: string | undefined): value is Season {
    return SEASON_VALUES.includes(value as (typeof SEASON_VALUES)[number]);
}

function isConcentrationValue(value: string | undefined): value is Product["concentration"] {
    return CONCENTRATION_ORDER.includes(value as Product["concentration"]);
}

function toNumber(value: string | undefined): number | undefined {
    if (!value) return undefined;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
}

type Props = {
    params: Promise<{ locale: Locale }>;
    searchParams: Promise<{
        brand?: string;
        category?: string;
        season?: string;
        note?: string;
        concentration?: string;
        search?: string;
        priceMin?: string;
        priceMax?: string;
        sort?: string;
    }>;
};

export async function generateMetadata({ params }: { params: Props["params"] }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Shop" });
    return { title: t("title") };
}

export default async function ShopPage({ params, searchParams }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Shop" });
    const sp = await searchParams;

    const filters: ProductFilters = {
        brand: sp.brand || undefined,
        category: sp.category || undefined,
        season: isSeasonValue(sp.season) ? sp.season : undefined,
        note: sp.note || undefined,
        concentration: isConcentrationValue(sp.concentration) ? sp.concentration : undefined,
        search: sp.search || undefined,
        priceMin: toNumber(sp.priceMin),
        priceMax: toNumber(sp.priceMax),
        sort: isSortValue(sp.sort) ? sp.sort : undefined,
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
                    {products.length === 0 ? <EmptyState /> : <ProductGrid products={products} locale={locale} />}
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
