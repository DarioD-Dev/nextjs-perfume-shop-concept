import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "./routing";

/**
 * Verengt den `[locale]`-Routenparameter auf eine Sprache, die es hier
 * tatsächlich gibt.
 *
 * Next erzeugt den Parameter als `string` — siehe die generierten Helfer
 * `PageProps`/`LayoutProps`. Vorher stand in jeder Route von Hand
 * `params: Promise<{ locale: Locale }>`, also eine **Behauptung**: Der Typ
 * sagte „das ist eine bekannte Sprache", geprüft hat das niemand. Bei einem
 * unbekannten Segment wäre der Wert trotzdem durchgelaufen und hätte erst
 * tiefer im Aufrufbaum Schaden angerichtet, dort aber ohne erkennbaren
 * Zusammenhang.
 *
 * Der ehrliche Weg zur Union ist eine Prüfung, keine Deklaration. In der
 * Praxis lässt die Middleware ohnehin nichts Unbekanntes durch — das hier
 * ist eine Absicherung, kein eigener Codepfad mit Konzept dahinter.
 *
 * Bewusst nicht in `routing.ts`: Dieses Modul importiert die Middleware, und
 * die hat mit `next/navigation` nichts zu tun.
 */
export function assertLocale(value: string): Locale {
  if (!hasLocale(routing.locales, value)) notFound();
  return value;
}
