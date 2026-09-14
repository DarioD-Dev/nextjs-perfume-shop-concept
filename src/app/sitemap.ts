import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllSlugs } from "@/lib/products";
import { SITE_URL } from "@/lib/siteUrl";

// Ursprung aus einer Quelle, siehe lib/siteUrl.ts.
const BASE_URL = SITE_URL;

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
