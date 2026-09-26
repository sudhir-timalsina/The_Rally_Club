import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoBadge } from "@/components/logo";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-24">
      <div className="container-edit text-center flex flex-col items-center">
        <LogoBadge size={56} className="mb-8" />
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-display-md max-w-md">This page has wandered off court</h1>
        <p className="mt-5 text-chocolate/65 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist, or may have moved.
        </p>
        <div className="mt-9 flex flex-wrap gap-4 justify-center">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
