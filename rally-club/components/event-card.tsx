import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";
import type { RallyEvent } from "@/types";
import { EVENT_CATEGORY_LABELS } from "@/types";
import { formatEventDate, formatEventTime, formatGBP, cn } from "@/lib/utils";

export function EventCard({ event, priority = false }: { event: RallyEvent; priority?: boolean }) {
  const soldOut = event.status === "sold_out";
  const full =
    event.capacity !== null && event.spots_taken >= (event.capacity ?? Infinity);

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block"
      aria-label={`${event.title} — ${formatEventDate(event.event_date)}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-beige">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-taupe-dark">
            <CategoryIcon category={event.category} size={32} />
          </div>
        )}

        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-cream/90 backdrop-blur-sm rounded-pill px-3 py-1.5 text-[0.68rem] uppercase tracking-label text-chocolate">
          <CategoryIcon category={event.category} size={12} />
          {EVENT_CATEGORY_LABELS[event.category]}
        </div>

        {(soldOut || full) && (
          <div className="absolute top-3 right-3 bg-chocolate text-cream rounded-pill px-3 py-1.5 text-[0.68rem] uppercase tracking-label">
            Sold Out
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-taupe-dark tracking-wideish uppercase mb-1.5">
            {formatEventDate(event.event_date)} · {formatEventTime(event.start_time)}
          </p>
          <h3 className="font-display text-xl leading-snug group-hover:text-chocolate-soft transition-colors">
            {event.title}
          </h3>
          <p className="mt-1.5 flex items-center gap-1 text-sm text-chocolate/60">
            <MapPin size={13} /> {event.location_area}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <ArrowUpRight
            size={18}
            className="text-taupe-dark group-hover:text-chocolate group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
          <span className={cn("text-sm font-medium", event.price_pence === 0 && "text-chocolate-soft")}>
            {formatGBP(event.price_pence)}
          </span>
        </div>
      </div>
    </Link>
  );
}
