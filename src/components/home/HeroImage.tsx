import Image from "next/image";

// Can't isolate just the bottle inside a flat photo (no separate layer/3D
// asset) — this animates the whole image settling into place on load
// instead: slightly rotated, zoomed in and invisible, then eases into its
// final resting state. Reads as a "drops/settles in" moment.
//
// Als reine CSS-Animation (`hero-settle` in globals.css), nicht mehr über
// React-State. Vorher war der erste Render `opacity-0` und ein Mount-Effekt
// schaltete auf sichtbar — ohne JavaScript blieb das Bild für immer
// unsichtbar. Eine CSS-Animation startet beim Rendern von selbst und braucht
// dafür gar kein JavaScript.
//
// Nebeneffekt, der die Änderung zusätzlich rechtfertigt: Damit fällt das
// "use client" weg. Die Komponente ist jetzt eine Server-Komponente und
// schickt keinen Code mehr in den Browser.
export function HeroImage({ src }: { src: string }) {
  return (
    <Image src={src} alt="" fill priority sizes="100vw" className="hero-settle object-cover" />
  );
}
