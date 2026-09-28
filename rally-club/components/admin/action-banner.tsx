"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";

const MESSAGES: Record<string, string> = {
  created: "Event created successfully.",
  updated: "Changes saved successfully.",
  deleted: "Event deleted.",
};

/**
 * Reads a one-off ?created=1 / ?updated=1 / ?deleted=1 query param (set by a
 * redirect right after a mutation succeeds), shows a green confirmation
 * banner, then strips the param from the URL so refreshing the page doesn't
 * keep re-showing it.
 */
export function ActionBanner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(true);

  const key = ["created", "updated", "deleted"].find((k) => searchParams.get(k) === "1");

  useEffect(() => {
    if (!key) return;
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      router.replace(pathname);
    }, 4000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!key || !visible) return null;

  return (
    <div className="flex items-center gap-3 bg-[#e4ede0] border border-[#c3d6ba] text-[#3d5c33] rounded-sm px-4 py-3 mb-6">
      <CheckCircle2 size={17} className="shrink-0" />
      <p className="text-sm flex-1">{MESSAGES[key]}</p>
      <button
        onClick={() => {
          setVisible(false);
          router.replace(pathname);
        }}
        aria-label="Dismiss"
        className="text-[#3d5c33]/60 hover:text-[#3d5c33]"
      >
        <X size={15} />
      </button>
    </div>
  );
}
