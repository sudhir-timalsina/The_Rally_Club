import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { EventCard } from "@/components/event-card";
import { EmptyState } from "@/components/empty-state";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Move, meet, have fun. Explore upcoming events with The Rally Club and find something you’d love to be part of.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const [events, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(3),
  ]);

  return (
    <>
      <section className="pt-14 pb-10 sm:pt-20">
        <div className="container-edit">
          <Reveal>
            <h1 className="text-display-lg max-w-2xl">Rally events</h1>
            <p className="mt-6 text-lg text-chocolate/70 max-w-lg leading-relaxed">
              Move, meet, have fun. Explore our upcoming events and find
              something you’d love to be part of.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="hairline py-16 sm:py-20">
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
              title="New events landing soon"
              description="We're finalising the next round of events. Join the WhatsApp community to hear the moment they're announced."
              ctaLabel="Join the Community"
              ctaHref="/community"
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
