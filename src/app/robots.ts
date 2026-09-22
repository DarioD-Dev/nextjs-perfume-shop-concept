import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

// Unsolicited pitch demo — blocked from all crawlers until the client
// actually commissions this project. Flip to allow-all only after that.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    // Steht bewusst trotz `disallow`: Die Zeile ist die Fundstelle für den
    // Tag, an dem daraus eine beauftragte Seite wird — und sie hält das
    // Muster der vier Geschwisterprojekte, wo sie überall steht.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
