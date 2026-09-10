import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllSlugs } from "@/lib/products";

// The live deployment, named after this repository rather than after the
// fictional shop — these are concept demos, and a made-up business name in
// the URL reads like a real client site. This was a placeholder pointing at
// a domain that never existed, so every entry in the published sitemap was
// a dead link.
const BASE_URL = "https://nextjs-perfume-shop-concept.vercel.app";

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
