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
    "Holly Storey on why she started The Rally Club — a women’s community for meeting new people through the things you genuinely enjoy.",
};

// To change the photos: add the new images to public/images and update these paths.
const STORY_BANNER = "/images/crop_founder_bw_photo_only.jpg";
const FOUNDER_AVATAR = "/images/crop_founder_color_card.jpg";

const LEAD =
  "I kept coming back to the same thought: why is it so hard to meet new people as an adult?";

const STORY: string[] = [
  "I moved to the area around seven years ago and found that making new friends wasn’t always easy. I work from home, I’m a mum, and life can get very busy. I was lucky enough to meet some amazing people through netball, and what I loved was that we already had something in common. We were there because we enjoyed the same sport, so conversation came naturally and friendships followed.",
  "I even tried Bumble BFF and met some genuinely great friends through it. Again, the thing that made it easier was having common interests. You already have a starting point — something you both enjoy, something to talk about, somewhere to go together.",
  "That really stuck with me.",
  "Then I discovered PADEL.",
  "I loved that it was active without feeling like a workout, social without being forced, and competitive without needing to take it too seriously. You could turn up not knowing anyone, but you already had something in common: you were both there to play. Within an hour, you’re chatting, laughing and getting to know each other without that awkward “so… what do you do?” feeling.",
  "And that’s when the idea for The Rally Club really started to come together.",
  "I thought, what if I brought all of those things together under one roof?",
  "Different activities, different interests and different experiences — but all designed to give women a natural reason to meet. You might come for Padel, Pilates, a creative workshop, a wellness event or a social, but the common thread is that you’re surrounded by women who are there for the same reason.",
  "I didn’t want to create another gym or another fitness class. I wanted to create somewhere where the shared interest opens the door, and friendship is what happens next.",
  "So that’s Rally.",
  "It started with Padel, but it’s grown into so much more — Pilates, wellness, socials, creative workshops, food, drinks and experiences, all bringing women together through things they genuinely enjoy.",
  "Play. Connect. Belong.",
  "Because I know from my own experience that making friends as an adult doesn’t have to be awkward. Sometimes you just need something in common, somewhere to go, and a reason to say hello.",
];

export default function WhyWeStartedPage() {
  return (
    <>
      <section className="pt-14 pb-10 sm:pt-20">
        <div className="container-edit">
          <Reveal>
            <h1 className="text-display-lg max-w-2xl">Why I started Rally</h1>
          </Reveal>
        </div>
      </section>

      <section className="relative h-[45vh] min-h-[320px] max-h-[500px]">
        <Image
          src={STORY_BANNER}
          alt={siteConfig.founder.name}
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
                  {LEAD}
                </p>
                {STORY.map((paragraph, i) =>
                  paragraph.length < 50 ? (
                    <p key={i} className="font-display text-2xl text-chocolate">
                      {paragraph}
                    </p>
                  ) : (
                    <p key={i}>{paragraph}</p>
                  )
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 pt-8 hairline flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={FOUNDER_AVATAR}
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
