import { getAllFaqsAdmin } from "@/lib/admin-data";
import { FaqAdminRow } from "@/components/admin/faq-admin-row";
import { createFaq } from "@/lib/actions/admin-moderation";
import { Label, Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const faqs = await getAllFaqsAdmin();

  return (
    <div>
      <p className="eyebrow mb-2">Manage</p>
      <h1 className="font-display text-3xl mb-8">FAQs</h1>

      <div className="bg-bone border border-line rounded-sm p-6 mb-10 max-w-2xl">
        <h2 className="font-display text-lg mb-4">Add a new question</h2>
        <form action={createFaq} className="space-y-4">
          <div>
            <Label htmlFor="question">Question</Label>
            <Input id="question" name="question" required />
          </div>
          <div>
            <Label htmlFor="answer">Answer</Label>
            <Textarea id="answer" name="answer" rows={3} required />
          </div>
          <Button type="submit" size="sm">
            Add FAQ
          </Button>
        </form>
      </div>

      <div className="flex flex-col gap-3 max-w-2xl">
        {faqs.map((faq) => (
          <FaqAdminRow key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  );
}
