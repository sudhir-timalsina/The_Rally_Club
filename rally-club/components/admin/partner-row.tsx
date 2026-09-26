"use client";

import { useState, useTransition } from "react";
import { Mail, MailOpen, Trash2, ChevronDown } from "lucide-react";
import { markPartnerEnquiryRead, deletePartnerEnquiry } from "@/lib/actions/admin-moderation";
import type { PartnershipEnquiry } from "@/types";
import { cn } from "@/lib/utils";

export function PartnerRow({ enquiry }: { enquiry: PartnershipEnquiry }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "border rounded-sm bg-bone transition-colors",
        enquiry.is_read ? "border-line" : "border-chocolate/30"
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          {!enquiry.is_read && <span className="w-2 h-2 rounded-full bg-chocolate shrink-0" />}
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {enquiry.company} <span className="text-chocolate/45 font-normal">— {enquiry.name}</span>
            </p>
            <p className="text-xs text-chocolate/55 truncate mt-0.5 capitalize">
              {enquiry.collaboration_type.replace("_", " ")} · {enquiry.business_type}
            </p>
          </div>
        </div>
        <ChevronDown size={16} className={cn("shrink-0 transition-transform text-taupe-dark", open && "rotate-180")} />
      </button>

      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-chocolate/75 whitespace-pre-line border-t border-line pt-4">
            {enquiry.message}
          </p>
          <p className="text-xs text-chocolate/50 mt-3">
            {enquiry.email}
            {enquiry.phone ? ` · ${enquiry.phone}` : ""}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => startTransition(() => markPartnerEnquiryRead(enquiry.id, !enquiry.is_read))}
              disabled={pending}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm border border-line hover:bg-beige/60"
            >
              {enquiry.is_read ? <Mail size={13} /> : <MailOpen size={13} />}
              Mark as {enquiry.is_read ? "unread" : "read"}
            </button>
            <a
              href={`mailto:${enquiry.email}`}
              className="text-xs px-3 py-2 rounded-sm border border-line hover:bg-beige/60"
            >
              Reply by email
            </a>
            <button
              onClick={() => startTransition(() => deletePartnerEnquiry(enquiry.id))}
              disabled={pending}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm border border-line text-[#8a3b2e] hover:bg-beige/60 ml-auto"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
