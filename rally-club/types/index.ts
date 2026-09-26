export type EventCategory =
  | "padel"
  | "pilates"
  | "running"
  | "social"
  | "wellness"
  | "fitness"
  | "special";

export type EventStatus = "draft" | "published" | "sold_out" | "cancelled" | "completed";

export interface RallyEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string | null;
  category: EventCategory;
  location_name: string;
  location_area: string;
  address: string | null;
  event_date: string; // ISO date
  start_time: string; // HH:mm
  end_time: string | null;
  price_pence: number;
  capacity: number | null;
  spots_taken: number;
  image_url: string | null;
  host_name: string | null;
  host_bio: string | null;
  booking_open: boolean;
  status: EventStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "not_required";
export type BookingStatus = "confirmed" | "cancelled" | "checked_in";

export interface Booking {
  id: string;
  event_id: string;
  booking_reference: string;
  full_name: string;
  email: string;
  phone: string | null;
  attendees: number;
  amount_pence: number;
  currency: string;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  payment_status: PaymentStatus;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
}

export interface BookingWithEvent extends Booking {
  event_title: string;
  event_date: string;
  event_slug: string;
}

export interface Review {
  id: string;
  author_name: string;
  quote: string;
  context: string | null; // e.g. "Attended: Sunday Padel Social"
  rating: number;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export type CollaborationType =
  | "instructor"
  | "venue"
  | "wellness_brand"
  | "lifestyle_brand"
  | "cafe_restaurant"
  | "event_partner"
  | "other";

export interface PartnershipEnquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  business_type: string;
  collaboration_type: CollaborationType;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  region: string;
  is_active: boolean;
  launching_text: string | null;
}

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  padel: "Padel",
  pilates: "Pilates",
  running: "Running",
  social: "Social",
  wellness: "Wellness",
  fitness: "Fitness",
  special: "Special Event",
};

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  draft: "Draft",
  published: "Published",
  sold_out: "Sold Out",
  cancelled: "Cancelled",
  completed: "Completed",
};
