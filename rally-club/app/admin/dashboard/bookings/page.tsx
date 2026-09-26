import { Download } from "lucide-react";
import { getAllBookingsAdmin } from "@/lib/admin-data";
import { BookingsTable } from "@/components/admin/bookings-table";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await getAllBookingsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Manage</p>
          <h1 className="font-display text-3xl">Bookings</h1>
        </div>
        <a
          href="/api/admin/bookings/export"
          className="inline-flex items-center gap-2 border border-line rounded-sm px-5 py-2.5 text-sm hover:bg-beige/60 transition-colors"
        >
          <Download size={15} /> Export CSV
        </a>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-bone border border-dashed border-line rounded-sm p-16 text-center text-chocolate/60">
          No bookings yet.
        </div>
      ) : (
        <BookingsTable bookings={bookings} />
      )}
    </div>
  );
}
