"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedHeadline({
  lines,
  className,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <h1 className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reduce ? undefined : { y: "110%" }}
            animate={reduce ? undefined : { y: "0%" }}
            transition={{
              duration: 0.9,
              delay: delay + li * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
