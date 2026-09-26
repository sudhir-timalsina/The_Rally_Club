import Link from "next/link";
import Image from "next/image";
import { CalendarPlus, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatEventDate, formatEventTime, formatGBP } from "@/lib/utils";
import { googleCalendarUrl } from "@/lib/calendar";

export type PublicBooking = {
  booking_reference: string;
  full_name: string;
  email: string;
  attendees: number;
  amount_pence: number;
  currency: string;
  payment_status: string;
  status: string;
  event_title: string;
  event_slug: string;
  event_date: string;
  start_time: string;
  location_name: string;
  location_area: string;
};

export function BookingConfirmationCard({ booking }: { booking: PublicBooking }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(
    `RALLY-CHECKIN:${booking.booking_reference}`
  )}`;

  const calUrl = googleCalendarUrl({
    title: booking.event_title,
    description: `Your Rally Club booking (${booking.booking_reference}) at ${booking.location_name}.`,
    location: `${booking.location_name}, ${booking.location_area}`,
    date: booking.event_date,
    startTime: booking.start_time,
  });

  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-blush flex items-center justify-center mx-auto mb-6 text-chocolate-soft">
        <PartyPopper size={22} strokeWidth={1.6} />
      </div>
      <p className="eyebrow mb-3">Booking confirmed</p>
      <h1 className="text-display-md">You&apos;re booked!</h1>
      <p className="mt-4 text-chocolate/65 max-w-sm mx-auto">
        Your spot at <strong className="text-chocolate">{booking.event_title}</strong> is
        confirmed. A confirmation email is on its way to {booking.email}.
      </p>

      <div className="mt-10 bg-bone border border-line rounded-sm p-6 sm:p-8 text-left max-w-md mx-auto">
        <dl className="space-y-3 text-sm">
          <Row label="Date" value={formatEventDate(booking.event_date)} />
          <Row label="Time" value={formatEventTime(booking.start_time)} />
          <Row label="Location" value={`${booking.location_name}, ${booking.location_area}`} />
          <Row label="Spaces" value={String(booking.attendees)} />
          <Row
            label="Amount paid"
            value={booking.payment_status === "not_required" ? "Free" : formatGBP(booking.amount_pence)}
          />
          <Row label="Booked under" value={booking.full_name} />
        </dl>

        <div className="mt-6 pt-6 border-t border-line flex flex-col items-center">
          <Image src={qrUrl} alt="Booking QR code" width={120} height={120} className="rounded-sm" unoptimized />
          <p className="font-mono text-base tracking-wide mt-3">{booking.booking_reference}</p>
          <p className="text-xs text-chocolate/45 mt-1">Show this at check-in</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Button asChild variant="secondary">
          <a href={calUrl} target="_blank" rel="noopener noreferrer">
            <CalendarPlus size={16} /> Add to Calendar
          </a>
        </Button>
        <Button asChild>
          <Link href="/events">Back to Events</Link>
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-chocolate/50">{label}</dt>
      <dd className="font-medium text-right">{value}</dd>
    </div>
  );
}
