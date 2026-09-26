import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Why I Started Rally",
  description:
    "Holly Storey on the idea behind The Rally Club — and why she wanted to build a community where women could move, connect and belong.",
};

export default function WhyWeStartedPage() {
  return (
    <>
      <section className="pt-14 pb-10 sm:pt-20">
        <div className="container-edit">
          <Reveal>
            <p className="eyebrow mb-5">Why I started Rally</p>
            <h1 className="text-display-lg max-w-2xl">
              This is the community I wished existed
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative h-[45vh] min-h-[320px] max-h-[500px]">
        <Image
          src="/images/crop_founder_bw_photo_only.jpg"
          alt="Holly Storey, Founder of The Rally Club"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-edit grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-1 hidden lg:block">
            <div className="rule" />
          </div>
          <div className="lg:col-span-7 lg:col-start-3">
            <Reveal>
              <div className="space-y-7 text-[1.05rem] leading-relaxed text-chocolate/80 max-w-2xl">
                <p className="font-display text-2xl sm:text-3xl italic leading-snug text-chocolate">
                  &ldquo;I kept noticing the same thing — brilliant, busy women who
                  wanted to move more and meet people, but couldn&apos;t find a
                  space that felt right for either.&rdquo;
                </p>
                <p>
                  Placeholder founder story — replace with Holly&apos;s own words.
                  This is where the personal story behind Rally belongs: what
                  prompted the idea, what was missing from existing fitness and
                  social spaces, and the moment it became clear this was worth
                  building.
                </p>
                <p>
                  [Placeholder] Gyms felt transactional. Class timetables came and
                  went without anyone actually speaking to one another. Social
                  events revolved around sitting still. There didn&apos;t seem to
                  be a space built specifically for women to do both — move their
                  bodies and build real connections — without it feeling
                  intimidating to show up alone.
                </p>
                <p>
                  [Placeholder] So Rally started small: a handful of women, a
                  padel court, and an invitation to just turn up. What mattered
                  wasn&apos;t the score at the end of the match — it was the
                  conversation afterwards, the plans made for next week, the
                  sense that everyone belonged there.
                </p>
                <p>
                  [Placeholder] That&apos;s the vision behind Rally today: a community
                  where movement is the reason we gather, but connection is what
                  keeps us coming back. Every event, every partnership, and every
                  detail is designed around that one idea.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 pt-8 hairline flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                  <Image
                    src="/images/crop_founder_color_card.jpg"
                    alt={siteConfig.founder.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-lg">{siteConfig.founder.name}</p>
                  <p className="text-sm text-chocolate/60">{siteConfig.founder.role}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild variant="secondary">
                  <Link href="/founder">
                    <span className="flex items-center gap-2">
                      Meet the Founder <ArrowRight size={16} />
                    </span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/events">Come to an Event</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
