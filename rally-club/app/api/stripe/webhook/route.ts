import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";
import { sendBookingConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

/**
 * The Stripe webhook is the ONLY source of truth for payment confirmation.
 * The browser success page is never trusted on its own — see
 * app/events/[slug]/confirmation for how it polls this data instead of
 * assuming success from the redirect alone.
 *
 * Configure this endpoint in the Stripe Dashboard (or via the Stripe CLI for
 * local testing — see README) to receive at minimum:
 *   - checkout.session.completed
 *   - checkout.session.async_payment_succeeded
 *   - charge.refunded (optional, keeps refunds issued from the Stripe
 *     dashboard in sync with Supabase)
 */
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("[stripe-webhook] Missing signature or STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.async_payment_failed":
        console.warn("[stripe-webhook] Async payment failed for session", (event.data.object as Stripe.Checkout.Session).id);
        break;
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId =
          typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
        if (paymentIntentId) {
          const supabase = createAdminClient();
          await supabase.rpc("mark_booking_refunded", { p_payment_intent_id: paymentIntentId });
        }
        break;
      }
      default:
        // Unhandled event types are fine to ignore.
        break;
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe-webhook] Handler error:", err);
    // Return 500 so Stripe retries delivery.
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    console.info(`[stripe-webhook] Session ${session.id} not yet paid (${session.payment_status}); skipping.`);
    return;
  }

  const metadata = session.metadata || {};
  const eventId = metadata.eventId;
  const quantity = parseInt(metadata.quantity || "1", 10);

  if (!eventId) {
    console.error("[stripe-webhook] Session missing eventId metadata:", session.id);
    return;
  }

  const supabase = createAdminClient();

  const { data: bookingRows, error } = await supabase.rpc("create_confirmed_booking", {
    p_event_id: eventId,
    p_full_name: metadata.fullName || session.customer_details?.name || "Guest",
    p_email: metadata.email || session.customer_details?.email || "",
    p_phone: metadata.phone || null,
    p_quantity: quantity,
    p_amount_pence: session.amount_total ?? 0,
    p_currency: session.currency || "gbp",
    p_stripe_session_id: session.id,
    p_stripe_payment_intent_id:
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || null,
    p_payment_status: "paid",
    p_notes: metadata.notes || null,
  });

  if (error) {
    // SOLD_OUT here means Stripe already captured payment (the customer
    // completed checkout) but capacity was consumed by a concurrent booking
    // in the few seconds between checkout creation and payment completion.
    // We refund automatically rather than silently keeping the customer's
    // money for a spot they didn't get.
    if (error.message?.includes("SOLD_OUT")) {
      console.error(`[stripe-webhook] Sold out after payment for session ${session.id} — issuing refund.`);
      try {
        const stripe = getStripe();
        const paymentIntentId =
          typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
        if (paymentIntentId) {
          await stripe.refunds.create({ payment_intent: paymentIntentId });
        }
      } catch (refundErr) {
        console.error("[stripe-webhook] Automatic refund failed — needs manual attention:", refundErr);
      }
      return;
    }

    console.error("[stripe-webhook] create_confirmed_booking failed:", error);
    return;
  }

  const booking = Array.isArray(bookingRows) ? bookingRows[0] : bookingRows;
  if (!booking) return;

  const { data: eventRow } = await supabase
    .from("events")
    .select("title, location_name, location_area, event_date, start_time")
    .eq("id", eventId)
    .maybeSingle();

  if (eventRow) {
    await sendBookingConfirmationEmail({ booking, event: eventRow });
  }
}
