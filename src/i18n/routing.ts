import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en", "hr"],
  defaultLocale: "de",
  localePrefix: "always",
  // Jede Sprache MUSS in jeder Zeile stehen. next-intl typisiert die Tabelle
  // als Partial — eine fehlende Sprache ist kein Compilerfehler, sondern
  // fällt still auf den Routenschlüssel zurück (`/hr/shop` statt
  // `/hr/kolekcija`). Das ist die eine Stelle im Projekt, an der `tsc` nicht
  // die Aufgabenliste ist.
  pathnames: {
    "/": "/",
    "/shop": { de: "/kollektion", en: "/shop", hr: "/kolekcija" },
    "/shop/[slug]": { de: "/kollektion/[slug]", en: "/shop/[slug]", hr: "/kolekcija/[slug]" },
    "/about": { de: "/ueber-uns", en: "/about", hr: "/o-nama" },
    // Im Kroatischen dieselben Wörter wie im Deutschen bzw. Englischen — die
    // Einträge stehen trotzdem ausdrücklich da, damit sie nicht wie ein
    // Versehen aussehen.
    "/contact": { de: "/kontakt", en: "/contact", hr: "/kontakt" },
    "/faq": { de: "/faq", en: "/faq", hr: "/faq" },
  },
});

export type Locale = (typeof routing.locales)[number];
