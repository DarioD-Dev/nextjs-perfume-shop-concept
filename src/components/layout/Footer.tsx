import { CreditCard, Landmark, Wallet } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Logo } from "./Logo";

// No nav links here anymore — they duplicated the header nav one scroll
// away, and once the logo grew more prominent in the header the repeated
// full wordmark+links combo in the footer read as redundant rather than
// reassuring. Just a compact brand mark for closure, then legal/copyright.
export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-surface-editorial text-text-on-editorial">
      <Container className="flex flex-col gap-6 py-12">
        <Logo size="compact" className="text-text-on-editorial" />
        <Rule className="opacity-30" />
        {/* Generic icons + plain text, not real brand logos (Visa/Mastercard/
            PayPal marks) — avoids trademark use while still signaling "this
            is what checkout would accept" for the demo. Same three methods
            already named in the FAQ's payment answer, kept consistent. */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-xs text-text-on-editorial/70">
          <span className="flex items-center gap-1.5">
            <CreditCard size={16} strokeWidth={1.5} aria-hidden />
            {t("paymentCreditCard")}
          </span>
          <span className="flex items-center gap-1.5">
            <Wallet size={16} strokeWidth={1.5} aria-hidden />
            PayPal
          </span>
          <span className="flex items-center gap-1.5">
            <Landmark size={16} strokeWidth={1.5} aria-hidden />
            {t("paymentBankTransfer")}
          </span>
        </div>
        <div className="flex flex-col gap-2 font-sans text-xs text-text-on-editorial/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <p>© {new Date().getFullYear()} Maison Aurelle</p>
            <span aria-hidden>·</span>
            <a href="mailto:dario.dominkovic@hotmail.com" className="transition-colors hover:text-text-on-editorial">
              {t("credit")}
            </a>
          </div>
          <p className="sm:text-right">{t("disclaimer")}</p>
        </div>
      </Container>
    </footer>
  );
}
