"use server";

import { createClient } from "@/lib/supabase/server";
import { partnershipSchema } from "@/lib/validations";
import { sendNotificationEmail } from "@/lib/email";
import type { ActionResult } from "@/lib/actions/contact";

export async function submitPartnershipEnquiry(formData: FormData): Promise<ActionResult> {
  const raw = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    businessType: formData.get("businessType"),
    collaborationType: formData.get("collaborationType"),
    message: formData.get("message"),
  };

  const parsed = partnershipSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the form and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from("partnership_enquiries").insert({
      name: parsed.data.name,
      company: parsed.data.company,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      business_type: parsed.data.businessType,
      collaboration_type: parsed.data.collaborationType,
      message: parsed.data.message,
    });
    if (error) throw error;

    await sendNotificationEmail({
      type: "partnership",
      subject: `New partnership enquiry from ${parsed.data.company}`,
      data: parsed.data,
    });

    return { ok: true };
  } catch (err) {
    console.error("[submitPartnershipEnquiry] failed:", err);
    return {
      ok: false,
      error:
        "Something went wrong sending your enquiry. Please try again, or email us directly.",
    };
  }
}
