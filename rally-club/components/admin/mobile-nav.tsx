"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/admin/dashboard" },
  { label: "Events", href: "/admin/dashboard/events" },
  { label: "Bookings", href: "/admin/dashboard/bookings" },
  { label: "Messages", href: "/admin/dashboard/messages" },
  { label: "Partnerships", href: "/admin/dashboard/partners" },
  { label: "FAQs", href: "/admin/dashboard/faqs" },
  { label: "Reviews", href: "/admin/dashboard/reviews" },
];

export function AdminMobileNav() {
  const pathname = usePathname();
  return (
    <div className="md:hidden sticky top-0 z-40 bg-bone border-b border-line overflow-x-auto">
      <div className="flex gap-1 px-4 py-3 min-w-max">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-1.5 rounded-pill text-xs whitespace-nowrap",
              pathname === item.href ? "bg-chocolate text-cream" : "text-chocolate/70 border border-line"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
