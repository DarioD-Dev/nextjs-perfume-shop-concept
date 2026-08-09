import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/shop": { de: "/kollektion", en: "/shop" },
    "/shop/[slug]": { de: "/kollektion/[slug]", en: "/shop/[slug]" },
    "/about": { de: "/ueber-uns", en: "/about" },
    "/contact": { de: "/kontakt", en: "/contact" },
    "/faq": { de: "/faq", en: "/faq" },
  },
});

export type Locale = (typeof routing.locales)[number];
