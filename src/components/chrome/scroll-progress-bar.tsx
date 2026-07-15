"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[550] h-1 origin-left bg-gradient-to-r from-emerald-400 via-indigo-500 to-brand"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
