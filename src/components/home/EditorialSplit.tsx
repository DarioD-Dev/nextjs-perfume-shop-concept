import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function EditorialSplit({
  image,
  alt,
  eyebrow,
  title,
  body,
  reverse = false,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  reverse?: boolean;
}) {
  return (
    <Container>
      <div
        className={cn(
          "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-eyebrow font-sans uppercase tracking-[0.18em] text-text-secondary">{eyebrow}</p>
          <h2 className="text-3xl font-display font-light text-text sm:text-4xl">{title}</h2>
          <p className="font-sans text-base leading-relaxed text-text-secondary">{body}</p>
        </div>
      </div>
    </Container>
  );
}
