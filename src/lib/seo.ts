import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/siteUrl";

/** Die internen Routenschlüssel aus `routing.pathnames` — "/", "/shop", "/shop/[slug]", … */
export type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(href: Href, locale: Locale): string {
  return new URL(getPathname({ href, locale }), SITE_URL).toString();
}

/**
 * Der Markenname. Steht hier und nicht in `messages/`, weil er in beiden
 * Sprachen derselbe ist — ein Eigenname wird nicht übersetzt.
 */
const SITE_NAME = "Maison Aurelle";

// OpenGraph-Sprachcodes sind unterstrichen und regionsbehaftet, die eigenen
// Codes der Seite sind es nicht. Klein genug für eine literale Tabelle — und
// sie bricht den Build, wenn eine Sprache dazukommt, ohne dass jemand
// entschieden hat, worauf sie abgebildet wird.
const OG_LOCALES: Record<Locale, string> = { de: "de_AT", en: "en_GB" };

/**
 * Die Metadaten jeder Seite entstehen hier, statt in jeder Route von Hand.
 *
 * Zwei Gründe. Next führt Metadaten je oberstem Feld zusammen und **ersetzt**
 * `openGraph` dabei ganz, statt es zu mischen — eine Seite, die nur einen
 * Titel setzt, verlöre also Typ, Seitenname und Sprache aus dem Layout. Und:
 * `alternates` wird vererbt. Genau das war hier der Fehler — die Unterseiten
 * setzten nur `title`/`description` und erbten damit das `canonical` des
 * Layouts, das auf die Startseite zeigt. Jede Unterseite und jede der zwölf
 * Produktseiten erklärte sich so zur Kopie der Startseite.
 *
 * `robots` steht bewusst NICHT hier, sondern einmal im Layout: Benutzen
 * Layout und Seite denselben Helfer und beide setzen `robots`, gibt Next zwei
 * Meta-Tags aus. Vom Layout aus gilt der Wert ohnehin für jede Route.
 */
export function buildPageMetadata({
  title,
  description,
  locale,
  href,
}: {
  title: string;
  description: string;
  locale: Locale;
  href: Href;
}): Metadata {
  const url = absoluteUrl(href, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)])),
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: SITE_NAME,
      url,
      locale: OG_LOCALES[locale],
      // Ausdrücklich gesetzt, nicht der automatischen Ergänzung überlassen:
      // Next ergänzt das Bild aus app/opengraph-image.tsx nur, solange keine
      // eigene openGraph-Angabe existiert — und die wird ersetzt statt
      // zusammengeführt. Ohne diese Zeile bliebe die Vorschau bildlos.
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}
