import { notFound } from "next/navigation";
import { getEventByIdAdmin, getEventBookingStats } from "@/lib/admin-data";
import { EventForm } from "@/components/admin/event-form";
import { EventStatsPanel } from "@/components/admin/event-stats-panel";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEventByIdAdmin(params.id);
  if (!event) notFound();
  const stats = await getEventBookingStats(params.id);

  return (
    <div>
      <p className="eyebrow mb-2">Edit</p>
      <h1 className="font-display text-3xl mb-8">{event.title}</h1>
      <EventStatsPanel stats={stats} />
      <EventForm event={event} />
    </div>
  );
}
