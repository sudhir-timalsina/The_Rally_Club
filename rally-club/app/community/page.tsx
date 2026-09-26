import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Users, Sparkles, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
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
    body: "Every event is an introduction, not just an activity. You'll leave knowing names, not just having burned calories.",
  },
  {
    icon: Sparkles,
    title: "Try something new",
    body: "From your first padel session to a sunrise pilates class, Rally is where you say yes to something outside your routine.",
  },
  {
    icon: HeartHandshake,
    title: "Support each other",
    body: "Rally members cheer each other on — in the WhatsApp group and in person. It's a community that shows up for one another.",
  },
];

export default async function CommunityPage() {
  const reviews = await getPublishedReviews(3);
  return (
    <>
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="container-edit grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <p className="eyebrow mb-5">The Rally Community</p>
            <h1 className="text-display-lg max-w-lg">
              Come alone.
              <br />
              Leave with people.
            </h1>
            <p className="mt-7 text-lg text-chocolate/70 max-w-md leading-relaxed">
              Rally is more than a series of events — it&apos;s a community that
              carries on between them. The WhatsApp group is where it all
              begins.
            </p>
            <div className="mt-8">
              <WhatsAppCta variant="inline" />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="/images/crop_wine_glasses_dinner.jpg"
              alt="Rally Club members enjoying a social together"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="hairline bg-bone/50">
        <div className="container-edit py-16 sm:py-24">
          <SectionHeading
            eyebrow="Why community matters"
            title="A community built around showing up for each other"
            className="mb-14"
          />
          <div className="grid sm:grid-cols-3 gap-8">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div className="w-11 h-11 rounded-full bg-blush flex items-center justify-center mb-5 text-chocolate-soft">
                  <pillar.icon size={19} strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-xl mb-2.5">{pillar.title}</h3>
                <p className="text-[0.95rem] text-chocolate/65 leading-relaxed">{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-edit grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal className="relative aspect-[5/6] rounded-sm overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/crop_candle_tennis_ball.jpg"
              alt="Rally Club branded towel and tennis ball"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow mb-4">Coming alone?</p>
              <h2 className="text-display-md max-w-md">
                It&apos;s genuinely the best way to meet people
              </h2>
              <p className="mt-6 text-chocolate/70 max-w-md leading-relaxed">
                Come alone or come with friends. Meet new people, try something
                new, and be part of a community that moves together. We&apos;ll
                make sure you&apos;re introduced from the moment you arrive —
                nobody stands alone at a Rally event.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="hairline bg-bone/50">
          <div className="container-edit py-16 sm:py-24">
            <SectionHeading eyebrow="From our members" title="What Rally members say" className="mb-12" />
            <ReviewsStrip reviews={reviews} />
          </div>
        </section>
      )}

      <section className="hairline bg-chocolate text-cream">
        <div className="container-edit py-16 sm:py-20 text-center flex flex-col items-center">
          <Reveal>
            <MessageCircle size={28} className="mx-auto mb-6 text-blush-deep" strokeWidth={1.5} />
            <h2 className="text-display-md max-w-lg mx-auto">
              Join the Rally Community
            </h2>
            <p className="mt-5 text-cream/70 max-w-sm mx-auto">
              One WhatsApp group. Every event announcement, community chat, and
              a warm welcome, all in one place.
            </p>
            <div className="mt-9 flex justify-center">
              <WhatsAppCta variant="inline" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-edit">
          <SectionHeading eyebrow="@therallyclub_uk" title="See the community in action" align="center" className="mb-12" />
          <Reveal>
            <InstagramGrid />
          </Reveal>
        </div>
      </section>
    </>
  );
}
