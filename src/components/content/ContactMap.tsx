"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export const CONTACT_ADDRESS = "Wien, Österreich";

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`;

// Click-to-load facade, not an immediate iframe: a Google Maps embed pulls in
// a large third-party bundle and transfers data to Google on first paint —
// nothing loads until the visitor asks for it. Matches the same pattern
// already used on the salon-kupferglanz sibling project.
export function ContactMap() {
  const t = useTranslations("Contact");
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="h-80 w-full overflow-hidden rounded-lg border border-border-subtle sm:h-96">
      {loaded ? (
        <iframe
          title={t("mapTitle")}
          src={MAPS_EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface-editorial/40 p-8 text-center">
          <MapPin className="text-accent-gold" size={28} strokeWidth={1.5} aria-hidden />
          <p className="max-w-xs font-sans text-sm text-text-secondary">{t("mapNotice")}</p>
          <Button type="button" variant="secondary" onClick={() => setLoaded(true)}>
            {t("mapLoad")}
          </Button>
        </div>
      )}
    </div>
  );
}
