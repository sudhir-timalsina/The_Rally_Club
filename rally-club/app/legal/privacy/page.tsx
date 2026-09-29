import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Rally Club collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  const email = siteConfig.contact.email;

  return (
    <LegalLayout title="Privacy Policy" updated="29 September 2026">
      <p>
        The Rally Club (&quot;The Rally Club&quot;, &quot;we&quot;, &quot;us&quot;
        or &quot;our&quot;) respects your privacy and is committed to protecting
        your personal information.
      </p>
      <p>
        This Privacy Policy explains how we collect, use, store and protect your
        personal information when you visit our website, book an event, contact
        us or otherwise interact with The Rally Club. It is written with UK GDPR
        and the Data Protection Act 2018 in mind.
      </p>

      <h2>1. Who we are</h2>
      <p>
        The Rally Club is a women&apos;s community organising movement, fitness,
        wellness and social events. We are the controller of the personal
        information described in this policy. For any privacy questions or
        requests, contact us at <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>2. Information we collect</h2>

      <h3>Information you give us</h3>
      <p>
        When you book an event or submit our contact or partnership forms, we
        collect information such as:
      </p>
      <ul>
        <li>Your name, email address and telephone number</li>
        <li>Booking details, including the event and number of tickets</li>
        <li>
          Any notes you add, such as access needs or injuries (please share only
          what you are comfortable with)
        </li>
        <li>Ticket transfer details, such as a new attendee&apos;s name</li>
        <li>
          Company name, business type and enquiry details if you contact us about
          a partnership
        </li>
        <li>The content of messages you send us</li>
      </ul>

      <h3>Payment information</h3>
      <p>
        Payments are processed by our third-party payment provider, Stripe. We
        do not receive or store your full card number or security code. Stripe
        handles your payment details under its own privacy policy and security
        procedures. We receive confirmation of payment and a payment reference
        so we can manage your booking and any refund.
      </p>

      <h3>Information collected automatically</h3>
      <p>
        When you visit our website, some technical information may be collected
        automatically, such as your IP address, browser type, device type,
        operating system, pages visited and referring website. See our{" "}
        <a href="/legal/cookies">Cookie Policy</a> for more.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To process and manage bookings and issue tickets and confirmations</li>
        <li>
          To contact you about your event, including changes or cancellations
        </li>
        <li>To process refunds and ticket transfers</li>
        <li>To respond to enquiries and partnership requests</li>
        <li>To run and look after our community</li>
        <li>To improve our website, services and events</li>
        <li>To keep our website secure and prevent fraud or misuse</li>
        <li>To keep business and financial records</li>
        <li>To comply with legal and regulatory obligations</li>
        <li>
          To send marketing communications, where permitted by law and, where
          required, with your consent
        </li>
      </ul>

      <h2>4. Lawful bases for processing</h2>
      <ul>
        <li>
          <strong>Contract:</strong> where processing is necessary to provide a
          booking or ticket you have requested.
        </li>
        <li>
          <strong>Legal obligation:</strong> where we must keep or disclose
          information to comply with the law, such as accounting records.
        </li>
        <li>
          <strong>Legitimate interests:</strong> for running our business,
          responding to enquiries, keeping the website secure and improving our
          services, where these interests are not overridden by your rights.
        </li>
        <li>
          <strong>Consent:</strong> where we ask for it, for example for certain
          marketing or non-essential cookies. You can withdraw consent at any
          time.
        </li>
      </ul>
      <p>
        If you tell us about health-related information (for example an injury),
        we use it only to help us look after you at the event, on the basis of
        your consent.
      </p>

      <h2>5. Marketing</h2>
      <p>
        Where permitted, we may tell you about upcoming events and community
        news. Where consent is required, we will only do so after you agree. You
        can opt out at any time using the unsubscribe link in a message or by
        emailing us. Service messages about your booking are not marketing and
        will still be sent.
      </p>

      <h2>6. Who we share your information with</h2>
      <p>
        We share personal information only where necessary to run The Rally
        Club. Our service providers include:
      </p>
      <ul>
        <li>Stripe, for payment processing</li>
        <li>Supabase, for database and file storage</li>
        <li>Resend, for sending emails such as booking confirmations</li>
        <li>Our website hosting and technology providers</li>
        <li>
          Event venues and partners, such as Park View Padel, where reasonably
          needed to run an event (for example an attendee list)
        </li>
        <li>Professional advisers, such as accountants and insurers</li>
        <li>
          Regulators, courts or law-enforcement authorities where legally
          required
        </li>
      </ul>
      <p>
        We do not sell your personal information. Where providers process data
        on our behalf, we take reasonable steps to make sure appropriate privacy
        and security arrangements are in place.
      </p>

      <h2>7. International transfers</h2>
      <p>
        Some of our providers may process information outside the United
        Kingdom. Where this happens, we take steps to make sure the transfer
        follows applicable data protection requirements, for example by relying
        on approved safeguards.
      </p>

      <h2>8. How long we keep your information</h2>
      <p>
        We keep personal information only for as long as reasonably necessary
        for the purposes it was collected, including to provide our services,
        manage bookings, resolve disputes, prevent fraud and meet legal,
        accounting or regulatory requirements. When it is no longer needed, we
        take reasonable steps to delete or anonymise it.
      </p>

      <h2>9. Data security</h2>
      <p>
        We take reasonable technical and organisational measures to protect
        personal information against unauthorised access, loss, misuse,
        alteration or disclosure. However, no method of transmission or storage
        over the internet is completely secure.
      </p>

      <h2>10. Your rights</h2>
      <p>Depending on the circumstances, you have the right to:</p>
      <ul>
        <li>Request access to the personal information we hold about you</li>
        <li>Request correction of inaccurate or incomplete information</li>
        <li>Request deletion of your personal information</li>
        <li>Request restriction of our processing</li>
        <li>Object to certain processing</li>
        <li>Request data portability</li>
        <li>Withdraw consent where processing is based on consent</li>
      </ul>
      <p>
        Some rights are subject to legal conditions and exceptions. To exercise
        any of them, email <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>11. Complaints</h2>
      <p>
        If you have a concern about how we handle your information, please
        contact us first so we can look into it. You also have the right to
        complain to the UK Information Commissioner&apos;s Office (ICO) at{" "}
        <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer">
          ico.org.uk
        </a>
        .
      </p>

      <h2>12. Children&apos;s privacy</h2>
      <p>
        Our website and events are for adults aged 18 and over unless an event
        page says otherwise. We do not knowingly collect personal information
        from children. If you believe a child has given us their information,
        please contact us and we will delete it.
      </p>

      <h2>13. Third-party websites</h2>
      <p>
        Our website may link to third-party sites such as Instagram, WhatsApp,
        venues and partner organisations. We are not responsible for their
        privacy practices or content, so please read their policies before
        sharing personal information.
      </p>

      <h2>14. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The latest version will
        always be published on this page with the updated date.
      </p>

      <h2>15. Contact us</h2>
      <p>
        <strong>The Rally Club</strong>
        <br />
        Email: <a href={`mailto:${email}`}>{email}</a>
        <br />
        Website: <a href={siteConfig.url}>{siteConfig.url}</a>
      </p>
    </LegalLayout>
  );
}
