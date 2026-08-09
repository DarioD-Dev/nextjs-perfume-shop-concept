import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <Section tone="muted" className="py-12">
            <Container className="flex flex-col items-center gap-2 text-center">
                <Heading level={1} variant="section">
                    {title}
                </Heading>
                {subtitle && <p className="max-w-xl font-sans text-text-secondary">{subtitle}</p>}
            </Container>
        </Section>
    );
}
