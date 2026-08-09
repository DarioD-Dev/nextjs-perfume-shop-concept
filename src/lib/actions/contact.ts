"use server";

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

// Demo only — validates and reports success, but nothing is actually sent
// yet. This is the backend seam: swap the body once a real mail/CRM
// integration exists, no call site (ContactForm) has to change.
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

  return { status: "success" };
}
