import type { Metadata } from "next";
import { LegalLayout, PlaceholderNotice } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      # Privacy Policy

**Last updated: 29 September 2026**

The Rally Club ("The Rally Club", "we", "us" or "our") respects your privacy and is committed to protecting your personal information.

This Privacy Policy explains how we collect, use, store and protect your personal information when you visit our website, purchase tickets, contact us, participate in our events or otherwise interact with The Rally Club.

By using our website or providing us with your personal information, you acknowledge that you have read and understood this Privacy Policy.

## 1. Who We Are

The Rally Club is an event and community platform focused on movement, fitness, social connection and community experiences.

For privacy-related questions or requests, you can contact us using the contact details provided on our website.

## 2. Information We Collect

Depending on how you interact with The Rally Club, we may collect:

### Information you provide directly

This may include:

* Full name
* Email address
* Telephone number
* Billing or booking information
* Event and ticket details
* Information you provide when contacting us
* Information provided when joining or participating in our community
* Information relating to ticket transfers
* Any other information you voluntarily provide to us

### Payment information

Where you purchase a ticket or other service online, payment may be processed by a third-party payment provider such as Stripe.

We do not normally receive or store your complete payment card number, security code or other sensitive payment credentials. Payment information is handled by the relevant payment provider in accordance with its own privacy policy and security procedures.

### Information collected automatically

When you visit our website, certain technical information may be collected automatically, including:

* IP address
* Browser type and version
* Device type
* Operating system
* Pages visited
* Approximate location derived from technical information
* Referring website
* Website usage information
* Cookie and similar technology information

The information collected will depend on the technologies used on our website.

## 3. How We Use Your Information

We may use your personal information to:

* Process and manage event bookings
* Provide tickets and booking confirmations
* Communicate with you about an event
* Contact you regarding changes, cancellations or important event information
* Process refunds and ticket transfers
* Respond to enquiries and customer support requests
* Manage our community
* Improve our website, services and events
* Maintain website security
* Prevent fraud, misuse or unauthorised activity
* Keep appropriate business and financial records
* Comply with legal and regulatory obligations
* Send marketing communications where permitted and where required, with your consent

We will only use personal information for purposes that are relevant and appropriate to our relationship with you.

## 4. Lawful Bases for Processing

Where applicable, we rely on one or more lawful bases for processing personal information, including:

* **Contract:** where processing is necessary to provide a ticket, booking or service you have requested.
* **Legal obligation:** where we are required to retain or disclose information to comply with applicable law.
* **Legitimate interests:** where processing is necessary for purposes such as managing our business, improving services, maintaining security or communicating with existing customers, provided those interests are not overridden by your rights.
* **Consent:** where we ask for your consent, including where required for certain marketing or non-essential cookies.

You may withdraw consent where processing is based on consent.

## 5. Marketing Communications

Where permitted by law, we may send you information about upcoming events, community activities, offers or other The Rally Club updates.

Where consent is required, we will only send such communications after obtaining the appropriate consent.

You can unsubscribe from marketing communications at any time by using the unsubscribe option in the relevant communication or by contacting us.

## 6. Sharing Your Information

We may share personal information with trusted third parties where necessary to operate The Rally Club and provide our services.

These may include:

* Payment providers such as Stripe
* Ticketing and booking platforms
* Website hosting and technology providers
* Email and communication service providers
* Event venues and event partners where reasonably necessary to organise an event
* Professional advisers
* Government, regulatory or law-enforcement authorities where legally required

We do not sell your personal information to third parties.

Where third-party service providers process personal information on our behalf, we take reasonable steps to ensure that appropriate privacy and security arrangements are in place.

## 7. Payment Providers

Payments may be processed by third-party payment providers.

When you make a payment, your information may be processed directly by the relevant payment provider. Their own privacy policy and terms will also apply.

We recommend reviewing the privacy information provided by the payment provider when making a purchase.

## 8. International Transfers

Some of our service providers may process information outside the United Kingdom.

Where personal information is transferred internationally, we will take appropriate steps to ensure that the transfer is carried out in accordance with applicable data protection requirements.

## 9. How Long We Keep Your Information

We keep personal information only for as long as reasonably necessary for the purposes for which it was collected, including where necessary to:

* Provide our services
* Manage bookings and customer relationships
* Maintain appropriate business records
* Resolve disputes
* Prevent fraud
* Comply with legal, accounting or regulatory obligations

When information is no longer required, we will take reasonable steps to securely delete or anonymise it.

## 10. Data Security

We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, misuse, alteration or disclosure.

However, no method of transmission or storage over the internet can be guaranteed to be completely secure.

## 11. Your Rights

Depending on the circumstances and applicable law, you may have rights including:

* The right to request access to personal information we hold about you
* The right to request correction of inaccurate or incomplete information
* The right to request deletion of your personal information
* The right to request restriction of processing
* The right to object to certain processing
* The right to data portability
* The right to withdraw consent where processing is based on consent

Some rights are subject to legal conditions and exceptions.

To exercise your rights, please contact The Rally Club using the contact details on our website.

## 12. Complaints

If you have concerns about how we handle your personal information, please contact us first so that we can investigate your concern.

You also have the right to complain to the UK's Information Commissioner's Office (ICO) if you believe your data protection rights have been infringed.

You can find information about the ICO at:

https://ico.org.uk/

## 13. Children's Privacy

Our website and events are not generally intended for children unless an event specifically states otherwise.

Where an event is intended to involve under-18s, additional requirements, permissions or safeguarding arrangements may apply.

## 14. Third-Party Websites

Our website may contain links to third-party websites, including social media platforms, ticketing services, venues or partner organisations.

We are not responsible for the privacy practices or content of third-party websites. We recommend reviewing their privacy policies before providing personal information.

## 15. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes to our services, technology, legal requirements or business practices.

The latest version will always be published on our website with the updated date.

## 16. Contact Us

If you have any questions about this Privacy Policy or how we handle your personal information, please contact The Rally Club using the contact details provided on our website.

**The Rally Club**
Email: [INSERT EMAIL ADDRESS]
Website: [INSERT WEBSITE URL]

**Last updated: 29 September 2026**

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
