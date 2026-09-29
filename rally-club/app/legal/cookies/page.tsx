import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Cookie Policy | The Rally Club",
  description:
    "Learn how The Rally Club uses cookies and similar technologies on its website.",
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy">
      <p>
        <strong>Last updated: 29 September 2026</strong>
      </p>

      <p>
        This Cookie Policy explains how The Rally Club ("The Rally Club",
        "we", "us" or "our") uses cookies and similar technologies when you
        visit our website.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files that are stored on your device when you
        visit a website. They can help websites function correctly, remember
        preferences, understand how visitors use the website and, depending on
        the technology used, support additional functionality.
      </p>

      <h2>2. How we use cookies</h2>
      <p>
        The Rally Club may use cookies and similar technologies for the
        following purposes:
      </p>

      <h3>Strictly necessary cookies</h3>
      <p>
        These cookies are required for the website to operate properly. They
        may be used for purposes such as:
      </p>

      <ul>
        <li>Website security</li>
        <li>Session management</li>
        <li>Booking functionality</li>
        <li>Payment functionality</li>
        <li>Remembering essential preferences</li>
        <li>Preventing fraudulent activity</li>
      </ul>

      <p>
        These cookies are generally necessary for the website to function and
        do not require consent where they are genuinely essential.
      </p>

      <h3>Analytics cookies</h3>
      <p>
        If we use analytics cookies, they may help us understand how visitors
        interact with our website, including which pages are visited, how
        visitors navigate the website and how the website performs.
      </p>

      <p>
        Where required by law, we will obtain consent before using
        non-essential analytics cookies.
      </p>

      <h3>Functional cookies</h3>
      <p>
        Functional cookies may allow the website to remember choices and
        preferences made by visitors.
      </p>

      <p>
        Where these cookies are not strictly necessary, we may request your
        consent before using them.
      </p>

      <h3>Marketing and advertising cookies</h3>
      <p>
        If The Rally Club uses marketing, advertising or social-media tracking
        technologies, these may be used to measure promotional campaigns or
        understand interactions with promotional content.
      </p>

      <p>
        Non-essential marketing cookies will only be used where the required
        consent has been obtained.
      </p>

      <h2>3. Third-party cookies</h2>
      <p>
        Some features of our website may be provided by third-party services.
        These may include payment providers, ticketing platforms, analytics
        providers, social media platforms and embedded content providers.
      </p>

      <p>
        These third parties may use cookies or similar technologies in
        accordance with their own privacy policies.
      </p>

      <h2>4. Cookie consent</h2>
      <p>
        Where required by applicable law, we will ask for your consent before
        placing non-essential cookies or using similar technologies on your
        device.
      </p>

      <p>
        You may choose whether to accept or reject non-essential cookies
        through our cookie consent mechanism where one is provided.
      </p>

      <p>
        You may also change or withdraw your cookie preferences where the
        website provides this functionality.
      </p>

      <h2>5. Managing cookies through your browser</h2>
      <p>
        Most web browsers allow you to control or delete cookies through their
        settings. You can generally delete existing cookies, block cookies or
        block third-party cookies.
      </p>

      <p>
        Please note that blocking certain cookies may affect the functionality
        of our website.
      </p>

      <h2>6. Current website cookies</h2>
      <p>
        The Rally Club will keep this policy updated if additional
        non-essential cookies or tracking technologies are introduced.
      </p>

      <p>
        If the website introduces analytics, advertising, social-media tracking
        or other non-essential technologies, the appropriate consent mechanism
        will be implemented where required.
      </p>

      <h2>7. Changes to this Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes
        to our website, services, technologies or legal requirements.
      </p>

      <p>
        Any updates will be published on this page together with the relevant
        updated date.
      </p>

      <h2>8. Contact us</h2>
      <p>
        If you have any questions about our use of cookies, please contact The
        Rally Club using the contact details provided on our website.
      </p>

      <p>
        <strong>The Rally Club</strong>
        <br />
        Email: [INSERT EMAIL ADDRESS]
        <br />
        Website: [INSERT WEBSITE URL]
      </p>
    </LegalLayout>
  );
}
