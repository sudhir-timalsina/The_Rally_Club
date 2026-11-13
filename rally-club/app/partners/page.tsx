import type { Metadata } from "next";
import { ArrowRight, Building2, Coffee, Dumbbell, PartyPopper, ShoppingBag, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";
import { PartnerForm } from "@/components/partner-form";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

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
      <PageHero
        eyebrow="Partner with Rally"
        title="Let’s build something together"
        description="Rally works with instructors, venues, and brands who share our values — movement, community, and a genuinely warm experience for women. If that’s you, we’d love to talk."
        image={{
          src: "/images/crop_coffee_plant_flatlay.jpg",
          alt: "Rally Club branded notebook and coffee flatlay",
        }}
      >
        <Button asChild size="lg">
          <a href="#enquiry">
            Send an enquiry <ArrowRight size={16} />
          </a>
        </Button>
      </PageHero>

      <section className="hairline bg-bone/50">
        <div className="container-edit py-16 sm:py-24">
          <SectionHeading
            eyebrow="Who we collaborate with"
            title="Types of collaboration we’re open to"
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TYPES.map((type, i) => (
              <Reveal key={type.label} delay={(i % 3) * 0.07}>
                <div className="h-full rounded-sm border border-line bg-cream p-7 transition duration-500 hover:-translate-y-1 hover:shadow-lifted">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-blush text-chocolate-soft">
                    <type.icon size={18} strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-2 font-display text-xl">{type.label}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-chocolate/65">{type.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 py-16 sm:py-24">
        <div className="container-edit grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-4">Get in touch</p>
              <h2 className="text-display-sm">Send us an enquiry</h2>
              <p className="mt-4 max-w-xs leading-relaxed text-chocolate/65">
                Tell us a little about your brand and what you have in mind — we read every message.
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-6 inline-block text-sm link-underline pb-0.5"
              >
                Or email {siteConfig.contact.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-sm border border-line bg-bone p-6 sm:p-10">
              <PartnerForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
