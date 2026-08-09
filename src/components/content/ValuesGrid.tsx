import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

const ICONS = [ShieldCheck, Sparkles, MessageCircle];

export async function ValuesGrid() {
  const t = await getTranslations("About");
  const values = [
    { title: t("value1Title"), body: t("value1Body") },
    { title: t("value2Title"), body: t("value2Body") },
    { title: t("value3Title"), body: t("value3Body") },
  ];

  return (
    <Container>
      <div className="grid gap-10 sm:grid-cols-3">
        {values.map((value, index) => {
          const Icon = ICONS[index];
          return (
            <div key={value.title} className="flex flex-col items-center gap-3 text-center">
              <Icon className="text-accent-gold" size={28} strokeWidth={1.5} aria-hidden />
              <p className="font-display text-lg text-text">{value.title}</p>
              <p className="font-sans text-sm text-text-secondary">{value.body}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
