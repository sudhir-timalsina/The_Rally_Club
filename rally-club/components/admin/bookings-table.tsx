"use client";

import { useMemo, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Input, Select } from "@/components/ui/field";
import { formatGBP, formatEventDate, cn } from "@/lib/utils";
import { updateBookingStatus } from "@/lib/actions/admin-moderation";
import type { AdminBookingRow } from "@/lib/admin-data";

export function BookingsTable({ bookings }: { bookings: AdminBookingRow[] }) {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [, startTransition] = useTransition();

  const events = useMemo(() => {
    const map = new Map<string, string>();
    bookings.forEach((b) => map.set(b.event_id, b.event_title));
    return Array.from(map.entries());
  }, [bookings]);

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      !search ||
      b.full_name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.booking_reference?.toLowerCase().includes(search.toLowerCase());
    const matchesEvent = eventFilter === "all" || b.event_id === eventFilter;
    const matchesPayment = paymentFilter === "all" || b.payment_status === paymentFilter;
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesEvent && matchesPayment && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe-dark" />
          <Input
            placeholder="Search name, email, reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={eventFilter} onChange={(e) => setEventFilter(e.target.value)} className="max-w-[200px]">
          <option value="all">All events</option>
          {events.map(([id, title]) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </Select>
        <Select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="max-w-[160px]">
          <option value="all">All payments</option>
          <option value="paid">Paid</option>
          <option value="not_required">Free</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="max-w-[160px]">
          <option value="all">All statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="checked_in">Checked in</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </div>

      <div className="bg-bone border border-line rounded-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[880px]">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-label text-taupe-dark">
              <th className="px-5 py-4 font-medium">Reference</th>
              <th className="px-5 py-4 font-medium">Customer</th>
              <th className="px-5 py-4 font-medium">Event</th>
              <th className="px-5 py-4 font-medium">Qty</th>
              <th className="px-5 py-4 font-medium">Amount</th>
              <th className="px-5 py-4 font-medium">Payment</th>
              <th className="px-5 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-line last:border-0 align-top">
                <td className="px-5 py-4 font-mono text-xs">{b.booking_reference}</td>
                <td className="px-5 py-4">
                  <p className="font-medium">{b.full_name}</p>
                  <p className="text-xs text-chocolate/50">{b.email}</p>
                </td>
                <td className="px-5 py-4 text-chocolate/70">
                  <p>{b.event_title}</p>
                  <p className="text-xs text-chocolate/45">{formatEventDate(b.event_date)}</p>
                </td>
                <td className="px-5 py-4 text-chocolate/70">{b.attendees}</td>
                <td className="px-5 py-4 text-chocolate/70">{formatGBP(b.amount_pence)}</td>
                <td className="px-5 py-4">
                  <PaymentPill status={b.payment_status} />
                </td>
                <td className="px-5 py-4">
                  <select
                    defaultValue={b.status}
                    onChange={(e) =>
                      startTransition(() =>
                        updateBookingStatus(b.id, e.target.value as "confirmed" | "cancelled" | "checked_in")
                      )
                    }
                    className="text-xs border border-line rounded-sm px-2 py-1.5 bg-bone"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="checked_in">Checked in</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-chocolate/55">No bookings match your filters.</p>
        )}
      </div>
    </div>
  );
}

function PaymentPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-[#e4ede0] text-[#3d5c33]",
    not_required: "bg-beige text-chocolate/70",
    pending: "bg-[#f3ecd8] text-[#8a6d1f]",
    failed: "bg-[#f5e5e0] text-[#8a3b2e]",
    refunded: "bg-[#eee] text-chocolate/60",
  };
  return (
    <span className={cn("text-[0.68rem] uppercase tracking-label px-2.5 py-1 rounded-pill whitespace-nowrap", styles[status] || "bg-beige")}>
      {status.replace("_", " ")}
    </span>
  );
}
