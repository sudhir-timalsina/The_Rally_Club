import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, MessageCircle, Smile, Sparkles, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { ArchImage } from "@/components/arch-image";
import { Marquee } from "@/components/marquee";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/whatsapp-cta";

export const metadata: Metadata = {
  title: "About Rally",
  description:
    "The Rally Club is a women's community for padel, pilates, wellness and social experiences in Cheshire. Discover what makes Rally different.",
};

const DIFFERENTIATORS = [
  {
    icon: Heart,
    title: "Community first",
    body: "Every event is designed around meeting people, not just completing a workout.",
  },
  {
    icon: Users,
    title: "Come alone, always",
    body: "The majority of our members arrive solo. It’s normal, welcomed, and genuinely the easiest way to meet people.",
  },
  {
    icon: Sparkles,
    title: "Real variety",
    body: "Padel, pilates, wellness, walks, socials and more — something for every mood and every week.",
  },
  {
    icon: Smile,
    title: "No pressure, any level",
    body: "Whether you’re a total beginner or a seasoned player, Rally meets you where you are.",
  },
  {
    icon: MapPin,
    title: "Local, not corporate",
    body: "Rally is rooted in Cheshire, run by women who know the venues, the instructors, and the community personally.",
  },
  {
    icon: MessageCircle,
    title: "More than an event",
    body: "The WhatsApp community, the follow-ups, the friendships — Rally continues well beyond each event.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Rally"
        title="A women’s community for a more balanced, brighter life"
        description="The Rally Club began with a simple idea: movement is better shared. We bring women together through padel, pilates, wellness and social experiences — built for connection first, fitness second."
        image={{
          src: "/images/crop_women_walking_padel.jpg",
          alt: "Rally Club members walking together onto the court",
        }}
      >
        <Button asChild size="lg">
          <Link href="/events">
            See what’s on <ArrowRight size={16} />
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href="/community">Join the community</Link>
        </Button>
      </PageHero>

      <section className="hairline bg-bone/60 py-6 text-chocolate/85 sm:py-8">
        <Marquee />
      </section>

      {/* THE IDEA */}
      <section>
        <div className="container-edit grid gap-8 py-16 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="The idea" title="Movement, socialising, and community — together" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <div className="max-w-xl space-y-6 leading-relaxed text-chocolate/75">
                <p>
                  Most fitness communities stop at the workout. Most social groups never move at
                  all. Rally exists in between — a place where a padel match or a pilates class is
                  really just the reason to get a group of women in the same room.
                </p>
                <p>
                  What happens after — the coffee, the conversation, the new friendship — is the
                  actual point. That’s what keeps our members coming back, and what makes Rally
                  feel less like a timetable of classes and more like a community you belong to.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-chocolate text-cream">
        <div className="container-edit py-16 text-center sm:py-24">
          <Reveal>
            <p className="mx-auto max-w-3xl font-display text-3xl italic leading-tight sm:text-5xl">
              More than a game. A community.
            </p>
            <p className="mt-6 text-sm uppercase tracking-label text-cream/55">
              Play. Connect. Belong.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT MAKES RALLY DIFFERENT */}
      <section className="bg-bone/50">
        <div className="container-edit py-16 sm:py-24">
          <SectionHeading
            eyebrow="What makes us different"
            title="Built for connection, not just fitness"
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.07}>
                <div className="h-full rounded-sm border border-line bg-cream p-7 transition duration-500 hover:-translate-y-1 hover:shadow-lifted">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-blush text-chocolate-soft">
                    <item.icon size={18} strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-2.5 font-display text-xl">{item.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-chocolate/65">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO RALLY IS FOR */}
      <section className="py-16 sm:py-24">
        <div className="container-edit grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Who Rally is for</p>
            <h2 className="max-w-md text-display-md">
              Every woman is welcome — whatever your starting point
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-chocolate/70">
              Rally is for the woman who just moved to the area and doesn’t know anyone yet. For the
              friend group looking for a new way to spend a Sunday. For anyone who has been meaning
              to try padel, or pilates, or simply meet more people. You don’t need experience, a
              certain fitness level, or someone to come with — you just need to show up.
            </p>
            <Button asChild className="mt-8" variant="secondary">
              <Link href="/events">
                <span className="flex items-center gap-2">
                  See what’s on <ArrowRight size={16} />
                </span>
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <ArchImage
              src="/images/crop_pilates_studio.jpg"
              alt="A bright, plant-filled pilates studio used for Rally Club classes"
              tone="beige"
            />
          </Reveal>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-edit">
          <Reveal>
            <WhatsAppCta />
          </Reveal>
        </div>
      </section>
    </>
  );
}
