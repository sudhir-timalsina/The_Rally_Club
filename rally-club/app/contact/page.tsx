import type { Metadata } from "next";
import { Mail, Instagram, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Rally Club — general enquiries, Instagram, email and WhatsApp.",
};

export default function ContactPage() {
  return (
    <section className="pt-14 pb-24 sm:pt-20">
      <div className="container-edit grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow mb-5">Contact</p>
            <h1 className="text-display-lg max-w-sm">Say hello</h1>
            <p className="mt-6 text-chocolate/70 max-w-xs leading-relaxed">
              Questions about an event, the community, or anything else —
              we&apos;d love to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col gap-5">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm text-chocolate/80 hover:text-chocolate"
              >
                <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </span>
                {siteConfig.contact.email}
              </a>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-chocolate/80 hover:text-chocolate"
              >
                <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center shrink-0">
                  <Instagram size={16} />
                </span>
                {siteConfig.contact.instagramHandle}
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-chocolate/80 hover:text-chocolate"
              >
                <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center shrink-0">
                  <MessageCircle size={16} />
                </span>
                Rally Community on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.15}>
            <div className="bg-bone border border-line rounded-sm p-6 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
