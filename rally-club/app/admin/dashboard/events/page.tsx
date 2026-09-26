import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllEventsAdmin } from "@/lib/admin-data";
import { formatEventDate, formatGBP } from "@/lib/utils";
import { EVENT_CATEGORY_LABELS } from "@/types";
import { EventRowActions } from "@/components/admin/event-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await getAllEventsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Manage</p>
          <h1 className="font-display text-3xl">Events</h1>
        </div>
        <Link
          href="/admin/dashboard/events/new"
          className="inline-flex items-center gap-2 bg-chocolate text-cream rounded-sm px-5 py-2.5 text-sm hover:bg-chocolate-light transition-colors"
        >
          <Plus size={15} /> New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-bone border border-dashed border-line rounded-sm p-16 text-center">
          <p className="text-chocolate/60">No events yet.</p>
          <Link href="/admin/dashboard/events/new" className="text-sm link-underline mt-2 inline-block">
            Create your first event
          </Link>
        </div>
      ) : (
        <div className="bg-bone border border-line rounded-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-label text-taupe-dark">
                <th className="px-5 py-4 font-medium">Event</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Category</th>
                <th className="px-5 py-4 font-medium">Price</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4 font-medium max-w-[220px] truncate">{event.title}</td>
                  <td className="px-5 py-4 text-chocolate/70 whitespace-nowrap">
                    {formatEventDate(event.event_date)}
                  </td>
                  <td className="px-5 py-4 text-chocolate/70">{EVENT_CATEGORY_LABELS[event.category]}</td>
                  <td className="px-5 py-4 text-chocolate/70">{formatGBP(event.price_pence)}</td>
                  <td className="px-5 py-4">
                    <StatusPill status={event.status} />
                  </td>
                  <td className="px-5 py-4">
                    <EventRowActions eventId={event.id} status={event.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    published: "bg-[#e4ede0] text-[#3d5c33]",
    draft: "bg-beige text-chocolate/70",
    sold_out: "bg-chocolate text-cream",
    cancelled: "bg-[#f5e5e0] text-[#8a3b2e]",
    completed: "bg-[#e5e0ee] text-[#4a3b6b]",
  };
  return (
    <span className={`text-[0.68rem] uppercase tracking-label px-2.5 py-1 rounded-pill whitespace-nowrap ${styles[status] || "bg-beige"}`}>
      {status.replace("_", " ")}
    </span>
  );
}
