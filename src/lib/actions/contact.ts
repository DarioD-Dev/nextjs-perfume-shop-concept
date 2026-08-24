"use server";

import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

const CONTACT_TO_EMAIL = "dario.dominkovic@hotmail.com";

// Without RESEND_API_KEY (e.g. this demo, not yet a commissioned client site)
// the form still validates properly but only logs instead of sending —
// nothing silently fails, and turning it into a real mail flow is a one-env-
// var change, not a rewrite. See README for setup.
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const result = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!result.success) {
    return { status: "error", fieldErrors: z.flattenError(result.error).fieldErrors };
  }

  const { name, email, message } = result.data;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[contact] RESEND_API_KEY not set — would have sent:\n${name} <${email}>\n${message}`);
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Maison Aurelle <onboarding@resend.dev>",
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Neue Nachricht von ${name}`,
      text: `${message}\n\n—\n${name} <${email}>`,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[contact] Resend send failed:", error);
    return { status: "error" };
  }

  return { status: "success" };
}
