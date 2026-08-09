"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";

export function NewsletterForm() {
  const t = useTranslations("Footer");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Phase 1 demo only — no backend yet, see Bauplan §7 (Datenschicht).
    setStatus("success");
  }

  if (status === "success") {
    return (
      <p role="status" className="font-sans text-sm text-accent-gold">
        {t("newsletterSuccess")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <VisuallyHidden>
        <label htmlFor="newsletter-email">{t("newsletter")}</label>
      </VisuallyHidden>
      <Input
        id="newsletter-email"
        type="email"
        required
        placeholder={t("newsletterPlaceholder")}
        className="max-w-xs rounded-full py-2"
      />
      <Button type="submit" size="sm">
        {t("newsletterSubmit")}
      </Button>
    </form>
  );
}
