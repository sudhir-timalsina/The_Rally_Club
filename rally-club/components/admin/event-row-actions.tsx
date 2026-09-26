"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye, EyeOff, Ban } from "lucide-react";
import { deleteEvent, setEventStatus } from "@/lib/actions/admin-events";
import type { EventStatus } from "@/types";

export function EventRowActions({ eventId, status }: { eventId: string; status: EventStatus }) {
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function toggleStatus(next: EventStatus) {
    startTransition(() => setEventStatus(eventId, next));
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/admin/dashboard/events/${eventId}`}
        className="p-2 rounded-sm hover:bg-beige/60 text-chocolate/70"
        aria-label="Edit event"
      >
        <Pencil size={15} />
      </Link>

      {status === "published" ? (
        <button
          onClick={() => toggleStatus("draft")}
          disabled={pending}
          className="p-2 rounded-sm hover:bg-beige/60 text-chocolate/70"
          aria-label="Unpublish"
          title="Unpublish"
        >
          <EyeOff size={15} />
        </button>
      ) : (
        <button
          onClick={() => toggleStatus("published")}
          disabled={pending}
          className="p-2 rounded-sm hover:bg-beige/60 text-chocolate/70"
          aria-label="Publish"
          title="Publish"
        >
          <Eye size={15} />
        </button>
      )}

      <button
        onClick={() => toggleStatus(status === "sold_out" ? "published" : "sold_out")}
        disabled={pending}
        className="p-2 rounded-sm hover:bg-beige/60 text-chocolate/70"
        aria-label="Toggle sold out"
        title="Toggle sold out"
      >
        <Ban size={15} />
      </button>

      {confirmDelete ? (
        <div className="flex items-center gap-1">
          <button
            onClick={() => startTransition(() => deleteEvent(eventId))}
            className="text-xs px-2 py-1.5 rounded-sm bg-[#8a3b2e] text-cream"
          >
            Confirm
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="text-xs px-2 py-1.5 rounded-sm border border-line"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmDelete(true)}
          className="p-2 rounded-sm hover:bg-beige/60 text-[#8a3b2e]"
          aria-label="Delete event"
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}
