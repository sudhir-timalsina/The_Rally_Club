import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { LogoBadge } from "@/components/logo";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-chocolate text-cream">
      <div className="container-edit pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <LogoBadge size={48} />
              <div className="font-display text-xl">The Rally Club</div>
            </div>
            <p className="text-cream/65 text-sm max-w-[30ch] mb-6">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Rally Club on Instagram"
                className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center hover:bg-cream/10 transition-colors"
              >
                <Instagram size={17} />
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join The Rally Club on WhatsApp"
                className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center hover:bg-cream/10 transition-colors"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                aria-label="Email The Rally Club"
                className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center hover:bg-cream/10 transition-colors"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          <FooterCol title="Explore" links={siteConfig.footerLinks.explore} />
          <FooterCol title="Rally" links={siteConfig.footerLinks.company} />
          <FooterCol title="Legal" links={siteConfig.footerLinks.legal} />
        </div>

        <div className="hairline border-cream/15 mt-14 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Codeallo Education and Technologies for The Rally Club. All rights reserved.</p>
          <p>{siteConfig.contact.area}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="eyebrow text-cream/50 mb-4">{title}</div>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-cream/75 hover:text-cream transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
