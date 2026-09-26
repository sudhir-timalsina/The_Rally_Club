import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  return (
    <div>
      <p className="eyebrow mb-2">New</p>
      <h1 className="font-display text-3xl mb-8">Create Event</h1>
      <EventForm />
    </div>
  );
}
