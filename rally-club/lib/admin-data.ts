import { createClient } from "@/lib/supabase/server";
import type { RallyEvent, ContactMessage, PartnershipEnquiry, Faq, Review } from "@/types";

export async function getAllEventsAdmin(): Promise<RallyEvent[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });
  if (error) {
    console.error("[admin-data] getAllEventsAdmin failed:", error);
    return [];
  }
  return (data as RallyEvent[]) ?? [];
}

export async function getEventByIdAdmin(id: string): Promise<RallyEvent | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[admin-data] getEventByIdAdmin failed:", error);
    return null;
  }
  return (data as RallyEvent) ?? null;
}

export async function getContactMessagesAdmin(): Promise<ContactMessage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[admin-data] getContactMessagesAdmin failed:", error);
    return [];
  }
  return (data as ContactMessage[]) ?? [];
}

export async function getPartnerEnquiriesAdmin(): Promise<PartnershipEnquiry[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("partnership_enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[admin-data] getPartnerEnquiriesAdmin failed:", error);
    return [];
  }
  return (data as PartnershipEnquiry[]) ?? [];
}

export async function getAllFaqsAdmin(): Promise<Faq[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
  if (error) {
    console.error("[admin-data] getAllFaqsAdmin failed:", error);
    return [];
  }
  return (data as Faq[]) ?? [];
}

export async function getAllReviewsAdmin(): Promise<Review[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[admin-data] getAllReviewsAdmin failed:", error);
    return [];
  }
  return (data as Review[]) ?? [];
}

export async function getEventBookingStats(eventId: string) {
  const supabase = createClient();
  const { data: event } = await supabase
    .from("events")
    .select("capacity, spots_taken")
    .eq("id", eventId)
    .maybeSingle();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("amount_pence, attendees, payment_status, status")
    .eq("event_id", eventId);

  const validBookings = (bookings ?? []).filter(
    (b) => b.status !== "cancelled" && (b.payment_status === "paid" || b.payment_status === "not_required")
  );
  const revenuePence = validBookings.reduce((sum, b) => sum + (b.amount_pence || 0), 0);

  return {
    capacity: event?.capacity ?? null,
    sold: event?.spots_taken ?? 0,
    remaining: event?.capacity != null ? Math.max(event.capacity - (event.spots_taken ?? 0), 0) : null,
    revenuePence,
    bookingsCount: validBookings.length,
  };
}

export type AdminBookingRow = {
  id: string;
  booking_reference: string;
  full_name: string;
  email: string;
  phone: string | null;
  attendees: number;
  amount_pence: number;
  currency: string;
  payment_status: string;
  status: string;
  notes: string | null;
  created_at: string;
  event_id: string;
  event_title: string;
  event_slug: string;
  event_date: string;
};

export async function getAllBookingsAdmin(): Promise<AdminBookingRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, booking_reference, full_name, email, phone, attendees, amount_pence, currency, payment_status, status, notes, created_at, event_id, events(title, slug, event_date)"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin-data] getAllBookingsAdmin failed:", error);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    booking_reference: row.booking_reference,
    full_name: row.full_name,
    email: row.email,
    phone: row.phone,
    attendees: row.attendees,
    amount_pence: row.amount_pence,
    currency: row.currency,
    payment_status: row.payment_status,
    status: row.status,
    notes: row.notes,
    created_at: row.created_at,
    event_id: row.event_id,
    event_title: row.events?.title ?? "Unknown event",
    event_slug: row.events?.slug ?? "",
    event_date: row.events?.event_date ?? "",
  }));
}

export async function getDashboardStats() {
  const supabase = createClient();
  const today = new Date().toISOString().slice(0, 10);

  const [upcoming, bookings, unreadContact, unreadPartners, revenueRows] = await Promise.all([
    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .in("status", ["published", "sold_out"])
      .gte("event_date", today),
    supabase.from("bookings").select("id", { count: "exact", head: true }).neq("status", "cancelled"),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),
    supabase
      .from("partnership_enquiries")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),
    supabase
      .from("bookings")
      .select("amount_pence")
      .in("payment_status", ["paid", "not_required"])
      .neq("status", "cancelled"),
  ]);

  const totalRevenuePence = (revenueRows.data ?? []).reduce((sum, r) => sum + (r.amount_pence || 0), 0);

  return {
    upcomingEvents: upcoming.count ?? 0,
    totalBookings: bookings.count ?? 0,
    newContactMessages: unreadContact.count ?? 0,
    newPartnerEnquiries: unreadPartners.count ?? 0,
    totalRevenuePence,
  };
}
