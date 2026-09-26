"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TiltImage({
  src,
  alt,
  className,
  priority,
  sizes = "(max-width: 1024px) 90vw, 45vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [4, -4]);
  const rotateY = useTransform(springX, [0, 1], [-4, 4]);
  const shineX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const shineBackground = useTransform(
    shineX,
    (v) => `linear-gradient(115deg, transparent 30%, rgba(247,241,232,0.16) 45%, transparent 60%)`
  );

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      className={cn("relative overflow-hidden rounded-sm will-change-transform", className)}
    >
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: shineBackground }}
        />
      )}
    </motion.div>
  );
}
