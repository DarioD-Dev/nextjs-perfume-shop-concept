import { getTranslations } from "next-intl/server";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

const QUESTION_NUMBERS = [1, 2, 3, 4, 5] as const;

export async function FaqSection() {
  const t = await getTranslations("Faq");

  return (
    <Container className="mx-auto max-w-2xl">
      <div>
        {QUESTION_NUMBERS.map((n) => (
          <Accordion key={n} title={t(`q${n}`)}>
            {t.rich(`a${n}`, {
              // Only a2 currently uses <link>...</link>; t.rich() renders
              // everything else as plain text if no tag is present, so
              // this is safe to apply to every answer uniformly.
              link: (chunks) => (
                <Link href="/contact" className="underline underline-offset-2 hover:text-accent-gold">
                  {chunks}
                </Link>
              ),
            })}
          </Accordion>
        ))}
      </div>
    </Container>
  );
}
