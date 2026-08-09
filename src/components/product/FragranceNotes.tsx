import { getTranslations } from "next-intl/server";
import { Rule } from "@/components/ui/Rule";
import { Link } from "@/i18n/navigation";

export async function FragranceNotes({ notes }: { notes: { top: string[]; heart: string[]; base: string[] } }) {
  const t = await getTranslations("Product");
  const tiers = [
    { label: t("topNotes"), values: notes.top },
    { label: t("heartNotes"), values: notes.heart },
    { label: t("baseNotes"), values: notes.base },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-eyebrow font-sans uppercase tracking-[0.18em] text-text-secondary">{t("notes")}</p>
      <div className="flex flex-col gap-4">
        {tiers.map((tier, index) => (
          <div key={tier.label}>
            {index > 0 && <Rule className="mb-4 w-8 opacity-50" />}
            <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{tier.label}</p>
            <p className="font-display text-lg text-text">
              {tier.values.map((value, i) => (
                <span key={value}>
                  {i > 0 && " · "}
                  <Link
                    href={{ pathname: "/shop", query: { note: value } }}
                    className="underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent-gold hover:decoration-accent-gold"
                  >
                    {value}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
