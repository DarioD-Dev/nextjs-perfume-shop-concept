import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // opengraph-image trägt keine Dateiendung in der URL (anders als
  // sitemap.xml oder robots.txt), die Regel "alles mit einem Punkt
  // überspringen" greift dort also nicht. Ohne diese Ausnahme leitet die
  // Middleware /opengraph-image auf /de/opengraph-image um — eine Route, die
  // es nicht gibt —, und Linkvorschauen bekommen statt der Karte einen
  // Umleitungs- beziehungsweise 404-Fehler.
  matcher: ["/((?!api|trpc|_next|_vercel|opengraph-image|.*\..*).*)"],
};
