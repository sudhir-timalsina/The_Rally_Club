import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CategoryIcon } from "@/components/category-icon";
import { BookingWidget } from "@/components/booking-widget";
import { getEventBySlug, getEventsByCategory } from "@/lib/data";
import { EventCard } from "@/components/event-card";
import { EVENT_CATEGORY_LABELS } from "@/types";
import { formatEventDate, formatEventTime, formatGBP } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.excerpt || event.description.slice(0, 155),
    openGraph: event.image_url ? { images: [{ url: event.image_url }] } : undefined,
  };
}

export default async function EventDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { booking?: string };
}) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const related = (await getEventsByCategory(event.category))
    .filter((e) => e.id !== event.id)
    .slice(0, 3);

  const full = event.capacity !== null && event.spots_taken >= (event.capacity ?? Infinity);
  const soldOut = event.status === "sold_out" || full;
  const cancelled = event.status === "cancelled";
  const completed = event.status === "completed";
  const canBook = !soldOut && !cancelled && !completed && event.booking_open;
  const spacesLeft = event.capacity !== null ? Math.max(event.capacity - event.spots_taken, 0) : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: `${event.event_date}T${event.start_time}`,
    endDate: event.end_time ? `${event.event_date}T${event.end_time}` : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: cancelled
      ? "https://schema.org/EventCancelled"
      : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location_name,
      address: event.address || event.location_area,
    },
    image: event.image_url ? [event.image_url] : undefined,
    description: event.description,
    offers: {
      "@type": "Offer",
      price: (event.price_pence / 100).toFixed(2),
      priceCurrency: "GBP",
      availability: soldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: `${siteConfig.url}/events/${event.slug}`,
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="pt-8 pb-4">
        <div className="container-edit">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-chocolate/60 hover:text-chocolate transition-colors"
          >
            <ArrowLeft size={14} /> All events
          </Link>
          {searchParams.booking === "cancelled" && (
            <div className="mt-5 rounded-sm border border-[#e0b8ab] bg-[#f5e5e0] text-[#8a3b2e] px-4 py-3 text-sm">
              Your booking wasn&apos;t completed and your card was not charged.
              Feel free to try again whenever you&apos;re ready.
            </div>
          )}
        </div>
      </section>

      <section className="pb-10">
        <div className="container-edit grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal className="relative aspect-[4/5] rounded-sm overflow-hidden">
            {event.image_url ? (
              <Image
                src={event.image_url}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-beige flex items-center justify-center text-taupe-dark">
                <CategoryIcon category={event.category} size={40} />
              </div>
            )}
            {(soldOut || cancelled || completed) && (
              <div className="absolute top-4 right-4 bg-chocolate text-cream rounded-pill px-3.5 py-1.5 text-xs uppercase tracking-label">
                {cancelled ? "Cancelled" : completed ? "Past Event" : "Sold Out"}
              </div>
            )}
          </Reveal>

          <div>
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-pill border border-line px-3 py-1.5 text-xs uppercase tracking-label text-chocolate/70 mb-5">
                <CategoryIcon category={event.category} size={12} />
                {EVENT_CATEGORY_LABELS[event.category]}
              </div>
              <h1 className="text-display-md">{event.title}</h1>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 flex flex-col gap-3 text-[0.95rem] text-chocolate/75">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-taupe-dark shrink-0" />
                  {formatEventDate(event.event_date)}
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-taupe-dark shrink-0" />
                  {formatEventTime(event.start_time)}
                  {event.end_time ? ` – ${formatEventTime(event.end_time)}` : ""}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-taupe-dark shrink-0" />
                  {event.location_name}, {event.location_area}
                </div>
                {event.capacity !== null && (
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-taupe-dark shrink-0" />
                    {full ? "Fully booked" : `${spacesLeft} spaces left of ${event.capacity}`}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex items-center justify-between rounded-sm bg-bone border border-line px-5 py-4">
                <span className="text-sm text-chocolate/60">Price per space</span>
                <span className="font-display text-2xl">{formatGBP(event.price_pence)}</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6">
                {canBook ? (
                  <a
                    href="#booking-widget"
                    className="inline-flex items-center justify-center gap-2 bg-chocolate text-cream rounded-sm px-9 py-4 text-base font-medium tracking-wideish hover:bg-chocolate-light transition-colors w-full sm:w-auto"
                  >
                    Book Your Spot
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center bg-beige text-chocolate/50 rounded-sm px-9 py-4 text-base font-medium tracking-wideish w-full sm:w-auto cursor-not-allowed">
                    {cancelled
                      ? "Cancelled"
                      : completed
                      ? "This event has taken place"
                      : soldOut
                      ? "Sold Out"
                      : "Booking Closed"}
                  </span>
                )}
              </div>
            </Reveal>

            {event.host_name && (
              <Reveal delay={0.25}>
                <div className="mt-8 pt-6 hairline">
                  <p className="eyebrow mb-2">Hosted by</p>
                  <p className="font-display text-lg">{event.host_name}</p>
                  {event.host_bio && (
                    <p className="text-sm text-chocolate/60 mt-1 max-w-sm">{event.host_bio}</p>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="hairline">
        <div className="container-edit py-14 sm:py-16 max-w-2xl">
          <Reveal>
            <h2 className="text-display-sm mb-5">About this event</h2>
            <div className="text-chocolate/75 leading-relaxed whitespace-pre-line">
              {event.description}
            </div>
          </Reveal>
        </div>
      </section>

      {canBook && (
        <section id="booking-widget" className="hairline bg-bone/50">
          <div className="container-edit py-14 sm:py-16 max-w-xl">
            <Reveal>
              <h2 className="text-display-sm mb-2">Book your spot</h2>
              <p className="text-sm text-chocolate/55 mb-6">
                {event.price_pence === 0
                  ? "This event is free — reserve your spot below."
                  : "Secure checkout powered by Stripe."}
              </p>
              <BookingWidget eventId={event.id} pricePence={event.price_pence} spacesLeft={spacesLeft} />
            </Reveal>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-edit">
            <Reveal>
              <h2 className="text-display-sm mb-10">More like this</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {related.map((e, i) => (
                <Reveal key={e.id} delay={i * 0.08}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
