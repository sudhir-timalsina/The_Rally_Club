"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ---- Contact messages ------------------------------------------------
export async function markMessageRead(id: string, isRead: boolean) {
  const supabase = createClient();
  await supabase.from("contact_messages").update({ is_read: isRead }).eq("id", id);
  revalidatePath("/admin/dashboard/messages");
}
export async function deleteMessage(id: string) {
  const supabase = createClient();
  await supabase.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/dashboard/messages");
}

// ---- Partnership enquiries --------------------------------------------
export async function markPartnerEnquiryRead(id: string, isRead: boolean) {
  const supabase = createClient();
  await supabase.from("partnership_enquiries").update({ is_read: isRead }).eq("id", id);
  revalidatePath("/admin/dashboard/partners");
}
export async function deletePartnerEnquiry(id: string) {
  const supabase = createClient();
  await supabase.from("partnership_enquiries").delete().eq("id", id);
  revalidatePath("/admin/dashboard/partners");
}

// ---- Bookings -------------------------------------------------------------
export async function updateBookingStatus(id: string, status: "confirmed" | "cancelled" | "checked_in") {
  const supabase = createClient();
  await supabase.from("bookings").update({ status }).eq("id", id);
  revalidatePath("/admin/dashboard/bookings");
}
export async function createFaq(formData: FormData) {
  const supabase = createClient();
  const question = String(formData.get("question") || "").trim();
  const answer = String(formData.get("answer") || "").trim();
  if (!question || !answer) return;

  const { data: maxRow } = await supabase
    .from("faqs")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("faqs").insert({
    question,
    answer,
    sort_order: (maxRow?.sort_order ?? 0) + 1,
    is_published: true,
  });
  revalidatePath("/admin/dashboard/faqs");
  revalidatePath("/faq");
}
export async function updateFaq(id: string, formData: FormData) {
  const supabase = createClient();
  const question = String(formData.get("question") || "").trim();
  const answer = String(formData.get("answer") || "").trim();
  await supabase.from("faqs").update({ question, answer }).eq("id", id);
  revalidatePath("/admin/dashboard/faqs");
  revalidatePath("/faq");
}
export async function toggleFaqPublished(id: string, isPublished: boolean) {
  const supabase = createClient();
  await supabase.from("faqs").update({ is_published: isPublished }).eq("id", id);
  revalidatePath("/admin/dashboard/faqs");
  revalidatePath("/faq");
}
export async function deleteFaq(id: string) {
  const supabase = createClient();
  await supabase.from("faqs").delete().eq("id", id);
  revalidatePath("/admin/dashboard/faqs");
  revalidatePath("/faq");
}

// ---- Reviews --------------------------------------------------------------
export async function createReview(formData: FormData) {
  const supabase = createClient();
  const authorName = String(formData.get("authorName") || "").trim();
  const quote = String(formData.get("quote") || "").trim();
  const context = String(formData.get("context") || "").trim();
  const rating = Number(formData.get("rating") || 5);
  if (!authorName || !quote) return;

  await supabase.from("reviews").insert({
    author_name: authorName,
    quote,
    context: context || null,
    rating,
    is_published: true,
  });
  revalidatePath("/admin/dashboard/reviews");
}
export async function toggleReviewPublished(id: string, isPublished: boolean) {
  const supabase = createClient();
  await supabase.from("reviews").update({ is_published: isPublished }).eq("id", id);
  revalidatePath("/admin/dashboard/reviews");
}
export async function deleteReview(id: string) {
  const supabase = createClient();
  await supabase.from("reviews").delete().eq("id", id);
  revalidatePath("/admin/dashboard/reviews");
}
