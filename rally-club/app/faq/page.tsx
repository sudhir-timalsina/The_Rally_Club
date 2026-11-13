import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getPublishedFaqs } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about joining The Rally Club — coming alone, fitness levels, booking, venues and the community.",
};

// Fallback content shown until FAQs are added in Supabase / the admin panel.
const FALLBACK_FAQS = [
  {
    id: "f1",
    question: "Who is Rally for?",
    answer:
      "Rally is for any woman who wants to move more, meet new people, and feel part of a community — whatever your fitness level or experience.",
  },
  {
    id: "f2",
    question: "Can I come alone?",
    answer:
      "Yes — most of our members do! Coming alone is completely normal at Rally, and it's genuinely one of the best ways to meet people.",
  },
  {
    id: "f3",
    question: "Do I need to be fit to join?",
    answer:
      "Not at all. Rally events are designed to be welcoming for all fitness levels, whatever pace works for you.",
  },
  {
    id: "f4",
    question: "Do I need experience?",
    answer:
      "No experience needed — our sessions are beginner-friendly and instructors are on hand to help.",
  },
  {
    id: "f5",
    question: "Where are events held?",
    answer:
      "Our events currently run across Cheshire, at a range of partner venues. Each event page lists the exact venue and address.",
  },
  {
    id: "f6",
    question: "What happens at an event?",
    answer:
      "It depends on the event, but every one includes real time to connect with other members, not just the activity itself.",
  },
  {
    id: "f7",
    question: "How do I book?",
    answer:
      "Browse the Events page, open the one you like, and follow the booking link or form. Spaces are limited.",
  },
  {
    id: "f8",
    question: "How do I join the community?",
    answer: "Head to the Community page and tap the WhatsApp link to join.",
  },
];

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();
  const items = faqs.length > 0 ? faqs : FALLBACK_FAQS;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        description="Everything you might want to know before your first Rally — from coming alone to how booking works."
        image={{
          src: "/images/crop_women_coffee_table.jpg",
          alt: "Rally Club members chatting over coffee",
        }}
      />

      <section className="pb-20 sm:pb-28">
        <div className="container-edit grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="order-1 lg:order-2 lg:col-span-8">
            <Accordion type="single" collapsible defaultValue={items[0]?.id} className="space-y-3">
              {items.map((faq, i) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>
                    <span className="font-body text-xs tracking-label text-taupe-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal delay={0.1} className="order-2 lg:order-1 lg:col-span-4">
            <div className="rounded-sm bg-chocolate p-7 text-cream sm:p-9 lg:sticky lg:top-28">
              <p className="eyebrow mb-3 text-cream/55">Still curious?</p>
              <h2 className="font-display text-2xl leading-snug">
                Can’t find what you’re looking for?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                Send us a message or pop into the WhatsApp community — we’re
                happy to help with anything before your first event.
              </p>
              <Button asChild variant="pink" className="mt-6 w-full">
                <Link href="/contact">Get in touch</Link>
              </Button>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-cream"
              >
                <Mail size={15} /> {siteConfig.contact.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hairline">
        <div className="container-edit py-16 sm:py-20">
          <Reveal>
            <WhatsAppCta />
          </Reveal>
        </div>
      </section>
    </>
  );
}
