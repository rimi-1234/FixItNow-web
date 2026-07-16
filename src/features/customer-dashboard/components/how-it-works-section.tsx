"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarPlus2, ClipboardCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Choose the right help",
    description:
      "Browse available services and technician profiles, then compare skills, experience, location, and rates.",
  },
  {
    icon: CalendarPlus2,
    step: "02",
    title: "Request a time",
    description:
      "Select the service and preferred schedule. The technician can review and respond to your request.",
  },
  {
    icon: ClipboardCheck,
    step: "03",
    title: "Pay, complete, review",
    description:
      "Use checkout after acceptance, follow the work status, and leave a review after completion.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-background py-20 sm:py-24" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, ease }}
          className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              How FixItNow works
            </p>
            <h2
              id="how-it-works-heading"
              className="max-w-2xl text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl"
            >
              From a home task to a completed booking in three clear moves.
            </h2>
          </div>
          <Button variant="outline" size="lg" asChild className="group w-fit shrink-0 bg-surface">
            <Link href={ROUTES.services}>
              Start with services
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-7 right-7 top-7 hidden h-px bg-border md:block"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-7 right-7 top-7 hidden h-px origin-left bg-brand md:block"
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, delay: 0.12, ease }}
            aria-hidden="true"
          />

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8" aria-label="Steps to book a service">
            {STEPS.map(({ icon: Icon, step, title, description }, index) => (
              <motion.li
                key={step}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.48,
                  delay: shouldReduceMotion ? 0 : 0.08 + index * 0.1,
                  ease,
                }}
                className="group relative"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-brand/25 bg-surface text-brand shadow-[0_0_0_7px_var(--background)] transition-transform duration-300 motion-safe:group-hover:-translate-y-1">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-xs font-bold tracking-[0.18em] text-brand">STEP {step}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
