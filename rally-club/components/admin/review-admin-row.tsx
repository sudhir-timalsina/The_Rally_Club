"use client";

import { useTransition } from "react";
import { Trash2, Eye, EyeOff, Star } from "lucide-react";
import { toggleReviewPublished, deleteReview } from "@/lib/actions/admin-moderation";
import type { Review } from "@/types";
import { cn } from "@/lib/utils";

export function ReviewAdminRow({ review }: { review: Review }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className={cn("border rounded-sm bg-bone p-5", review.is_published ? "border-line" : "border-dashed border-taupe")}>
      <div className="flex items-center gap-1 mb-2 text-taupe-dark">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="text-sm text-chocolate/80 italic">&ldquo;{review.quote}&rdquo;</p>
      <p className="text-xs text-chocolate/50 mt-2">
        {review.author_name}
        {review.context ? ` · ${review.context}` : ""}
      </p>
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => startTransition(() => toggleReviewPublished(review.id, !review.is_published))}
          disabled={pending}
          className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm border border-line hover:bg-beige/60"
        >
          {review.is_published ? <EyeOff size={13} /> : <Eye size={13} />}
          {review.is_published ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={() => startTransition(() => deleteReview(review.id))}
          disabled={pending}
          className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm border border-line text-[#8a3b2e] hover:bg-beige/60 ml-auto"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  );
}
