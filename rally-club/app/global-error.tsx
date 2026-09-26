"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en-GB">
      <body className="bg-cream text-chocolate font-sans">
        <section className="min-h-screen flex items-center justify-center py-24 px-6">
          <div className="text-center max-w-sm">
            <p className="text-xs uppercase tracking-label text-taupe-dark mb-4">
              Something went wrong
            </p>
            <h1 className="font-serif text-3xl mb-4">
              We hit an unexpected snag
            </h1>
            <p className="text-chocolate/65 mb-8 text-sm">
              Please try again. If the problem continues, get in touch with us
              directly.
            </p>
            <Button onClick={() => reset()}>Try Again</Button>
          </div>
        </section>
      </body>
    </html>
  );
}
