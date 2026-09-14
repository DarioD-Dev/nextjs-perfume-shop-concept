import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Providers } from "@/components/layout/Providers";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pickMessages } from "@/lib/pickMessages";
import { SITE_URL } from "@/lib/siteUrl";
import { sansUi, serif } from "@/styles/fonts";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    // metadataBase fehlte: Ohne ihn bleiben alternates und das automatisch
    // erzeugte og:image relative Pfade. Linkvorschauen brauchen absolute URLs
    // — die Vorschau blieb dadurch auch dann leer, wenn ein Bild existierte.
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s — ${t("title")}` },
    description: t("description"),
    alternates: {
      canonical: getPathname({ locale, href: "/" }),
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, getPathname({ locale: l, href: "/" })]),
      ),
    },
    // OpenGraph fehlte hier vollständig. Das Bild liefert
    // src/app/opengraph-image.tsx und wird von Next automatisch ergänzt.
    openGraph: {
      type: "website",
      siteName: t("title"),
      title: t("title"),
      description: t("description"),
      locale: locale === "de" ? "de_AT" : "en_GB",
      url: getPathname({ locale, href: "/" }),
      // Ausdrücklich gesetzt, nicht der automatischen Ergänzung überlassen:
      // Next ergänzt das Bild aus app/opengraph-image.tsx nur, solange keine
      // eigene openGraph-Angabe existiert — openGraph wird ganz ersetzt statt
      // zusammengeführt.
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
    // Unsolicited pitch demo — kept out of search results until the client
    // actually commissions this. See Bauplan §9 and Footer's disclaimer line.
    robots: { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  // assertLocale ersetzt die frühere hasLocale/notFound-Kaskade: dieselbe
  // Prüfung, aber an genau einer Stelle für alle Routen.
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  // Header (Logo/Nav/MobileNav/LocaleSwitcher/ThemeToggle) and Footer render
  // on every page from this layout, outside of {children} — Header/Nav are
  // the only namespaces their *client* components need. Everything else is
  // picked per-page (see e.g. shop/page.tsx) so each page's RSC payload only
  // carries the translations its own client components actually use.
  const messages = pickMessages(await getMessages(), ["Header", "Nav"]);
  const t = await getTranslations({ locale, namespace: "Header" });

  return (
    // overflow-x-hidden on <html> itself, not just <body>: a safety net
    // against transformed elements bleeding past the viewport horizontally —
    // e.g. Reveal's hidden state uses translate-x, which (unlike a layout
    // offset) still expands the document's scrollable width unless something
    // clips it. overflow-x set only on <body> does NOT reliably propagate to
    // document.documentElement (verified: scrollWidth stayed inflated) —
    // has to be on <html> to actually constrain it.
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${serif.variable} ${sansUi.variable} overflow-x-hidden`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {/* Skip-Link (WCAG 2.4.1, Level A). Ohne ihn musste sich eine
                Tastaturnutzerin auf JEDER Seite durch sieben Stationen des
                Kopfbereichs arbeiten — Logo, vier Navigationspunkte,
                Sprach- und Themenumschalter —, bevor sie den Inhalt
                erreichte. Restaurant, Friseur und Portfolio hatten das
                längst; dieses Projekt war das letzte ohne.

                Serverseitig gerendert: Der Text kommt über getTranslations
                statt über den Client-Provider, kostet also kein zusätzliches
                JavaScript. Unsichtbar bis zum Fokus. */}
            <a
              href="#inhalt"
              className="sr-only rounded-full bg-accent-copper px-5 py-2.5 font-sans text-sm font-medium text-text-on-editorial focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
            >
              {t("skipToContent")}
            </a>
            <Header />
            <main id="inhalt" className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
