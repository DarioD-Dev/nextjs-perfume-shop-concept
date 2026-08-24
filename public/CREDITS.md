# Bild-Credits

Alle Fotos sind unter der [Unsplash-Lizenz](https://unsplash.com/license) lizenziert (kostenlose kommerzielle Nutzung, keine Zuschreibung erforderlich) und liegen lokal unter `public/images/`. Zuschreibung hier trotzdem aus Fairness gegenüber den Fotograf:innen:

| Datei | Foto-ID | Fotograf:in |
|---|---|---|
| products/maison-verrier-oud-imperial.jpg | photo-1594125311687-3b1b3eafa9f4 | Fulvio Ciccolo |
| products/maison-verrier-fleur-nocturne.jpg | photo-1608721279136-cd41b752fa41 | JC Media |
| products/atelier-solane-ambre-dore.jpg | photo-1638295916768-459f6cf440bc | Akhilesh Sharma |
| products/atelier-solane-neroli-sauvage.jpg | photo-1705899853374-d91c048b81d2 | Content Pixie |
| products/casa-brunelli-cuir-vetiver.jpg | photo-1705899844877-81bb0a0665c1 | Content Pixie |
| products/casa-brunelli-rosa-selvaggia.jpg | photo-1458538977777-0549b2370168 | Jessica Weiller |
| products/noir-vermeil-ambre-absolu.jpg | photo-1733660227163-01bc46e0d7d7 | Simply Mersah |
| products/noir-vermeil-nuit-blanche.jpg | photo-1553699357-fdefb876c402 | Mpho Mojapelo |
| products/rive-nocturne-bergamote-sauvage.jpg | photo-1598634222670-87c5f558119c | Joppe Spaa |
| products/rive-nocturne-iris-nocturne.jpg | photo-1597317628840-d3472f7aa7fc | Agenlaku Indonesia |
| products/ombre-cuir-santal-fume.jpg | photo-1720423514789-15a33e59fc81 | Unsplash |
| products/ombre-cuir-musc-blanc.jpg | photo-1720423738890-37689a6f6b95 | Unsplash |
| products/lumiere-sauvage-jasmin-dore.jpg | photo-1647507653704-bde7f2d6dbf0 | Unsplash |
| products/lumiere-sauvage-vetiver-imperial.jpg | photo-1571206508927-2ef3026ada5d | Unsplash |
| editorial/hero.jpg | photo-1627933234009-0f5ce6eb4e3a | Unsplash |
| editorial/split-1.jpg | photo-1543422655-ac1c6ca993ed | Unsplash |
| editorial/split-2.jpg | photo-1676951334972-2e65e67f4cbe | Unsplash |
| editorial/about.jpg | photo-1541108564883-bec8126021f5 | Unsplash |

`categoryDamen`/`categoryHerren`/`categoryUnisex` in `CategoryTiles.tsx` reuse three of the product photos above rather than separate files.

**22.08.2026 — von Live-Hotlinking auf lokal gehostet umgestellt:** wie beim Salon-Kupferglanz-Projekt kam es unter echter Last zu 500/504-Fehlern, wenn der Next.js-Image-Optimizer die Fotos bei einem Cache-Miss serverseitig von Unsplash nachladen musste. Einmalig heruntergeladen (1600px, jpg), `remotePatterns` aus `next.config.ts` entfernt. Vier zuvor gar nicht in dieser Liste geführte Bilder (Hero, beide Editorial-Splits, About) sind jetzt mit erfasst.

Alle Produkt-, Marken- und Beschreibungstexte sind **frei erfunden** (kein Bezug zu echten Parfummarken).
