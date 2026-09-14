import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // src/app/opengraph-image.tsx liest die Schriftdatei über
  // readFile(join(process.cwd(), "assets/...")). Der Pfad entsteht zur
  // Laufzeit, die Dateiverfolgung des Builds erkennt ihn nicht zuverlässig
  // und packt assets/ dann nicht ins Serverless-Bündel.
  //
  // Der Fehler wäre lokal unsichtbar — beim next start stimmt das
  // Projektverzeichnis ohnehin — und erst in der Produktion aufgefallen,
  // wenn jemand den Link teilt.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/**/*.woff"],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
