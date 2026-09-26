import { createClient } from "@/lib/supabase/server";
import type { RallyEvent, Review, Faq } from "@/types";

/**
 * All functions here fail soft: if Supabase isn't configured yet (no env
 * vars during local setup) or a query errors, we log a warning and return
 * an empty result so the page can render its empty state rather than crash.
 * This keeps the site fully browsable before the client's database is wired
 * up, and is what powers the loading/empty/error states required across
 * the site.
 */

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getUpcomingEvents(limit?: number): Promise<RallyEvent[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    let query = supabase
      .from("events")
      .select("*")
      .in("status", ["published", "sold_out"])
      .gte("event_date", new Date().toISOString().slice(0, 10))
      .order("event_date", { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return (data as RallyEvent[]) ?? [];
  } catch (err) {
    console.warn("[data] getUpcomingEvents failed:", err);
    return [];
  }
}

export async function getFeaturedEvents(limit = 3): Promise<RallyEvent[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .in("status", ["published", "sold_out"])
      .eq("is_featured", true)
      .gte("event_date", new Date().toISOString().slice(0, 10))
      .order("event_date", { ascending: true })
      .limit(limit);
    if (error) throw error;
    return (data as RallyEvent[]) ?? [];
  } catch (err) {
    console.warn("[data] getFeaturedEvents failed:", err);
    return [];
  }
}

export async function getEventsByCategory(category: string): Promise<RallyEvent[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .in("status", ["published", "sold_out"])
      .eq("category", category)
      .gte("event_date", new Date().toISOString().slice(0, 10))
      .order("event_date", { ascending: true });
    if (error) throw error;
    return (data as RallyEvent[]) ?? [];
  } catch (err) {
    console.warn("[data] getEventsByCategory failed:", err);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<RallyEvent | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .in("status", ["published", "sold_out"])
      .maybeSingle();
    if (error) throw error;
    return (data as RallyEvent) ?? null;
  } catch (err) {
    console.warn("[data] getEventBySlug failed:", err);
    return null;
  }
}

export async function getPastEvents(limit = 6): Promise<RallyEvent[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .lt("event_date", new Date().toISOString().slice(0, 10))
      .order("event_date", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data as RallyEvent[]) ?? [];
  } catch (err) {
    console.warn("[data] getPastEvents failed:", err);
    return [];
  }
}

export async function getPublishedFaqs(): Promise<Faq[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data as Faq[]) ?? [];
  } catch (err) {
    console.warn("[data] getPublishedFaqs failed:", err);
    return [];
  }
}

export async function getPublishedReviews(limit?: number): Promise<Review[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    let query = supabase
      .from("reviews")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return (data as Review[]) ?? [];
  } catch (err) {
    console.warn("[data] getPublishedReviews failed:", err);
    return [];
  }
}
