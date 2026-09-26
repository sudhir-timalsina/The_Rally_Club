"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  MessageSquare,
  Handshake,
  HelpCircle,
  Star,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { LogoBadge } from "@/components/logo";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Events", href: "/admin/dashboard/events", icon: CalendarDays },
  { label: "Bookings", href: "/admin/dashboard/bookings", icon: Ticket },
  { label: "Messages", href: "/admin/dashboard/messages", icon: MessageSquare },
  { label: "Partnerships", href: "/admin/dashboard/partners", icon: Handshake },
  { label: "FAQs", href: "/admin/dashboard/faqs", icon: HelpCircle },
  { label: "Reviews", href: "/admin/dashboard/reviews", icon: Star },
];

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 border-r border-line bg-bone/60 hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-line">
        <LogoBadge size={36} />
        <div>
          <p className="font-display text-sm leading-none">Rally Admin</p>
          <p className="text-[0.68rem] text-chocolate/50 mt-1 truncate max-w-[140px]">{userEmail}</p>
        </div>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors",
                active
                  ? "bg-chocolate text-cream"
                  : "text-chocolate/70 hover:bg-beige/60"
              )}
            >
              <item.icon size={16} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-line flex flex-col gap-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-chocolate/70 hover:bg-beige/60 transition-colors"
        >
          <ExternalLink size={16} strokeWidth={1.75} />
          View site
        </a>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-chocolate/70 hover:bg-beige/60 transition-colors text-left"
        >
          <LogOut size={16} strokeWidth={1.75} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
