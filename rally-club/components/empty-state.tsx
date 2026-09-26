import type { LucideIcon } from "lucide-react";
import { CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyState({
  icon: Icon = CalendarX,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6 border border-dashed border-line rounded-sm bg-bone/60">
      <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center mb-5 text-chocolate-soft">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-2xl mb-2">{title}</h3>
      <p className="text-chocolate/65 max-w-sm text-[0.95rem] mb-6">{description}</p>
      {ctaLabel && ctaHref && (
        <Button asChild variant="secondary" size="sm">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      )}
    </div>
  );
}
