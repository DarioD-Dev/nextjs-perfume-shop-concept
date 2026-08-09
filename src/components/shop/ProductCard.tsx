import Image from "next/image";
import type { ResolvedProduct } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";
import { ProductImageCursor } from "./ProductImageCursor";

export function ProductCard({ product, locale }: { product: ResolvedProduct; locale: string }) {
  const price = Math.min(...product.sizes.map((s) => s.priceEur));

  return (
    <Link
      href={{ pathname: "/shop/[slug]", params: { slug: product.slug } }}
      className="group flex flex-col gap-3"
    >
      <ProductImageCursor className="aspect-square overflow-hidden rounded-lg bg-surface-muted">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </ProductImageCursor>
      <div className="flex flex-col gap-1">
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{product.brand}</p>
        <p className="font-display text-lg text-text">{product.name}</p>
        <p className="font-sans text-sm text-text-secondary">{formatPrice(price, locale)}</p>
      </div>
    </Link>
  );
}
