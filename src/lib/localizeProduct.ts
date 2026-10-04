import type { Locale } from "@/i18n/routing";
import type { Product, ResolvedProduct } from "@/data/types";

/**
 * Löst die lokalisierten Felder eines Produkts auf. Eigene Datei statt in
 * `lib/products.ts`, weil diese Datei `server-only` ist: Der Duft-Finder
 * läuft als Client-Komponente (Fragen beantworten ohne Seitenwechsel) und
 * braucht genau diese eine Funktion, um den gefundenen Treffer anzuzeigen.
 */
export function resolveProduct(product: Product, locale: Locale): ResolvedProduct {
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
