import Link from "next/link";
import { CalendarDays, Ticket, Mail, Handshake, PoundSterling, ArrowUpRight, Plus } from "lucide-react";
import { getDashboardStats, getAllEventsAdmin } from "@/lib/admin-data";
import { formatEventDate, formatGBP } from "@/lib/utils";
import { EVENT_CATEGORY_LABELS } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [stats, events] = await Promise.all([getDashboardStats(), getAllEventsAdmin()]);
  const upcoming = events
    .filter((e) => e.event_date >= new Date().toISOString().slice(0, 10))
    .slice(0, 5);

  const cards = [
    { label: "Upcoming events", value: stats.upcomingEvents, icon: CalendarDays, href: "/admin/dashboard/events" },
    { label: "Total bookings", value: stats.totalBookings, icon: Ticket, href: "/admin/dashboard/bookings" },
    { label: "Revenue", value: formatGBP(stats.totalRevenuePence), icon: PoundSterling, href: "/admin/dashboard/bookings" },
    { label: "New enquiries", value: stats.newContactMessages, icon: Mail, href: "/admin/dashboard/messages" },
    { label: "New partnerships", value: stats.newPartnerEnquiries, icon: Handshake, href: "/admin/dashboard/partners" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Dashboard</p>
          <h1 className="font-display text-3xl">Welcome back</h1>
        </div>
        <Link
          href="/admin/dashboard/events/new"
          className="inline-flex items-center gap-2 bg-chocolate text-cream rounded-sm px-5 py-2.5 text-sm hover:bg-chocolate-light transition-colors"
        >
          <Plus size={15} /> New Event
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-bone border border-line rounded-sm p-5 hover:border-chocolate/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon size={18} className="text-taupe-dark" strokeWidth={1.75} />
              <ArrowUpRight size={14} className="text-taupe" />
            </div>
            <p className="font-display text-3xl">{card.value}</p>
            <p className="text-sm text-chocolate/60 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-bone border border-line rounded-sm">
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-display text-lg">Next 5 events</h2>
          <Link href="/admin/dashboard/events" className="text-sm link-underline pb-0.5">
            Manage all
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-chocolate/55">
            No upcoming events yet — create your first one.
          </p>
        ) : (
          <ul>
            {upcoming.map((event) => (
              <li key={event.id} className="flex items-center justify-between px-6 py-4 border-b border-line last:border-0">
                <div>
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-chocolate/55 mt-1">
                    {formatEventDate(event.event_date)} · {EVENT_CATEGORY_LABELS[event.category]}
                  </p>
                </div>
                <StatusPill status={event.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
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
    <span className={`text-[0.68rem] uppercase tracking-label px-2.5 py-1 rounded-pill ${styles[status] || "bg-beige"}`}>
      {status.replace("_", " ")}
    </span>
  );
}
