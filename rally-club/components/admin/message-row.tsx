"use client";

import { useState, useTransition } from "react";
import { Mail, MailOpen, Trash2, ChevronDown } from "lucide-react";
import { markMessageRead, deleteMessage } from "@/lib/actions/admin-moderation";
import type { ContactMessage } from "@/types";
import { cn } from "@/lib/utils";

export function MessageRow({ message }: { message: ContactMessage }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "border rounded-sm bg-bone transition-colors",
        message.is_read ? "border-line" : "border-chocolate/30"
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          {!message.is_read && <span className="w-2 h-2 rounded-full bg-chocolate shrink-0" />}
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {message.name} <span className="text-chocolate/45 font-normal">— {message.email}</span>
            </p>
            <p className="text-xs text-chocolate/55 truncate mt-0.5">
              {message.subject || message.message}
            </p>
          </div>
        </div>
        <ChevronDown size={16} className={cn("shrink-0 transition-transform text-taupe-dark", open && "rotate-180")} />
      </button>

      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-chocolate/75 whitespace-pre-line border-t border-line pt-4">
            {message.message}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => startTransition(() => markMessageRead(message.id, !message.is_read))}
              disabled={pending}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-sm border border-line hover:bg-beige/60"
            >
              {message.is_read ? <Mail size={13} /> : <MailOpen size={13} />}
              Mark as {message.is_read ? "unread" : "read"}
            </button>
            <a
              href={`mailto:${message.email}`}
              className="text-xs px-3 py-2 rounded-sm border border-line hover:bg-beige/60"
            >
              Reply by email
            </a>
            <button
              onClick={() => startTransition(() => deleteMessage(message.id))}
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
