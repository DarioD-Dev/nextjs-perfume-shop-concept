import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllSlugs } from "@/lib/products";

// Placeholder — update once deployed (Task 15). Harmless while robots.ts
// disallows everything, but should be correct before the pitch-phase
// noindex is ever lifted.
const BASE_URL = "https://maison-de-parfum-demo.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const staticPathnames = ["/", "/shop", "/about", "/contact", "/faq"] as const;

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const pathname of staticPathnames) {
      entries.push({ url: `${BASE_URL}${getPathname({ locale, href: pathname })}` });
    }
    for (const slug of slugs) {
      entries.push({
        url: `${BASE_URL}${getPathname({ locale, href: { pathname: "/shop/[slug]", params: { slug } } })}`,
      });
    }
  }

  return entries;
}
