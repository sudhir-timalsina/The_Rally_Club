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

export default function FounderPage() {
  return (
    <section className="pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="container-edit grid lg:grid-cols-12 gap-10 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src="/images/crop_founder_color_card.jpg"
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
                aria-label="Holly on Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow mb-4">Meet the Founder</p>
            <h1 className="text-display-md">
              The woman behind Rally
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-display italic text-2xl leading-snug mt-8 text-chocolate-soft">
              &ldquo;Play. Connect. Belong. That&apos;s not just our strapline —
              it&apos;s exactly what I wanted Rally to feel like.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 space-y-5 text-chocolate/75 leading-relaxed">
              <p>
                [Placeholder biography] {siteConfig.founder.name} founded The
                Rally Club to bring women together through movement and
                connection. Her background and personal story belong here —
                what she did before Rally, what drew her to build a community
                brand, and what she&apos;s most passionate about today.
              </p>
              <p>
                [Placeholder] Whether it&apos;s coaching a first-timer through their
                first padel session or hosting a sunset social, Holly is
                usually the first person you&apos;ll meet at a Rally event — and the
                one making sure you leave with someone&apos;s number saved in your
                phone.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 pt-8 hairline">
              <p className="eyebrow mb-3">In her words</p>
              <p className="font-display text-xl italic leading-snug max-w-lg">
                &ldquo;I&apos;m not trying to build the biggest fitness brand — I&apos;m
                trying to build the community I wanted to be part of
                myself.&rdquo;
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
