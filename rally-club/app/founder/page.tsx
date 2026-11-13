import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Meet the Founder",
  description: `Meet ${siteConfig.founder.name}, the founder of The Rally Club.`,
};

// To change the photo: add the new image to public/images and update this path.
const FOUNDER_PHOTO = "/images/crop_founder_color_card.jpg";

const PULL_QUOTE =
  "Play. Connect. Belong. That’s not just our strapline — it’s exactly what I wanted the Rally Club to feel like.";

const BIO: string[] = [
  "I’ve always loved the social side of sport. I played netball and met some of my closest friends through it, so I’ve always known how good it feels to have that sense of belonging and to meet people through being active.",
  "But I’ve never been a gym person, and running definitely isn’t for me! I wanted something that felt like exercise without feeling like exercise — somewhere you could try something new, have a laugh, meet different people and not take yourself too seriously.",
  "I discovered Padel earlier this year and immediately loved the combination of being active and social. You can turn up not knowing anyone, play with completely different people, have a laugh and leave feeling like you’ve actually done something — without it ever feeling intimidating or overly competitive.",
  "That got me thinking: why isn’t there more of this?",
  "So I created The Rally Club — a women’s community built around movement, connection and trying new things. Padel might have been where it started, but Rally is about so much more than a sport. From Pilates and wellness to socials, creative workshops, food, drinks and everything in between, it’s about creating experiences where you can come on your own and still feel like you belong.",
  "I’m passionate about creating a community that feels welcoming, relaxed and genuinely fun — whether you’re completely new to Padel, trying a new class, coming along to a social or simply looking to meet some new people.",
];

const CLOSING =
  "If you leave a Rally event having had a great time, met someone new and saved a new number in your phone, then I’ll feel like we’ve done exactly what we set out to do.";

export default function FounderPage() {
  return (
    <section className="pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="container-edit grid lg:grid-cols-12 gap-10 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src={FOUNDER_PHOTO}
                alt={siteConfig.founder.name}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="font-display text-2xl">{siteConfig.founder.name}</p>
                <p className="text-sm text-chocolate/60">{siteConfig.founder.role}</p>
              </div>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:bg-chocolate hover:text-cream transition-colors shrink-0"
                aria-label="The Rally Club on Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow mb-4">Meet the Founder</p>
            <h1 className="text-display-md">The woman behind Rally</h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-display italic text-2xl leading-snug mt-8 text-chocolate-soft">
              &ldquo;{PULL_QUOTE}&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 space-y-5 text-chocolate/75 leading-relaxed">
              <p className="font-display text-xl text-chocolate">
                I’m Holly, the founder of The Rally Club.
              </p>
              {BIO.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 pt-8 hairline">
              <p className="eyebrow mb-3">In her words</p>
              <p className="font-display text-xl italic leading-snug max-w-lg">
                &ldquo;{CLOSING}&rdquo;
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/events">
                  <span className="flex items-center gap-2">
                    Come to an Upcoming Event <ArrowRight size={16} />
                  </span>
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/why-we-started">Read the full story</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
