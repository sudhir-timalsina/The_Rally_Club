"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, Eye, EyeOff, Save, X } from "lucide-react";
import { updateFaq, toggleFaqPublished, deleteFaq } from "@/lib/actions/admin-moderation";
import { Input, Textarea } from "@/components/ui/field";
import type { Faq } from "@/types";
import { cn } from "@/lib/utils";

export function FaqAdminRow({ faq }: { faq: Faq }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className={cn("border rounded-sm bg-bone p-5", faq.is_published ? "border-line" : "border-dashed border-taupe")}>
      {editing ? (
        <form
          action={(formData) => {
            startTransition(() => updateFaq(faq.id, formData));
            setEditing(false);
          }}
          className="space-y-3"
        >
          <Input name="question" defaultValue={faq.question} required />
          <Textarea name="answer" defaultValue={faq.answer} rows={3} required />
          <div className="flex gap-2">
            <button type="submit" className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm bg-chocolate text-cream">
              <Save size={13} /> Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm border border-line"
            >
              <X size={13} /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="font-medium text-sm">{faq.question}</p>
          <p className="text-sm text-chocolate/65 mt-1.5">{faq.answer}</p>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm border border-line hover:bg-beige/60"
            >
              <Pencil size={13} /> Edit
            </button>
            <button
              onClick={() => startTransition(() => toggleFaqPublished(faq.id, !faq.is_published))}
              disabled={pending}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm border border-line hover:bg-beige/60"
            >
              {faq.is_published ? <EyeOff size={13} /> : <Eye size={13} />}
              {faq.is_published ? "Unpublish" : "Publish"}
            </button>
            <button
              onClick={() => startTransition(() => deleteFaq(faq.id))}
              disabled={pending}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm border border-line text-[#8a3b2e] hover:bg-beige/60 ml-auto"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
