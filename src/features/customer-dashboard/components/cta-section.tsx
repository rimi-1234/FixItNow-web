"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

const HIGHLIGHTS = [
  "Compare service options",
  "Request your preferred schedule",
  "Manage every booking status",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function CTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="cta-heading">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease }}
        className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[calc(var(--radius-xl)+0.75rem)] border border-brand/30 bg-brand text-brand-foreground shadow-2xl shadow-brand/15 lg:grid-cols-[1.25fr_0.75fr]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,var(--brand-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-foreground)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_right,black,transparent_75%)]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full border-[64px] border-brand-foreground/5" aria-hidden="true" />

        <div className="relative p-7 sm:p-10 lg:p-14">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, rotate: -8, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, delay: 0.18, ease }}
            className="mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-brand-foreground/20 bg-brand-foreground/10"
          >
            <Wrench className="h-5 w-5" aria-hidden="true" />
          </motion.div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-foreground/75">
            Ready when your home is
          </p>
          <h2 id="cta-heading" className="max-w-3xl text-3xl font-bold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Put the next home task on a clearer path.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-foreground/80 sm:text-lg">
            Start with the service you need, or create a technician account to offer your skills
            and manage incoming work.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="xl"
              variant="secondary"
              asChild
              className="group bg-brand-foreground text-brand hover:bg-brand-foreground/90"
            >
              <Link href={ROUTES.services}>
                Browse services
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              asChild
              className="border-brand-foreground/35 text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
            >
              <Link href={ROUTES.register + "?role=TECHNICIAN"}>Join as a technician</Link>
            </Button>
          </div>
        </div>

        <div className="relative border-t border-brand-foreground/15 bg-brand-foreground/5 p-7 sm:p-10 lg:flex lg:items-center lg:border-l lg:border-t-0 lg:p-12">
          <ul className="w-full space-y-5" aria-label="What you can do with FixItNow">
            {HIGHLIGHTS.map((highlight, index) => (
              <motion.li
                key={highlight}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.4,
                  delay: shouldReduceMotion ? 0 : 0.22 + index * 0.08,
                  ease,
                }}
                className="flex items-center gap-3 border-b border-brand-foreground/15 pb-5 text-sm font-semibold last:border-b-0 last:pb-0 sm:text-base"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-foreground text-brand">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {highlight}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
