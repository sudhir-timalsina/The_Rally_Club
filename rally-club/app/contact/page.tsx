import type { Metadata } from "next";
import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Rally Club — general enquiries, Instagram, email and WhatsApp.",
};

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    external: false,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: siteConfig.contact.instagramHandle,
    href: siteConfig.contact.instagramUrl,
    external: true,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp community",
    value: "Join the Rally Community",
    href: siteConfig.contact.whatsappUrl,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say hello"
        description="Questions about an event, the community, or anything else — we’d love to hear from you."
      />

      <section className="pb-20 sm:pb-28">
        <div className="container-edit grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-4 lg:col-span-4">
            {CONTACT_CARDS.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.08}>
                <a
                  href={card.href}
                  {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-sm border border-line bg-bone p-5 transition duration-500 hover:-translate-y-1 hover:shadow-lifted"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-chocolate-soft">
                    <card.icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-label text-taupe-dark">
                      {card.label}
                    </span>
                    <span className="mt-1 block truncate text-[0.95rem]">{card.value}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-taupe-dark transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:col-span-8">
            <div className="rounded-sm border border-line bg-bone p-6 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
