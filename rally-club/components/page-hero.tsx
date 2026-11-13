import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { ArchImage } from "@/components/arch-image";
import { cn } from "@/lib/utils";

/**
 * Shared page header: soft blush wash, thin decorative rings, and an
 * optional arch-shaped photo. Keeps every inner page feeling like part of
 * the same brand.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-blush/40 via-cream to-cream",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-taupe/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-taupe/20"
      />

      <div
        className={cn(
          "container-edit relative grid items-center gap-12 pb-16 pt-14 sm:pb-24 sm:pt-20",
          image && "lg:grid-cols-12 lg:gap-16"
        )}
      >
        <div className={image ? "lg:col-span-7" : "max-w-3xl"}>
          <Reveal>
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h1 className="text-display-lg max-w-2xl">{title}</h1>
          </Reveal>
          {description && (
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-chocolate/70">{description}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-4">{children}</div>
            </Reveal>
          )}
        </div>

        {image && (
          <Reveal delay={0.15} className="lg:col-span-5">
            <ArchImage src={image.src} alt={image.alt} priority />
          </Reveal>
        )}
      </div>
    </section>
  );
}
