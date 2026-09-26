"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const SLIDES = [
  "/images/crop_women_walking_padel.jpg",
  "/images/crop_sunset_women_toast.jpg",
  "/images/crop_wine_glasses_dinner.jpg",
  "/images/crop_pilates_studio.jpg",
];

const SLIDE_DURATION = 5200;

/**
 * A full-bleed, slowly crossfading, slowly zooming ("Ken Burns") image
 * sequence that reads as ambient motion/video without requiring real
 * video footage. Respects prefers-reduced-motion by freezing on the
 * first frame.
 */
export function HeroSlideshow({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActive((v) => (v + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-chocolate", className)}>
      {SLIDES.map((src, i) => {
        const isActive = i === active;
        return (
          <div
            key={src}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 transition-opacity ease-linear",
              isActive ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDuration: "1400ms" }}
          >
            <div
              className={cn(
                "absolute inset-0",
                !reduce && isActive && "animate-[kenburns_11s_ease-out_forwards]"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
      {/* Readability + brand-tint gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-chocolate/75 via-chocolate/20 to-chocolate/45" />
      <div className="absolute inset-0 bg-chocolate/10 mix-blend-multiply" />

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 rounded-pill transition-all duration-500",
              i === active ? "w-6 bg-cream" : "w-1.5 bg-cream/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
