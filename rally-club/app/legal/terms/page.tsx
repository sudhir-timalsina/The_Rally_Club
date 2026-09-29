import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of using The Rally Club website and booking onto events, including our refund and cancellation policy.",
};

export default function TermsPage() {
  const email = siteConfig.contact.email;

  return (
    <LegalLayout title="Terms & Conditions" updated="29 September 2026">
      <p>
        These Terms &amp; Conditions apply to your use of The Rally Club website
        and to any booking you make for a Rally Club event. By using the
        website or booking an event, you agree to these terms. If you do not
        agree, please do not book.
      </p>

      <h2>1. About us</h2>
      <p>
        The Rally Club (&quot;The Rally Club&quot;, &quot;we&quot;, &quot;us&quot;
        or &quot;our&quot;) is a women&apos;s community organising padel,
        pilates, wellness and social events in Cheshire and beyond. You can
        contact us at{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>2. Booking events</h2>
      <ul>
        <li>
          Bookings are made through our website. A booking is confirmed once
          payment has been successfully received (or, for free events, once you
          receive a booking confirmation).
        </li>
        <li>
          Spaces are limited and are allocated on a first-come, first-served
          basis. If an event sells out while your payment is being processed,
          you will be refunded in full.
        </li>
        <li>
          You must provide accurate name, email and contact details so we can
          reach you about the event.
        </li>
        <li>
          Your booking confirmation and QR code are personal to your booking.
          Please do not share them publicly.
        </li>
        <li>
          Unless an event page says otherwise, our events are for adults aged
          18 and over.
        </li>
      </ul>

      <h2>3. Prices and payment</h2>
      <p>
        Prices are shown in pounds sterling (GBP) on each event page. Payments
        are processed securely by our third-party payment provider, Stripe. We
        do not see or store your full card details.
      </p>

      <h2>4. Refund &amp; Cancellation Policy</h2>
      <ul>
        <li>
          Tickets can be cancelled for a full refund up to 48 hours before the
          event.
        </li>
        <li>
          Cancellations made within 48 hours of the event are non-refundable.
        </li>
        <li>
          If you can no longer attend within the 48-hour period, you are
          welcome to transfer your ticket to another person. Please let The
          Rally Club know the new attendee&apos;s name before the event.
        </li>
        <li>
          If The Rally Club or Park View Padel cancels the event, a full refund
          will be provided.
        </li>
        <li>
          The Rally Club reserves the right to make reasonable changes to the
          event programme, timings or activities where necessary.
        </li>
      </ul>
      <p>
        To cancel a booking or transfer a ticket, email{" "}
        <a href={`mailto:${email}`}>{email}</a> with your name and booking
        reference. Approved refunds are returned to the original payment method.
        The time it takes to appear in your account depends on your bank or card
        provider.
      </p>
      <p>
        Because our events take place on specific dates, the 14-day
        &quot;cooling-off&quot; period that applies to many online purchases
        does not apply to event bookings. Nothing in this policy affects your
        statutory rights.
      </p>

      <h2>5. Participant conduct</h2>
      <p>
        The Rally Club is a welcoming, inclusive space. We expect everyone at
        our events and in our WhatsApp community to be respectful, kind and
        considerate of others, and to follow any instructions from our team,
        instructors and venue staff. We may remove anyone whose behaviour is
        abusive, discriminatory, unsafe or disruptive, from an event or from the
        community, without a refund where appropriate.
      </p>

      <h2>6. Physical activity, health and risk</h2>
      <p>
        Our events include physical activities such as padel and pilates. By
        booking, you confirm that:
      </p>
      <ul>
        <li>
          you are in suitable health to take part, and you have taken medical
          advice if you have any health condition, injury or concern (including
          pregnancy) that might affect your participation;
        </li>
        <li>
          you understand that physical activity carries an inherent risk of
          injury, and you take part at your own risk;
        </li>
        <li>
          you will take part within your own limits and let an instructor or
          member of our team know if you feel unwell or unsafe; and
        </li>
        <li>
          you will follow venue rules and safety instructions, including those
          of Park View Padel and any other partner venue.
        </li>
      </ul>
      <p>
        Please tell us about anything we should know, such as injuries or access
        needs, using the notes field when booking or by emailing us beforehand.
      </p>

      <h2>7. Our liability</h2>
      <p>
        Nothing in these terms excludes or limits our liability for death or
        personal injury caused by our negligence, for fraud or fraudulent
        misrepresentation, or for anything else that cannot be excluded by law.
      </p>
      <p>
        Subject to that, we are not liable for loss or damage that was not
        reasonably foreseeable, for loss of or damage to personal belongings
        brought to an event, or for events outside our reasonable control. Some
        activities are run at third-party venues, and those venues have their
        own rules and responsibilities.
      </p>

      <h2>8. Photography and content</h2>
      <p>
        We may take photos and videos at our events for use on our website and
        social media. If you would prefer not to be photographed, please tell a
        member of the team at the event or email us beforehand.
      </p>

      <h2>9. WhatsApp community</h2>
      <p>
        Joining our WhatsApp community is optional and free. WhatsApp is
        operated by a third party and its own terms and privacy policy apply.
        Please keep conversations respectful, do not share other members&apos;
        personal details without permission, and do not use the group for
        unsolicited promotion. We may remove members who break these rules.
      </p>

      <h2>10. Website use and intellectual property</h2>
      <p>
        All content on this website, including text, photography, logos and
        design, belongs to The Rally Club or its licensors and is protected by
        copyright and other intellectual property rights. You may view and share
        links to our pages for personal, non-commercial use, but you may not
        copy, reproduce or use our content commercially without our written
        permission.
      </p>
      <p>
        You must not misuse the website, including by attempting to gain
        unauthorised access, interfering with its operation, or using it for
        unlawful purposes. We work to keep the website accurate and available
        but do not guarantee it will always be uninterrupted or error-free.
      </p>

      <h2>11. Privacy and cookies</h2>
      <p>
        How we handle your personal information is explained in our{" "}
        <a href="/legal/privacy">Privacy Policy</a> and{" "}
        <a href="/legal/cookies">Cookie Policy</a>.
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The version published on
        this page at the time you book is the one that applies to your booking.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of England and Wales, and the
        courts of England and Wales have jurisdiction over any dispute, without
        affecting any mandatory consumer rights you have in the country where
        you live.
      </p>

      <h2>14. Contact us</h2>
      <p>
        Questions about these terms or your booking? Get in touch:
      </p>
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
