import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Providers } from "@/components/layout/Providers";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pickMessages } from "@/lib/pickMessages";
import { sansUi, serif } from "@/styles/fonts";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: { default: t("title"), template: `%s — ${t("title")}` },
    description: t("description"),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, getPathname({ locale: l, href: "/" })]),
      ),
    },
    // Unsolicited pitch demo — kept out of search results until the client
    // actually commissions this. See Bauplan §9 and Footer's disclaimer line.
    robots: { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  // Header (Logo/Nav/MobileNav/LocaleSwitcher/ThemeToggle) and Footer render
  // on every page from this layout, outside of {children} — Header/Nav are
  // the only namespaces their *client* components need. Everything else is
  // picked per-page (see e.g. shop/page.tsx) so each page's RSC payload only
  // carries the translations its own client components actually use.
  const messages = pickMessages(await getMessages(), ["Header", "Nav"]);

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
            <Header />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
