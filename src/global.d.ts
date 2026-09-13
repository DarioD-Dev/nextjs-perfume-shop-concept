import type messages from "../messages/de.json";
import type { routing } from "@/i18n/routing";

// Macht next-intl die eigenen Sprachen und die Nachrichtenstruktur bekannt:
// `useLocale()`/`getLocale()` liefern danach die Union statt eines nackten
// `string`, und jeder Übersetzungsschlüssel wird beim Kompilieren gegen die
// deutsche Nachrichtendatei geprüft.
//
// Vorher fiel ein vertippter oder umbenannter Schlüssel erst zur Laufzeit auf
// — als MISSING_MESSAGE im Browser desjenigen, der zufällig diese Seite
// aufruft. Genau diese Fehlerklasse lässt ein i18n-Umbau sonst durchrutschen,
// weil der Build weiterhin grün ist.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
