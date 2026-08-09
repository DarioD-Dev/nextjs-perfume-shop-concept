import { getTranslations } from "next-intl/server";

export const CONTACT_ADDRESS = "Wien, Österreich";

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`;

// Full-width, wide aspect ratio — deliberately its own section rather than
// squeezed into the narrow ContactDetails column, where a map competed
// awkwardly with three stacked text blocks (Dario's placement feedback).
export async function ContactMap() {
  const t = await getTranslations("Contact");

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle">
      <iframe
        title={t("mapTitle")}
        src={MAPS_EMBED_SRC}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full sm:h-96"
      />
    </div>
  );
}
