import type { Metadata } from "next";
import { LegalLayout, PlaceholderNotice } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy">
      <PlaceholderNotice />
      <p>
        This page will explain which cookies The Rally Club website uses —
        for example, essential cookies for site functionality and admin
        login, and any analytics cookies added later (such as a
        privacy-friendly analytics tool).
      </p>
      <h2>Cookie consent</h2>
      <p>
        If analytics or marketing cookies are added, a cookie consent banner
        should be implemented before they load, in line with UK PECR/GDPR
        requirements. The current build does not load any non-essential
        cookies.
      </p>
    </LegalLayout>
  );
}
