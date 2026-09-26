import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { EventCard } from "@/components/event-card";
import { EmptyState } from "@/components/empty-state";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { InstagramGrid } from "@/components/instagram-grid";
import { LogoBadge } from "@/components/logo";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { AnimatedHeadline } from "@/components/animated-headline";
import { Marquee } from "@/components/marquee";
import { TiltImage } from "@/components/tilt-image";
import { ParallaxImage } from "@/components/parallax-image";
import { getUpcomingEvents } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const events = await getUpcomingEvents(3);

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <HeroSlideshow />
        <div className="grain-overlay z-[1]" />

        <div className="container-edit relative z-10 pb-16 sm:pb-20 pt-32">
          <div className="flex items-center gap-3 mb-7">
            <LogoBadge size={44} />
            <span className="eyebrow text-cream/70">Cheshire &amp; beyond</span>
          </div>

          <AnimatedHeadline
            lines={["Move.", "Sweat.", "Play."]}
            className="text-display-xl text-cream"
          />

          <Reveal delay={0.5}>
            <p className="mt-7 text-[1.05rem] text-cream/75 max-w-md leading-relaxed">
              A women&apos;s community built around padel, pilates, wellness and
              social experiences — a place to move your body, meet new people,
              and feel like you belong.
            </p>
          </Reveal>

          <Reveal delay={0.62}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/events">
                  Discover an Event <ArrowRight size={16} />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="!border-cream/50 !text-cream hover:!bg-cream hover:!text-chocolate"
              >
                <Link href="/about">What is Rally?</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 right-6 sm:right-10 z-10 hidden sm:block">
          <Reveal delay={0.8}>
            <div className="flex flex-col items-end text-cream/60 text-xs tracking-wideish uppercase">
              <span className="animate-float-slow">Scroll</span>
              <span className="w-px h-10 bg-cream/30 mt-2" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- MARQUEE */}
      <section className="hairline bg-bone/60 py-6 sm:py-8 text-chocolate/85">
        <Marquee />
      </section>

      {/* ------------------------------------------------------------ STATEMENT */}
      <section className="hairline">
        <div className="container-edit py-16 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-4">A women&apos;s community</p>
                <h2 className="text-display-sm">
                  For a more balanced, brighter life
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-chocolate/75 max-w-xl">
                  Rally brings women together through padel, pilates, walks, coffee
                  and socials — not as a fitness class, but as a genuine community.
                  Come alone or bring a friend; either way, you&apos;ll leave having
                  met someone new.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                  {["Play", "Connect", "Belong"].map((word) => (
                    <span key={word} className="flex items-center gap-2 text-chocolate/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-taupe" />
                      {word}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- EVENTS */}
      <section className="hairline bg-bone/50">
        <div className="container-edit py-16 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="What's on"
              title="Upcoming events"
              description="From padel socials to sunrise pilates — here's what's coming up."
            />
            <Reveal delay={0.1}>
              <Link href="/events" className="text-sm font-medium link-underline pb-1 shrink-0">
                View all events →
              </Link>
            </Reveal>
          </div>

          {events.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {events.map((event, i) => (
                <Reveal key={event.id} delay={i * 0.08}>
                  <EventCard event={event} priority={i === 0} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title="New events landing soon"
              description="We're finalising the next round of padel socials, pilates classes and community events. Join the WhatsApp community to be the first to hear."
              ctaLabel="Join the Community"
              ctaHref="/community"
            />
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------- COMMUNITY */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="container-edit grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal className="order-2 lg:order-1">
            <TiltImage
              src="/images/crop_sunset_women_toast.jpg"
              alt="Rally Club members toasting together at sunset"
              className="aspect-[5/6]"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow mb-4">Come as you are</p>
              <h2 className="text-display-md max-w-md">
                Come alone or come with friends
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-chocolate/70 max-w-md leading-relaxed">
                We know showing up alone can feel daunting — so it&apos;s something
                we&apos;ve designed the whole experience around. You&apos;ll be
                welcomed the moment you arrive, introduced to other members, and
                given every reason to come back.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-col gap-4">
                {[
                  "Meet new people in a relaxed, no-pressure setting",
                  "Try something new — padel, pilates, wellness and more",
                  "Be part of a community that moves together",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[0.95rem] text-chocolate/80">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blush-deep shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3}>
              <Button asChild className="mt-9" variant="secondary">
                <Link href="/community">Explore the Community</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ FOUNDER */}
      <section className="hairline bg-chocolate text-cream relative overflow-hidden">
        <div className="container-edit py-16 sm:py-24 grid lg:grid-cols-12 gap-10 items-center relative z-10">
          <Reveal className="lg:col-span-4">
            <div className="relative aspect-[3/4] max-w-[280px] rounded-sm overflow-hidden mx-auto lg:mx-0">
              <Image
                src="/images/crop_founder_color_card.jpg"
                alt="Holly Storey, Founder of The Rally Club"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="eyebrow text-cream/50 mb-4">Founder</p>
              <p className="font-display italic text-2xl sm:text-3xl leading-snug max-w-xl">
                &ldquo;I wanted to build the community I was looking for myself —
                one where turning up alone felt completely normal.&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-cream/70">
                {siteConfig.founder.name} — {siteConfig.founder.role}
              </p>
              <Link
                href="/why-we-started"
                className="inline-flex items-center gap-2 mt-6 text-sm link-underline pb-1"
              >
                Why I started Rally <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- INSTAGRAM */}
      <section className="py-16 sm:py-24">
        <div className="container-edit">
          <SectionHeading
            eyebrow="@therallyclub_uk"
            title="Follow along on Instagram"
            align="center"
            className="mb-12"
          />
          <Reveal>
            <InstagramGrid />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- COLLABORATE */}
      <section className="hairline relative overflow-hidden">
        <ParallaxImage
          src="/images/crop_coffee_plant_flatlay.jpg"
          alt=""
          className="absolute inset-0 opacity-[0.14]"
        />
        <div className="container-edit py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center relative">
          <Reveal>
            <p className="eyebrow mb-4">For businesses</p>
            <h2 className="text-display-sm max-w-md">
              Partner with Rally
            </h2>
            <p className="mt-5 text-chocolate/70 max-w-md leading-relaxed">
              We collaborate with instructors, venues, wellness and lifestyle
              brands who share our values. If that sounds like you, we&apos;d love
              to hear from you.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex lg:justify-end">
            <Button asChild variant="secondary" size="lg">
              <Link href="/partners">
                <span className="flex items-center gap-2">
                  Explore Collaboration <ArrowRight size={16} />
                </span>
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- FINAL CTA */}
      <section className="py-16 sm:py-24">
        <div className="container-edit">
          <Reveal>
            <WhatsAppCta />
          </Reveal>
        </div>
      </section>
    </>
  );
}
