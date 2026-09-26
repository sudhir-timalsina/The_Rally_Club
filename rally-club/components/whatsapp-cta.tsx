import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function WhatsAppCta({
  variant = "banner",
  className,
}: {
  variant?: "banner" | "inline";
  className?: string;
}) {
  if (variant === "inline") {
    return (
      <Button asChild variant="whatsapp" className={className}>
        <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={17} /> Join the WhatsApp Community
        </a>
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "rounded-sm bg-chocolate text-cream px-6 py-10 sm:px-12 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-6",
        className
      )}
    >
      <div className="text-center sm:text-left">
        <p className="eyebrow text-cream/55 mb-3">Rally Community</p>
        <h3 className="font-display text-2xl sm:text-3xl max-w-md">
          Come alone. Leave with people.
        </h3>
        <p className="text-cream/70 mt-2 max-w-sm text-sm">
          Join the WhatsApp community for event announcements, chat, and a warm welcome before you even arrive.
        </p>
      </div>
      <Button asChild variant="pink" size="lg" className="shrink-0">
        <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} /> Join the Community
        </a>
      </Button>
    </div>
  );
}
