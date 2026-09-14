import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Maison Aurelle — Parfums d'Exception, Wien";

// Statische, sprachneutrale Karte (Linkvorschauen verhandeln praktisch nie
// die Sprache) aus derselben Palette wie die Seite. Kein eigenes
// "Social-Card"-Design, das man von Hand nachziehen müsste.
//
// Vorher hatte dieses Projekt überhaupt keine OpenGraph-Angaben — wer den
// Link verschickte, bekam eine leere Vorschau. Das ist bei einer Arbeitsprobe
// der erste Eindruck.
//
// Auf Modulebene gelesen, nicht pro Anfrage: Die Datei hängt von keinem
// Anfragewert ab.
const serif = await readFile(join(process.cwd(), "assets/CormorantGaramond-SemiBold.woff"));

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "90px",
        background: "#f3e8d9",
        color: "#1d1716",
        fontFamily: "Cormorant Garamond",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 30,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: "#a55233",
        }}
      >
        Maison Aurelle
      </div>
      <div style={{ display: "flex", marginTop: 40, fontSize: 86, lineHeight: 1.1, maxWidth: 900 }}>
        Der Duft, der bleibt.
      </div>
      <div style={{ display: "flex", marginTop: 34, fontSize: 30, color: "#6b5248" }}>
        Parfums d&apos;Exception — seit 1998 in Wien
      </div>
    </div>,
    { ...size, fonts: [{ name: "Cormorant Garamond", data: serif, style: "normal", weight: 600 }] },
  );
}
