import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { partnershipSchema } from "@/lib/validations";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = partnershipSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid submission", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/partners] failed:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
