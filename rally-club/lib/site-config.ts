/**
 * Central place for brand-wide constants. Replace the PLACEHOLDER values
 * with the client's real details before launch — see README "Before you
 * launch" checklist.
 */
export const siteConfig = {
  name: "The Rally Club",
  tagline: "Move. Sweat. Play.",
  description:
    "A women's community for padel, pilates, wellness and social experiences in Cheshire and beyond. Play, connect, belong.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://therallyclubuk.com",
  founder: {
    name: "Holly Storey",
    role: "Founder, The Rally Club",
  },
  contact: {
    email: "holly@therallyclubuk.com",
    instagramHandle: "@therallyclub_uk",
    instagramUrl: "https://instagram.com/therallyclub_uk",
    // PLACEHOLDER — replace with the real WhatsApp community invite link
    whatsappUrl: "https://chat.whatsapp.com/PLACEHOLDER-REPLACE-WITH-REAL-INVITE-LINK",
    area: "Cheshire and beyond",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Community", href: "/community" },
    { label: "Founder", href: "/founder" },
    { label: "Partners", href: "/partners" },
    { label: "FAQ", href: "/faq" },
  ],
  footerLinks: {
    explore: [
      { label: "About Rally", href: "/about" },
      { label: "Why I Started Rally", href: "/why-we-started" },
      { label: "Meet the Founder", href: "/founder" },
      { label: "Events", href: "/events" },
      { label: "Community", href: "/community" },
    ],
    company: [
      { label: "Partner with us", href: "/partners" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Terms & Conditions", href: "/legal/terms" },
    ],
  },
  categories: [
    { key: "padel", label: "Padel" },
    { key: "pilates", label: "Pilates" },
    { key: "running", label: "Running" },
    { key: "social", label: "Social" },
    { key: "wellness", label: "Wellness" },
    { key: "fitness", label: "Fitness" },
    { key: "special", label: "Special Events" },
  ],
} as const;
