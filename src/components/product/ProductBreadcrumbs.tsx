import { getTranslations } from "next-intl/server";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function ProductBreadcrumbs({
  locale,
  brand,
  name,
  slug,
}: {
  locale: Locale;
  brand: string;
  name: string;
  slug: string;
}) {
  const tNav = await getTranslations("Nav");

  const items = [
    { label: tNav("home"), url: getPathname({ locale, href: "/" }) },
    { label: tNav("shop"), url: getPathname({ locale, href: "/shop" }) },
    { label: `${brand} ${name}`, url: getPathname({ locale, href: { pathname: "/shop/[slug]", params: { slug } } }) },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="font-sans text-xs uppercase tracking-wide text-text-secondary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition-colors hover:text-accent-gold">
            {tNav("home")}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/shop" className="transition-colors hover:text-accent-gold">
            {tNav("shop")}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="text-text" aria-current="page">
          {brand} {name}
        </li>
      </ol>
    </nav>
  );
}
