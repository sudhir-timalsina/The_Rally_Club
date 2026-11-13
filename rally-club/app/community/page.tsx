import type { Metadata } from "next";
import { HeartHandshake, MessageCircle, Sparkles, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { ArchImage } from "@/components/arch-image";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { InstagramGrid } from "@/components/instagram-grid";
import { ReviewsStrip } from "@/components/reviews-strip";
import { getPublishedReviews } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Rally Community",
  description:
    "Join the Rally Club WhatsApp community — women's movement, wellness and social events in Cheshire. Come alone, leave with people.",
};

const PILLARS = [
  {
    icon: Users,
    title: "Meet new people",
    body: "Every event is an introduction, not just an activity. You’ll leave knowing names, not just having burned calories.",
  },
  {
    icon: Sparkles,
    title: "Try something new",
    body: "From your first padel session to a sunrise pilates class, Rally is where you say yes to something outside your routine.",
  },
  {
    icon: HeartHandshake,
    title: "Support each other",
    body: "Rally members cheer each other on — in the WhatsApp group and in person. It’s a community that shows up for one another.",
  },
];

const STEPS = [
  {
    title: "Join the WhatsApp community",
    body: "Say hello, see what’s coming up and ask anything before you book.",
  },
  {
    title: "Pick an event",
    body: "Browse upcoming events and book your spot in a couple of minutes.",
  },
  {
    title: "Show up and say hello",
    body: "Come alone or with a friend — you’ll be welcomed from the moment you arrive.",
  },
];

export default async function CommunityPage() {
  const reviews = await getPublishedReviews(3);

  return (
    <>
      <PageHero
        eyebrow="The Rally Community"
        title={
          <>
            Come alone.
            <br />
            Leave with people.
          </>
        }
        description="Rally is more than a series of events — it’s a community that carries on between them. The WhatsApp group is where it all begins."
        image={{
          src: "/images/crop_wine_glasses_dinner.jpg",
          alt: "Rally Club members enjoying a social together",
        }}
      >
        <WhatsAppCta variant="inline" />
      </PageHero>

      {/* WHY COMMUNITY MATTERS */}
      <section className="hairline bg-bone/50">
        <div className="container-edit py-16 sm:py-24">
          <SectionHeading
            eyebrow="Why community matters"
            title="A community built around showing up for each other"
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div className="h-full rounded-sm border border-line bg-cream p-7 transition duration-500 hover:-translate-y-1 hover:shadow-lifted">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-blush text-chocolate-soft">
                    <pillar.icon size={19} strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-2.5 font-display text-xl">{pillar.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-chocolate/65">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-24">
        <div className="container-edit">
          <SectionHeading eyebrow="Getting started" title="Three easy steps to your first Rally" className="mb-14" />
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="relative">
                  <span className="font-display text-6xl italic leading-none text-blush-deep">
                    {i + 1}
                  </span>
                  <div className="mb-4 mt-3 h-px w-full bg-line" />
                  <h3 className="mb-2 font-display text-xl">{step.title}</h3>
                  <p className="max-w-xs text-[0.95rem] leading-relaxed text-chocolate/65">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMING ALONE */}
      <section className="hairline bg-bone/50">
        <div className="container-edit grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <ArchImage
              src="/images/crop_candle_tennis_ball.jpg"
              alt="Rally Club branded towel and tennis ball"
              tone="beige"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow mb-4">Coming alone?</p>
              <h2 className="max-w-md text-display-md">It’s genuinely the best way to meet people</h2>
              <p className="mt-6 max-w-md leading-relaxed text-chocolate/70">
                Come alone or come with friends. Meet new people, try something new, and be part of
                a community that moves together. We’ll make sure you’re introduced from the moment
                you arrive — nobody stands alone at a Rally event.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="hairline">
          <div className="container-edit py-16 sm:py-24">
            <SectionHeading eyebrow="From our members" title="What Rally members say" className="mb-12" />
            <ReviewsStrip reviews={reviews} />
          </div>
        </section>
      )}

      {/* JOIN BAND */}
      <section className="bg-chocolate text-cream">
        <div className="container-edit flex flex-col items-center py-16 text-center sm:py-24">
          <Reveal>
            <MessageCircle size={28} className="mx-auto mb-6 text-blush-deep" strokeWidth={1.5} />
            <h2 className="mx-auto max-w-lg text-display-md">Join the Rally Community</h2>
            <p className="mx-auto mt-5 max-w-sm text-cream/70">
              One WhatsApp group. Every event announcement, community chat, and a warm welcome, all
              in one place.
            </p>
            <div className="mt-9 flex justify-center">
              <WhatsAppCta variant="inline" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-edit">
          <SectionHeading
            eyebrow="@therallyclub_uk"
            title="See the community in action"
            align="center"
            className="mb-12"
          />
          <Reveal>
            <InstagramGrid />
          </Reveal>
        </div>
      </section>
    </>
  );
}
