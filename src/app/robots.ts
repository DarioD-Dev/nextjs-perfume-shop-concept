import type { MetadataRoute } from "next";

// Unsolicited pitch demo — blocked from all crawlers until the client
// actually commissions this project. Flip to allow-all only after that.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
