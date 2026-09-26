import { getAllReviewsAdmin } from "@/lib/admin-data";
import { ReviewAdminRow } from "@/components/admin/review-admin-row";
import { createReview } from "@/lib/actions/admin-moderation";
import { Label, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviewsAdmin();

  return (
    <div>
      <p className="eyebrow mb-2">Manage</p>
      <h1 className="font-display text-3xl mb-8">Reviews &amp; Testimonials</h1>

      <div className="bg-bone border border-line rounded-sm p-6 mb-10 max-w-2xl">
        <h2 className="font-display text-lg mb-4">Add a review</h2>
        <form action={createReview} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="authorName">Member name</Label>
              <Input id="authorName" name="authorName" required />
            </div>
            <div>
              <Label htmlFor="context">Context (optional)</Label>
              <Input id="context" name="context" placeholder="e.g. Sunday Padel Social" />
            </div>
          </div>
          <div>
            <Label htmlFor="quote">Quote</Label>
            <Textarea id="quote" name="quote" rows={3} required />
          </div>
          <div className="max-w-[160px]">
            <Label htmlFor="rating">Rating</Label>
            <Select id="rating" name="rating" defaultValue="5">
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} star{n !== 1 ? "s" : ""}
                </option>
              ))}
            </Select>
          </div>
          <Button type="submit" size="sm">
            Add Review
          </Button>
        </form>
      </div>

      <div className="flex flex-col gap-3 max-w-2xl">
        {reviews.map((review) => (
          <ReviewAdminRow key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
