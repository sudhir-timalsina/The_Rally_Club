import { formatGBP } from "@/lib/utils";

export function EventStatsPanel({
  stats,
}: {
  stats: { capacity: number | null; sold: number; remaining: number | null; revenuePence: number; bookingsCount: number };
}) {
  const pct =
    stats.capacity && stats.capacity > 0 ? Math.min(100, Math.round((stats.sold / stats.capacity) * 100)) : null;

  return (
    <div className="bg-bone border border-line rounded-sm p-6 mb-8">
      <p className="eyebrow mb-4">Event performance</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-5">
        <Stat label="Capacity" value={stats.capacity ?? "Unlimited"} />
        <Stat label="Sold" value={stats.sold} />
        <Stat label="Remaining" value={stats.remaining ?? "—"} />
        <Stat label="Revenue" value={formatGBP(stats.revenuePence)} />
      </div>
      {pct !== null && (
        <div>
          <div className="h-2 rounded-pill bg-beige overflow-hidden">
            <div
              className="h-full bg-chocolate rounded-pill transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-chocolate/50 mt-2">{pct}% of capacity booked · {stats.bookingsCount} booking(s)</p>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="font-display text-2xl">{value}</p>
      <p className="text-xs text-chocolate/55 mt-1">{label}</p>
    </div>
  );
}
