"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
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

  if (state.status === "success") {
    return (
      <p role="status" className="font-sans text-accent-gold">
        {t("success")}
      </p>
    );
  }

  const nameInvalid = Boolean(state.fieldErrors?.name);
  const emailInvalid = Boolean(state.fieldErrors?.email);
  const messageInvalid = Boolean(state.fieldErrors?.message);
  // Every "error" status today comes from zod, which always sets at least one
  // fieldErrors entry — this only fires for a hypothetical future failure
  // (e.g. a network/server error) that isn't tied to a specific field.
  const hasUnattributedError = state.status === "error" && !nameInvalid && !emailInvalid && !messageInvalid;

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
