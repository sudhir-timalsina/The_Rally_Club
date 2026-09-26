import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal } from "@/components/reveal";
import { EventCard } from "@/components/event-card";
import { EmptyState } from "@/components/empty-state";
import { CategoryFilter } from "@/components/category-filter";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import type { EventCategory } from "@/types";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse upcoming padel, pilates, wellness and social events with The Rally Club in Cheshire.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [allEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(3),
  ]);

  const activeCategory = searchParams.category as EventCategory | undefined;
  const events = activeCategory
    ? allEvents.filter((e) => e.category === activeCategory)
    : allEvents;

  return (
    <>
      <section className="pt-14 pb-10 sm:pt-20">
        <div className="container-edit">
          <Reveal>
            <p className="eyebrow mb-5">Events</p>
            <h1 className="text-display-lg max-w-2xl">
              Find your next Rally
            </h1>
            <p className="mt-6 text-lg text-chocolate/70 max-w-lg leading-relaxed">
              Padel socials, pilates classes, wellness mornings and more —
              browse what&apos;s on across {siteConfig.contact.area}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="hairline">
        <div className="container-edit py-6">
          <Suspense>
            <CategoryFilter active={activeCategory} />
          </Suspense>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-edit">
          {events.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
              {events.map((event, i) => (
                <Reveal key={event.id} delay={(i % 3) * 0.06}>
                  <EventCard event={event} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title={activeCategory ? "No events in this category right now" : "New events landing soon"}
              description={
                activeCategory
                  ? "Check back soon, or browse all upcoming events instead."
                  : "We're finalising the next round of events. Join the WhatsApp community to hear the moment they're announced."
              }
              ctaLabel={activeCategory ? "View all events" : "Join the Community"}
              ctaHref={activeCategory ? "/events" : "/community"}
            />
          )}
        </div>
      </section>

      {pastEvents.length > 0 && (
        <section className="hairline bg-bone/50">
          <div className="container-edit py-16 sm:py-20">
            <Reveal>
              <p className="eyebrow mb-4">Past events</p>
              <h2 className="text-display-sm mb-10">A look back</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 opacity-90">
              {pastEvents.map((event, i) => (
                <Reveal key={event.id} delay={i * 0.06}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
