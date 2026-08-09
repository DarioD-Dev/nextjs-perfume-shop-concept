import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const TILES = [
  {
    category: "damen",
    labelKey: "categoryDamen",
    image: "https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=800&q=80&auto=format&fit=crop",
  },
  {
    category: "herren",
    labelKey: "categoryHerren",
    image: "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=800&q=80&auto=format&fit=crop",
  },
  {
    category: "unisex",
    labelKey: "categoryUnisex",
    image: "https://images.unsplash.com/photo-1733660227163-01bc46e0d7d7?w=800&q=80&auto=format&fit=crop",
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
