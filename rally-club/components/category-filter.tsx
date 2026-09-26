"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { CategoryIcon } from "@/components/category-icon";
import { cn } from "@/lib/utils";
import type { EventCategory } from "@/types";

export function CategoryFilter({ active }: { active?: EventCategory }) {
  const pathname = usePathname();
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-none">
      <Link
        href={pathname}
        className={cn(
          "shrink-0 flex items-center gap-1.5 rounded-pill border px-4 py-2 text-sm transition-colors",
          !active
            ? "bg-chocolate text-cream border-chocolate"
            : "border-line text-chocolate/70 hover:border-chocolate/40"
        )}
      >
        All
      </Link>
      {siteConfig.categories.map((cat) => (
        <Link
          key={cat.key}
          href={`${pathname}?category=${cat.key}`}
          className={cn(
            "shrink-0 flex items-center gap-1.5 rounded-pill border px-4 py-2 text-sm transition-colors",
            active === cat.key
              ? "bg-chocolate text-cream border-chocolate"
              : "border-line text-chocolate/70 hover:border-chocolate/40"
          )}
        >
          <CategoryIcon category={cat.key as EventCategory} size={13} />
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
