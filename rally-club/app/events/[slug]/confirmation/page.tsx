import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BookingConfirmationCard, type PublicBooking } from "@/components/booking-confirmation-card";
import { ConfirmationPoller } from "@/components/confirmation-poller";

export const metadata: Metadata = { title: "Booking Confirmed", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function BookingConfirmationPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { session_id?: string; ref?: string };
}) {
  const sessionId = searchParams.session_id;
  const reference = searchParams.ref;

  // Try to resolve the booking immediately on the server first (this is
  // instant for free-event bookings, and often instant for paid ones too
  // since Stripe usually delivers the webhook within a second or two).
  let booking: PublicBooking | null = null;
  if (sessionId || reference) {
    const supabase = createClient();
    const { data } = await supabase.rpc("get_booking_public", {
      p_session_id: sessionId || null,
      p_reference: reference || null,
    });
    booking = (Array.isArray(data) ? data[0] : data) || null;
  }

  return (
    <section className="min-h-[70vh] flex items-center py-20">
      <div className="container-edit max-w-xl mx-auto">
        {booking ? (
          <BookingConfirmationCard booking={booking} />
        ) : sessionId ? (
          // Paid booking whose webhook hasn't landed yet — poll client-side
          // rather than ever claiming success before payment is verified.
          <ConfirmationPoller sessionId={sessionId} />
        ) : (
          <div className="text-center">
            <h1 className="text-display-sm mb-4">Booking not found</h1>
            <p className="text-chocolate/60">
              We couldn&apos;t find a booking for this link. If you believe
              this is a mistake, please get in touch with us.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
