import type { Metadata } from "next";
import { LegalLayout, PlaceholderNotice } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <PlaceholderNotice />
      <p>
        This page will explain what personal data The Rally Club collects
        (such as names, emails and phone numbers submitted via contact,
        booking and partnership forms), how it is used, how long it is
        retained, and the rights UK/EU visitors have under UK GDPR — including
        the right to access, correct, or delete their data.
      </p>
      <h2>What we&apos;ll cover</h2>
      <p>
        Data collected via forms and Supabase; use of cookies and analytics
        (see the Cookie Policy); third parties data may be shared with
        (e.g. Resend for email, Supabase for storage); data retention;
        your rights; how to contact us about your data.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to the email address listed on
        our Contact page once finalised.
      </p>
    </LegalLayout>
  );
}
