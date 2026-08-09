import { getTranslations } from "next-intl/server";
import { Rule } from "@/components/ui/Rule";
import { CONTACT_ADDRESS } from "./ContactMap";

export async function ContactDetails() {
  const t = await getTranslations("Contact");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{t("addressLabel")}</p>
        <p className="font-display text-lg text-text">Dario Dominkovic</p>
        <p className="font-sans text-text-secondary">{CONTACT_ADDRESS}</p>
      </div>
      <Rule className="w-12 opacity-50" />
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{t("emailLabel")}</p>
        <a
          href="mailto:dario.dominkovic@hotmail.com"
          className="font-sans text-text-secondary transition-colors hover:text-accent-gold"
        >
          dario.dominkovic@hotmail.com
        </a>
      </div>
    </div>
  );
}
