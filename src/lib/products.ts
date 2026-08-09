import "server-only";
import { products } from "@/data/products";
import type { Product, ResolvedProduct, Season } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { CONCENTRATION_ORDER } from "@/lib/concentration";

function resolve(product: Product, locale: Locale): ResolvedProduct {
  return {
    ...product,
    image: { src: product.image.src, alt: product.image.alt[locale] },
    notes: {
      top: product.notes.top[locale],
      heart: product.notes.heart[locale],
      base: product.notes.base[locale],
    },
    tagline: product.tagline[locale],
    description: product.description[locale],
  };
}

function minPrice(product: Product): number {
  return Math.min(...product.sizes.map((s) => s.priceEur));
}

export type ProductFilters = {
  brand?: string;
  category?: string;
  season?: Season;
  note?: string;
  concentration?: Product["concentration"];
  search?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: "price-asc" | "price-desc" | "newest";
};

function productNotes(product: Product, locale: Locale): string[] {
  return [...product.notes.top[locale], ...product.notes.heart[locale], ...product.notes.base[locale]];
}

function applyFilters(list: Product[], locale: Locale, filters?: ProductFilters): Product[] {
  let result = list;

  if (filters?.brand) {
    result = result.filter((p) => p.brand === filters.brand);
  }
  if (filters?.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters?.season) {
    result = result.filter((p) => p.season.includes(filters.season as Season));
  }
  if (filters?.note) {
    result = result.filter((p) => productNotes(p, locale).includes(filters.note as string));
  }
  if (filters?.concentration) {
    result = result.filter((p) => p.concentration === filters.concentration);
  }
  if (filters?.search) {
    const query = filters.search.trim().toLowerCase();
    if (query) {
      result = result.filter((p) => {
        const haystack = [p.name, p.brand, ...productNotes(p, locale)].join(" ").toLowerCase();
        return haystack.includes(query);
      });
    }
  }
  if (filters?.priceMin !== undefined) {
    result = result.filter((p) => minPrice(p) >= filters.priceMin!);
  }
  if (filters?.priceMax !== undefined) {
    result = result.filter((p) => minPrice(p) <= filters.priceMax!);
  }

  if (filters?.sort === "price-asc") {
    result = [...result].sort((a, b) => minPrice(a) - minPrice(b));
  } else if (filters?.sort === "price-desc") {
    result = [...result].sort((a, b) => minPrice(b) - minPrice(a));
  } else if (filters?.sort === "newest") {
    result = [...result].sort((a, b) => b.releaseYear - a.releaseYear);
  }

  return result;
}

// These read a local array today, but stay `async` deliberately: when a real
// API/CMS replaces the dummy catalogue, only the body of each function
// changes — no page, component, or call site has to move. See Bauplan §7.

export async function getProducts(locale: Locale, filters?: ProductFilters): Promise<ResolvedProduct[]> {
  return applyFilters(products, locale, filters).map((p) => resolve(p, locale));
}

export async function getProduct(locale: Locale, slug: string): Promise<ResolvedProduct | null> {
  const product = products.find((p) => p.slug === slug);
  return product ? resolve(product, locale) : null;
}

export async function getRelatedProducts(locale: Locale, slug: string, limit = 4): Promise<ResolvedProduct[]> {
  const current = products.find((p) => p.slug === slug);
  if (!current) return [];

  const sameBrand = products.filter((p) => p.slug !== slug && p.brand === current.brand);
  const sameCategory = products.filter(
    (p) => p.slug !== slug && p.category === current.category && !sameBrand.includes(p),
  );

  return [...sameBrand, ...sameCategory].slice(0, limit).map((p) => resolve(p, locale));
}

export async function getAllSlugs(): Promise<string[]> {
  return products.map((p) => p.slug);
}

export async function getBrands(): Promise<string[]> {
  return Array.from(new Set(products.map((p) => p.brand))).sort();
}

export async function getConcentrations(): Promise<Product["concentration"][]> {
  const present = new Set(products.map((p) => p.concentration));
  return CONCENTRATION_ORDER.filter((c) => present.has(c));
}

export async function getAllNotes(locale: Locale): Promise<string[]> {
  const notes = products.flatMap((p) => productNotes(p, locale));
  return Array.from(new Set(notes)).sort((a, b) => a.localeCompare(b, locale));
}

export async function getPriceRange(): Promise<{ min: number; max: number }> {
  const prices = products.map(minPrice);
  return { min: Math.floor(Math.min(...prices) / 10) * 10, max: Math.ceil(Math.max(...prices) / 10) * 10 };
}
