import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const TILES = [
  {
    category: "damen",
    labelKey: "categoryDamen",
    // Reuses the Fleur Nocturne product photo — same file as in products.ts,
    // not a duplicate download.
    image: "/images/products/maison-verrier-fleur-nocturne.jpg",
  },
  {
    category: "herren",
    labelKey: "categoryHerren",
    image: "/images/products/rive-nocturne-bergamote-sauvage.jpg",
  },
  {
    category: "unisex",
    labelKey: "categoryUnisex",
    image: "/images/products/noir-vermeil-ambre-absolu.jpg",
  },
] as const;

export async function CategoryTiles() {
  const t = await getTranslations("Home");

  return (
    <Section tone="muted">
      <Container>
        <div className="grid gap-6 sm:grid-cols-3">
          {TILES.map((tile) => (
            <Link
              key={tile.category}
              href={{ pathname: "/shop", query: { category: tile.category } }}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg"
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-surface-editorial/30 transition-colors group-hover:bg-surface-editorial/40" />
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-xl uppercase tracking-[0.1em] text-text-on-editorial">
                {t(tile.labelKey)}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
