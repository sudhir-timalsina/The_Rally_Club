import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { Review } from "@/types";

export function ReviewsStrip({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {reviews.slice(0, 3).map((review, i) => (
        <Reveal key={review.id} delay={i * 0.08}>
          <div className="border border-line rounded-sm bg-bone p-6 h-full flex flex-col">
            <div className="flex items-center gap-1 mb-3 text-blush-deep">
              {Array.from({ length: review.rating }).map((_, j) => (
                <Star key={j} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-sm text-chocolate/80 leading-relaxed italic flex-1">
              &ldquo;{review.quote}&rdquo;
            </p>
            <p className="text-xs text-chocolate/50 mt-4">
              {review.author_name}
              {review.context ? ` — ${review.context}` : ""}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
