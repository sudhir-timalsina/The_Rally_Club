"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const eventFormSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  excerpt: z.string().trim().optional(),
  category: z.enum(["padel", "pilates", "running", "social", "wellness", "fitness", "special"]),
  locationName: z.string().trim().min(2, "Venue name must be at least 2 characters"),
  locationArea: z.string().trim().min(2, "Area must be at least 2 characters"),
  address: z.string().trim().optional(),
  eventDate: z.string().min(1, "Please pick a date"),
  startTime: z.string().min(1, "Please pick a start time"),
  endTime: z.string().optional(),
  pricePence: z.coerce.number().int().min(0, "Price can't be negative"),
  capacity: z.string().optional(),
  imageUrl: z.string().trim().optional(),
  hostName: z.string().trim().optional(),
  hostBio: z.string().trim().optional(),
  bookingOpen: z.coerce.boolean().optional(),
  status: z.enum(["draft", "published", "sold_out", "cancelled", "completed"]),
  isFeatured: z.coerce.boolean().optional(),
});

const FIELD_LABELS: Record<string, string> = {
  title: "Title",
  description: "Description",
  category: "Category",
  locationName: "Venue name",
  locationArea: "Area",
  eventDate: "Date",
  startTime: "Start time",
  pricePence: "Price",
  status: "Status",
};

function firstErrorMessage(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Please check the form and try again.";
  const field = String(issue.path[0] ?? "");
  const label = FIELD_LABELS[field];
  // If the message is still Zod's generic default (no custom message was
  // set on that field), prefix it with the field name so it's actually
  // actionable instead of a bare "String must contain at least..." with no
  // indication of which box on the form it's talking about.
  const isGeneric = /^(String|Number|Required|Invalid)/.test(issue.message);
  return label && isGeneric ? `${label}: ${issue.message}` : issue.message;
}

export type EventActionResult = { ok: true; slug: string } | { ok: false; error: string };

export async function createEvent(formData: FormData): Promise<EventActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = eventFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: firstErrorMessage(parsed.error) };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const slug = `${slugify(parsed.data.title)}-${Math.random().toString(36).slice(2, 6)}`;

  const { error } = await supabase.from("events").insert({
    slug,
    title: parsed.data.title,
    description: parsed.data.description,
    excerpt: parsed.data.excerpt || null,
    category: parsed.data.category,
    location_name: parsed.data.locationName,
    location_area: parsed.data.locationArea,
    address: parsed.data.address || null,
    event_date: parsed.data.eventDate,
    start_time: parsed.data.startTime,
    end_time: parsed.data.endTime || null,
    price_pence: parsed.data.pricePence,
    capacity: parsed.data.capacity ? parseInt(parsed.data.capacity, 10) : null,
    image_url: parsed.data.imageUrl || null,
    host_name: parsed.data.hostName || null,
    host_bio: parsed.data.hostBio || null,
    booking_open: parsed.data.bookingOpen ?? true,
    status: parsed.data.status,
    is_featured: parsed.data.isFeatured ?? false,
    created_by: user?.id,
  });

  if (error) {
    console.error("[createEvent] failed:", error);
    return { ok: false, error: "Could not create event. Please try again." };
  }

  revalidatePath("/admin/dashboard/events");
  revalidatePath("/events");
  return { ok: true, slug };
}

export async function updateEvent(id: string, formData: FormData): Promise<EventActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = eventFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: firstErrorMessage(parsed.error) };
  }

  const supabase = createClient();
  const { data: existing } = await supabase.from("events").select("slug").eq("id", id).maybeSingle();

  const { error } = await supabase
    .from("events")
    .update({
      title: parsed.data.title,
      description: parsed.data.description,
      excerpt: parsed.data.excerpt || null,
      category: parsed.data.category,
      location_name: parsed.data.locationName,
      location_area: parsed.data.locationArea,
      address: parsed.data.address || null,
      event_date: parsed.data.eventDate,
      start_time: parsed.data.startTime,
      end_time: parsed.data.endTime || null,
      price_pence: parsed.data.pricePence,
      capacity: parsed.data.capacity ? parseInt(parsed.data.capacity, 10) : null,
      image_url: parsed.data.imageUrl || null,
      host_name: parsed.data.hostName || null,
      host_bio: parsed.data.hostBio || null,
      booking_open: parsed.data.bookingOpen ?? true,
      status: parsed.data.status,
      is_featured: parsed.data.isFeatured ?? false,
    })
    .eq("id", id);

  if (error) {
    console.error("[updateEvent] failed:", error);
    return { ok: false, error: "Could not update event. Please try again." };
  }

  revalidatePath("/admin/dashboard/events");
  revalidatePath("/events");
  if (existing?.slug) revalidatePath(`/events/${existing.slug}`);
  return { ok: true, slug: existing?.slug || "" };
}

export async function deleteEvent(id: string) {
  const supabase = createClient();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/admin/dashboard/events");
  revalidatePath("/events");
}

export async function setEventStatus(
  id: string,
  status: "draft" | "published" | "sold_out" | "cancelled" | "completed"
) {
  const supabase = createClient();
  await supabase.from("events").update({ status }).eq("id", id);
  revalidatePath("/admin/dashboard/events");
  revalidatePath("/events");
}
