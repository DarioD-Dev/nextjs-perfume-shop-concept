"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";

// Derselbe Aufbau wie NewsletterForm.tsx — reiner Browser-Zustand, kein
// Backend. "Du wirst benachrichtigt" wäre sonst schlicht falsch.
export function NotifyForm() {
  const t = useTranslations("Product");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div role="status">
        <p className="font-sans text-sm text-accent-gold">{t("notifySuccess")}</p>
        <p className="mt-1 font-sans text-xs text-text-secondary">{t("notifyDemoNote")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <VisuallyHidden>
        <label htmlFor="notify-email">{t("notifyLabel")}</label>
      </VisuallyHidden>
      <Input
        id="notify-email"
        type="email"
        required
        placeholder={t("notifyPlaceholder")}
        className="max-w-xs rounded-full py-2"
      />
      <Button type="submit" size="sm">
        {t("notifySubmit")}
      </Button>
    </form>
  );
}
