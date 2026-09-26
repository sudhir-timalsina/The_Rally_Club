"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { BookingConfirmationCard, type PublicBooking } from "@/components/booking-confirmation-card";

const POLL_INTERVAL_MS = 2500;
const MAX_ATTEMPTS = 16; // ~40 seconds

export function ConfirmationPoller({ sessionId }: { sessionId: string }) {
  const [booking, setBooking] = useState<PublicBooking | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (booking || timedOut) return;

    const supabase = createClient();
    let cancelled = false;

    const check = async () => {
      const { data } = await supabase.rpc("get_booking_public", {
        p_session_id: sessionId,
        p_reference: null,
      });
      if (cancelled) return;
      const row = Array.isArray(data) ? data[0] : data;
      if (row) {
        setBooking(row as PublicBooking);
      } else {
        setAttempts((a) => a + 1);
      }
    };

    check();
    const interval = setInterval(() => {
      if (attempts >= MAX_ATTEMPTS) {
        setTimedOut(true);
        clearInterval(interval);
        return;
      }
      check();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempts, booking, timedOut, sessionId]);

  if (booking) {
    return <BookingConfirmationCard booking={booking} />;
  }

  if (timedOut) {
    return (
      <div className="text-center max-w-sm mx-auto">
        <h1 className="text-display-sm mb-4">Almost there</h1>
        <p className="text-chocolate/65 mb-8">
          Your payment went through, but confirming the last details is taking
          longer than usual. You&apos;ll receive a confirmation email shortly —
          if it doesn&apos;t arrive within a few minutes, please get in touch
          and we&apos;ll sort it out right away.
        </p>
        <Button asChild variant="secondary">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center max-w-sm mx-auto">
      <Loader2 size={28} className="animate-spin mx-auto mb-6 text-taupe-dark" />
      <h1 className="text-display-sm mb-3">Confirming your payment</h1>
      <p className="text-chocolate/60 text-sm">
        This only takes a moment — please don&apos;t close this page.
      </p>
    </div>
  );
}
