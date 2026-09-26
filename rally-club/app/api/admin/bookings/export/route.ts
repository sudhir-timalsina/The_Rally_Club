import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAllBookingsAdmin } from "@/lib/admin-data";
import { formatGBP } from "@/lib/utils";

function csvEscape(value: string | number): string {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data: adminRow } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!adminRow) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await getAllBookingsAdmin();

  const headers = [
    "Booking Reference",
    "Customer Name",
    "Email",
    "Phone",
    "Event",
    "Event Date",
    "Quantity",
    "Amount",
    "Payment Status",
    "Booking Status",
    "Booked At",
  ];

  const rows = bookings.map((b) =>
    [
      b.booking_reference,
      b.full_name,
      b.email,
      b.phone || "",
      b.event_title,
      b.event_date,
      b.attendees,
      formatGBP(b.amount_pence),
      b.payment_status,
      b.status,
      new Date(b.created_at).toISOString(),
    ]
      .map(csvEscape)
      .join(",")
  );

  const csv = [headers.map(csvEscape).join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rally-bookings-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
