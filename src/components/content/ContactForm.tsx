"use client";

import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("Contact");
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const successRef = useRef<HTMLDivElement>(null);

  // Bei Erfolg ersetzt die Bestätigung das Formular. role="status" meldet sie,
  // aber der Tastaturfokus stand auf einem Absendeknopf, den es nicht mehr
  // gibt — er fiel auf <body> zurück, und der nächste Tabulator begann wieder
  // ganz oben. Der Fokus auf die Bestätigung hält die Position.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      // Die Bestätigung nennt die Grenze dieser Demo ausdrücklich. Ohne den
      // Hinweis stünde hier eine Zusage, die niemand einlöst: Ohne
      // RESEND_API_KEY protokolliert die Server-Action nur und meldet Erfolg.
      // Wer das Formular testet — und Interessenten tun das — würde auf eine
      // Antwort warten, die nie kommt.
      <div ref={successRef} tabIndex={-1} role="status" className="outline-none">
        <p className="font-sans text-accent-gold">{t("success")}</p>
        <p className="mt-2 font-sans text-sm text-text-secondary">{t("demoNote")}</p>
      </div>
    );
  }

  const nameInvalid = Boolean(state.fieldErrors?.name);
  const emailInvalid = Boolean(state.fieldErrors?.email);
  const messageInvalid = Boolean(state.fieldErrors?.message);
  // Every "error" status today comes from zod, which always sets at least one
  // fieldErrors entry — this only fires for a hypothetical future failure
  // (e.g. a network/server error) that isn't tied to a specific field.
  const hasUnattributedError =
    state.status === "error" && !nameInvalid && !emailInvalid && !messageInvalid;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input
          id="name"
          name="name"
          required
          aria-invalid={nameInvalid}
          aria-describedby={nameInvalid ? "name-error" : undefined}
        />
        {nameInvalid && <FieldError id="name-error">{t("error")}</FieldError>}
      </div>
      <div>
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={emailInvalid}
          aria-describedby={emailInvalid ? "email-error" : undefined}
        />
        {emailInvalid && <FieldError id="email-error">{t("error")}</FieldError>}
      </div>
      <div>
        <Label htmlFor="message">{t("messageLabel")}</Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          aria-invalid={messageInvalid}
          aria-describedby={messageInvalid ? "message-error" : undefined}
        />
        {messageInvalid && <FieldError id="message-error">{t("error")}</FieldError>}
      </div>
      {hasUnattributedError && <FieldError>{t("error")}</FieldError>}
      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
