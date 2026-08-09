import { getTranslations } from "next-intl/server";
import { Accordion } from "@/components/ui/Accordion";

export async function ProductAccordion() {
  const t = await getTranslations("Product");

  return (
    <div>
      <Accordion title={t("detailsTitle")} className="py-3">
        {t("detailsBody")}
      </Accordion>
      <Accordion title={t("shippingTitle")} className="py-3">
        {t("shippingBody")}
      </Accordion>
      <Accordion title={t("returnsTitle")} className="py-3">
        {t("returnsBody")}
      </Accordion>
    </div>
  );
}
