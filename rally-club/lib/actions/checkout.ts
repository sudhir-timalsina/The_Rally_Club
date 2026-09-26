"use server";

import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { checkoutSchema } from "@/lib/validations";
import { siteConfig } from "@/lib/site-config";

export type CheckoutResult =
  | { ok: true; free: true; reference: string; eventSlug: string }
  | { ok: true; free: false; url: string }
  | { ok: false; error: string };

/**
 * The single entry point for booking an event. Price, capacity and
 * bookability are always re-checked server-side against the database —
 * the client-submitted quantity is the only thing we trust the browser
 * for, and even that is re-validated against live capacity here and again,
 * atomically, inside create_confirmed_booking() at the point of confirming
 * payment (see lib/stripe-webhook or the free-event path below).
 */
export async function createBookingCheckout(formData: FormData): Promise<CheckoutResult> {
  const raw = {
    eventId: formData.get("eventId"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    quantity: formData.get("quantity") || "1",
    notes: formData.get("notes") || undefined,
    agreedToTerms: formData.get("agreedToTerms") === "on" || formData.get("agreedToTerms") === "true",
  };

  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message || "Please check the form and try again." };
  }
  const input = parsed.data;

  const supabase = createClient();
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, slug, title, description, location_name, location_area, event_date, start_time, price_pence, capacity, spots_taken, status, booking_open, image_url")
    .eq("id", input.eventId)
    .maybeSingle();

  if (eventError || !event) {
    return { ok: false, error: "This event could not be found." };
  }
  if (event.status === "cancelled") {
    return { ok: false, error: "This event has been cancelled." };
  }
  if (event.status === "completed") {
    return { ok: false, error: "This event has already taken place." };
  }
  if (!event.booking_open) {
    return { ok: false, error: "Booking is currently closed for this event." };
  }
  if (event.status === "sold_out") {
    return { ok: false, error: "Sorry — this event is sold out." };
  }
  if (event.capacity !== null && event.spots_taken + input.quantity > event.capacity) {
    return {
      ok: false,
      error: `Only ${Math.max(event.capacity - event.spots_taken, 0)} space(s) left — please reduce your group size.`,
    };
  }

  // ---- Free event: confirm immediately, no Stripe involved -------------
  if (event.price_pence === 0) {
    const { data: booking, error: rpcError } = await supabase.rpc("create_confirmed_booking", {
      p_event_id: event.id,
      p_full_name: input.fullName,
      p_email: input.email,
      p_phone: input.phone || null,
      p_quantity: input.quantity,
      p_amount_pence: 0,
      p_currency: "gbp",
      p_stripe_session_id: null,
      p_stripe_payment_intent_id: null,
      p_payment_status: "not_required",
      p_notes: input.notes || null,
    });

    if (rpcError) {
      console.error("[createBookingCheckout] free booking failed:", rpcError);
      if (rpcError.message?.includes("SOLD_OUT")) {
        return { ok: false, error: "Sorry — this event just sold out." };
      }
      return { ok: false, error: "Something went wrong reserving your spot. Please try again." };
    }

    const { sendBookingConfirmationEmail } = await import("@/lib/email");
    await sendBookingConfirmationEmail({
      booking: Array.isArray(booking) ? booking[0] : booking,
      event,
    });

    const ref = (Array.isArray(booking) ? booking[0] : booking)?.booking_reference;
    return { ok: true, free: true, reference: ref, eventSlug: event.slug };
  }

  // ---- Paid event: create a Stripe Checkout Session ---------------------
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: input.email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: event.price_pence,
            product_data: {
              name: event.title,
              description: `${event.location_name}, ${event.location_area}`,
              images: event.image_url ? [event.image_url] : undefined,
            },
          },
          quantity: input.quantity,
        },
      ],
      metadata: {
        eventId: event.id,
        eventSlug: event.slug,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone || "",
        quantity: String(input.quantity),
        notes: (input.notes || "").slice(0, 400),
      },
      success_url: `${siteConfig.url}/events/${event.slug}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.url}/events/${event.slug}?booking=cancelled`,
    });

    if (!session.url) {
      return { ok: false, error: "Could not start checkout. Please try again." };
    }

    return { ok: true, free: false, url: session.url };
  } catch (err) {
    console.error("[createBookingCheckout] Stripe session failed:", err);
    return {
      ok: false,
      error:
        err instanceof Error && err.message.includes("STRIPE_SECRET_KEY")
          ? "Online payments aren't set up yet — please contact us directly to book."
          : "Something went wrong starting checkout. Please try again.",
    };
  }
}
