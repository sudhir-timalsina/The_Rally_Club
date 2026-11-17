"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoBadge, LogoWordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * NOTE — tied to EVENTS_ONLY_MODE in middleware.ts.
 * While the site is restricted to the Events pages only, the full nav list
 * and the "Join Community" link are hidden here too, since every other
 * page would just redirect back to /events anyway. When EVENTS_ONLY_MODE
 * is switched off, restore the original nav list (siteConfig.nav) and the
 * Join Community button, and point the logo back at "/".
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-cream/95 backdrop-blur-sm shadow-card" : "bg-cream/0"
      )}
    >
      <nav className="container-edit flex items-center justify-between py-4">
        <Link href="/events" className="flex items-center gap-3 group" aria-label="The Rally Club — Events">
          <LogoBadge size={42} />
          <LogoWordmark />
        </Link>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="primary" size="sm">
            <Link href="/events">Book an Event</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-chocolate"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-cream border-t border-line"
          >
            <div className="container-edit flex flex-col gap-3 py-6">
              <Button asChild variant="primary">
                <Link href="/events">Book an Event</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
