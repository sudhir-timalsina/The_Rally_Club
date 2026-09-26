import Stripe from "stripe";

let _stripe: Stripe | null = null;

/**
 * Server-only Stripe client. Never import this into a Client Component.
 * Throws a clear error if STRIPE_SECRET_KEY hasn't been configured yet,
 * rather than failing with a cryptic Stripe SDK error deep in a request.
 */
export function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment before accepting paid bookings (see .env.example)."
    );
  }

  _stripe = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
  return _stripe;
}
