import Image from "next/image";

// Single image per product for now (see Bauplan §7 data model) — ready to
// grow into a real thumbnail gallery once products have multiple photos.
export function ProductGallery({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative aspect-[9/8] overflow-hidden rounded-lg bg-surface-muted">
            <Image src={src} alt={alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
    );
}
