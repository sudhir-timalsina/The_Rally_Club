import type { Metadata } from "next";
import Image from "next/image";
import { Dumbbell, Building2, Sparkles, ShoppingBag, Coffee, PartyPopper } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PartnerForm } from "@/components/partner-form";

export const metadata: Metadata = {
  title: "Partner with Rally",
  description:
    "Collaborate with The Rally Club — for instructors, venues, wellness and lifestyle brands, cafés and event partners across Cheshire.",
};

const PARTNER_TYPES = [
  { icon: Dumbbell, label: "Instructors", body: "Pilates, fitness and movement instructors looking to reach our community." },
  { icon: Building2, label: "Venues", body: "Padel courts, studios and spaces that fit the Rally atmosphere." },
  { icon: Sparkles, label: "Wellness brands", body: "Brands aligned with movement, recovery and wellbeing." },
  { icon: ShoppingBag, label: "Lifestyle brands", body: "Fashion and lifestyle brands who want to reach engaged, active women." },
  { icon: Coffee, label: "Cafés & restaurants", body: "Venues for the coffee, brunch and social side of Rally." },
  { icon: PartyPopper, label: "Event partners", body: "Brands wanting to co-host or sponsor a Rally event." },
];

export default function PartnersPage() {
  return (
    <>
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="container-edit grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <p className="eyebrow mb-5">Partner with Rally</p>
            <h1 className="text-display-lg max-w-lg">
              Let&apos;s build something together
            </h1>
            <p className="mt-7 text-lg text-chocolate/70 max-w-md leading-relaxed">
              Rally works with instructors, venues, and brands who share our
              values — movement, community, and a genuinely warm experience for
              women. If that&apos;s you, we&apos;d love to talk.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="/images/crop_coffee_plant_flatlay.jpg"
              alt="Rally Club branded notebook and coffee flatlay"
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
            eyebrow="Who we collaborate with"
            title="Types of collaboration we're open to"
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {PARTNER_TYPES.map((type, i) => (
              <Reveal key={type.label} delay={i * 0.06}>
                <div className="w-11 h-11 rounded-full bg-beige flex items-center justify-center mb-4 text-chocolate-soft">
                  <type.icon size={18} strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-lg mb-2">{type.label}</h3>
                <p className="text-sm text-chocolate/65 leading-relaxed max-w-xs">{type.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-edit max-w-2xl">
          <Reveal>
            <h2 className="text-display-sm mb-3">Send us an enquiry</h2>
            <p className="text-chocolate/65 mb-10 max-w-md">
              Tell us a little about your brand and what you have in mind — we
              read every message.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <PartnerForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
