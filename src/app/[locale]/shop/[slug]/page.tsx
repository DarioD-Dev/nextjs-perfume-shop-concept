import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ProductAccordion } from "@/components/product/ProductAccordion";
import { ProductBreadcrumbs } from "@/components/product/ProductBreadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { FragranceNotes } from "@/components/product/FragranceNotes";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/routing";
import { CONCENTRATION_LABELS } from "@/lib/concentration";
import { pickMessages } from "@/lib/pickMessages";
import { getAllSlugs, getProduct } from "@/lib/products";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(locale, slug);
  if (!product) return {};

  return {
    title: `${product.brand} ${product.name}`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = await getProduct(locale, slug);

  if (!product) {
    notFound();
  }

  // Product: PurchasePanel. Shop: ProductImageCursor's "view" pill, used by
  // ProductCard inside RelatedProducts below.
  const messages = pickMessages(await getMessages(), ["Product", "Shop"] as const);

  const price = Math.min(...product.sizes.map((s) => s.priceEur));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    image: product.image.src,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section className="pt-8 pb-16">
        <Container className="flex flex-col gap-6">
          <ProductBreadcrumbs locale={locale} brand={product.brand} name={product.name} slug={product.slug} />
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery src={product.image.src} alt={product.image.alt} />
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-sans text-sm uppercase tracking-wide text-text-secondary">{product.brand}</p>
                <h1 className="text-display-md font-display text-text">{product.name}</h1>
                <p className="mt-2 font-sans text-sm text-text-secondary">
                  {CONCENTRATION_LABELS[product.concentration]}
                </p>
                <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
                  {product.description}
                </p>
              </div>

              <PurchasePanel sizes={product.sizes} locale={locale} />

              <Rule className="opacity-30" />
              <FragranceNotes notes={product.notes} />
              <Rule className="opacity-30" />
              <ProductAccordion />
            </div>
          </div>
        </Container>
      </Section>

      <RelatedProducts locale={locale} slug={product.slug} />
    </NextIntlClientProvider>
  );
}
