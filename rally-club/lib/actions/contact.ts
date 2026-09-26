"use server";

import { createClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validations";
import { sendNotificationEmail } from "@/lib/email";

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the form and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject || null,
      message: parsed.data.message,
    });
    if (error) throw error;

    await sendNotificationEmail({
      type: "contact",
      subject: `New enquiry from ${parsed.data.name}`,
      data: parsed.data,
    });

    return { ok: true };
  } catch (err) {
    console.error("[submitContactForm] failed:", err);
    return {
      ok: false,
      error:
        "Something went wrong sending your message. Please try again, or email us directly.",
    };
  }
}
