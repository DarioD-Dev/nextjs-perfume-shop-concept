import type { Locale } from "@/i18n/routing";

/** Text that has a value per locale. Mirrors how a headless CMS returns localised fields. */
export type Localized<T = string> = Record<Locale, T>;

export type Season = "spring" | "summer" | "autumn" | "winter";

export interface Product {
  slug: string;
  brand: string;
  name: string;
  concentration: "EdC" | "EdT" | "EdP" | "Parfum" | "Extrait";
  category: "damen" | "herren" | "unisex";
  season: Season[];
  sizes: { ml: number; priceEur: number }[];
  image: { src: string; alt: Localized };
  notes: { top: Localized<string[]>; heart: Localized<string[]>; base: Localized<string[]> };
  tagline: Localized;
  description: Localized;
  releaseYear: number;
}

/** Same shape with the locale already resolved — what components actually receive. */
export type ResolvedProduct = Omit<Product, "image" | "notes" | "tagline" | "description"> & {
  image: { src: string; alt: string };
  notes: { top: string[]; heart: string[]; base: string[] };
  tagline: string;
  description: string;
};
