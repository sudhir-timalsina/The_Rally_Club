import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/whatsapp-cta";

export const metadata: Metadata = {
  title: "About Rally",
  description:
    "The Rally Club is a women's community for padel, pilates, wellness and social experiences in Cheshire. Discover what makes Rally different.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="container-edit">
          <Reveal>
            <p className="eyebrow mb-5">About Rally</p>
            <h1 className="text-display-lg max-w-2xl">
              A women&apos;s community for a more balanced, brighter life
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg text-chocolate/70 max-w-xl leading-relaxed">
              The Rally Club began with a simple idea: movement is better shared.
              We bring women together through padel, pilates, wellness and social
              experiences — built for connection first, fitness second.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative h-[50vh] min-h-[360px] max-h-[560px]">
        <Image
          src="/images/crop_women_walking_padel.jpg"
          alt="Rally Club members walking together onto the court"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </section>

      {/* THE IDEA */}
      <section className="hairline">
        <div className="container-edit py-16 sm:py-24 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="The idea" title="Movement, socialising, and community — together" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-chocolate/75 leading-relaxed max-w-xl">
                <p>
                  Most fitness communities stop at the workout. Most social groups
                  never move at all. Rally exists in between — a place where a padel
                  match or a pilates class is really just the reason to get a group
                  of women in the same room.
                </p>
                <p>
                  What happens after — the coffee, the conversation, the new
                  friendship — is the actual point. That&apos;s what keeps our
                  members coming back, and what makes Rally feel less like a
                  timetable of classes and more like a community you belong to.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT MAKES RALLY DIFFERENT */}
      <section className="hairline bg-bone/50">
        <div className="container-edit py-16 sm:py-24">
          <SectionHeading
            eyebrow="What makes us different"
            title="Built for connection, not just fitness"
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {DIFFERENTIATORS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <span className="eyebrow text-taupe-dark/70">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-xl mt-3 mb-2.5">{item.title}</h3>
                <p className="text-[0.95rem] text-chocolate/65 leading-relaxed max-w-xs">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO RALLY IS FOR */}
      <section className="py-16 sm:py-24">
        <div className="container-edit grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <p className="eyebrow mb-4">Who Rally is for</p>
            <h2 className="text-display-md max-w-md">
              Every woman is welcome — whatever your starting point
            </h2>
            <p className="mt-6 text-chocolate/70 max-w-md leading-relaxed">
              Rally is for the woman who just moved to the area and doesn&apos;t
              know anyone yet. For the friend group looking for a new way to
              spend a Sunday. For anyone who has been meaning to try padel, or
              pilates, or simply meet more people. You don&apos;t need experience,
              a certain fitness level, or someone to come with — you just need to
              show up.
            </p>
            <Button asChild className="mt-8" variant="secondary">
              <Link href="/events">
                <span className="flex items-center gap-2">
                  See what&apos;s on <ArrowRight size={16} />
                </span>
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="/images/crop_pilates_studio.jpg"
              alt="A bright, plant-filled pilates studio used for Rally Club classes"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

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

const DIFFERENTIATORS = [
  {
    title: "Community first",
    body: "Every event is designed around meeting people, not just completing a workout.",
  },
  {
    title: "Come alone, always",
    body: "The majority of our members arrive solo. It's normal, welcomed, and genuinely the easiest way to meet people.",
  },
  {
    title: "Real variety",
    body: "Padel, pilates, wellness, walks, socials and more — something for every mood and every week.",
  },
  {
    title: "No pressure, any level",
    body: "Whether you're a total beginner or a seasoned player, Rally meets you where you are.",
  },
  {
    title: "Local, not corporate",
    body: "Rally is rooted in Cheshire, run by women who know the venues, the instructors, and the community personally.",
  },
  {
    title: "More than an event",
    body: "The WhatsApp community, the follow-ups, the friendships — Rally continues well beyond each event.",
  },
];
