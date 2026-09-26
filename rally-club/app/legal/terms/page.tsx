import type { Metadata } from "next";
import { LegalLayout, PlaceholderNotice } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <PlaceholderNotice />
      <p>
        This page will set out the terms of using The Rally Club website and
        booking onto events — including booking and cancellation terms,
        payment terms (once a payment provider is connected), liability for
        physical activities such as padel and pilates, and acceptable use of
        the WhatsApp community.
      </p>
      <h2>What we&apos;ll cover</h2>
      <p>
        Event booking and cancellation policy; participant conduct at events
        and in the community; liability and assumption of risk for physical
        activity; intellectual property in site content; governing law
        (England and Wales).
      </p>
    </LegalLayout>
  );
}
