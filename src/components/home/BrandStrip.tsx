import { Link } from "@/i18n/navigation";
import { getBrands } from "@/lib/products";

// Infinite marquee: the brand list is rendered twice back to back and the
// track scrolls exactly -50% (one copy's width), so the loop reset is
// invisible. Pure CSS (group-hover pauses it), no client JS. The second
// copy is aria-hidden/untabbable — it's a decorative loop artifact, not
// content a screen reader or keyboard user should hit twice.
//
// Two nested named groups: group/marquee (the whole track, pauses the
// scroll on hover) and group/brand (each link, fills the same underline
// bar used by the header nav — same interaction language site-wide).
export async function BrandStrip() {
  const brands = await getBrands();

  return (
    <div className="group/marquee overflow-hidden border-y border-border-subtle bg-surface-muted py-6">
      <div
        className={
          "flex w-max animate-[marquee-scroll_32s_linear_infinite] items-center divide-x divide-border-strong " +
          "group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto"
        }
      >
        {brands.map((brand) => (
          <BrandLink key={brand} brand={brand} />
        ))}
        {brands.map((brand) => (
          <BrandLink key={`${brand}-loop`} brand={brand} decorative />
        ))}
      </div>
    </div>
  );
}

function BrandLink({ brand, decorative = false }: { brand: string; decorative?: boolean }) {
  return (
    <span className="px-8">
      <Link
        href={{ pathname: "/shop", query: { brand } }}
        aria-hidden={decorative || undefined}
        tabIndex={decorative ? -1 : undefined}
        className="group/brand relative inline-block whitespace-nowrap py-1 font-display text-lg uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-accent-gold"
      >
        {brand}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent-gold transition-transform duration-300 ease-out group-hover/brand:scale-x-100"
        />
      </Link>
    </span>
  );
}
