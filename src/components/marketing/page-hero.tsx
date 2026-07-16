"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-border bg-surface",
        className
      )}
      aria-labelledby="page-hero-title"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero/home-services-hero.webp"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center opacity-35 dark:opacity-25"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-surface via-surface/95 to-surface/20 sm:via-surface/90" />
      <div className="absolute inset-y-0 left-0 -z-10 w-2/3 bg-[radial-gradient(circle_at_20%_40%,color-mix(in_srgb,var(--brand)_13%,transparent),transparent_56%)]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-subtle/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {eyebrow}
          </div>
          <h1
            id="page-hero-title"
            className="mt-5 max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
          {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
        </motion.div>
      </div>
    </section>
  );
}
