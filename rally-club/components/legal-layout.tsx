import { Reveal } from "@/components/reveal";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-14 pb-24 sm:pt-20">
      <div className="container-edit max-w-2xl">
        <Reveal>
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-display-lg">{title}</h1>
          {updated && <p className="mt-3 text-sm text-chocolate/50">Last updated: {updated}</p>}
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 prose-legal space-y-6 text-chocolate/75 leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-chocolate [&_h2]:mt-10 [&_h2]:mb-3">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PlaceholderNotice() {
  return (
    <div className="rounded-sm border border-dashed border-line bg-bone px-5 py-4 text-sm text-chocolate/70">
      <strong className="text-chocolate">Placeholder content.</strong> Replace
      this page with final legal copy prepared for The Rally Club before
      launch — ideally reviewed by a solicitor familiar with UK GDPR and
      e-commerce/consumer regulations.
    </div>
  );
}
