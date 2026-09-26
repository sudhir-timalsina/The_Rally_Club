import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getPublishedFaqs } from "@/lib/data";

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

      <section className="pt-14 pb-10 sm:pt-20">
        <div className="container-edit">
          <Reveal>
            <p className="eyebrow mb-5">FAQ</p>
            <h1 className="text-display-lg max-w-xl">Questions, answered</h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-edit max-w-2xl">
          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {items.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
