"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  Hammer,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

const BOOKING_STEPS = [
  {
    status: "Requested",
    title: "Send your request",
    description: "Choose a service, technician, and preferred time.",
    icon: Send,
  },
  {
    status: "Accepted",
    title: "Get confirmation",
    description: "The technician reviews and accepts the booking.",
    icon: BadgeCheck,
  },
  {
    status: "Paid",
    title: "Complete checkout",
    description: "Pay for an accepted booking through the secure provider flow.",
    icon: CreditCard,
  },
  {
    status: "In progress",
    title: "Follow the status",
    description: "See when the technician starts the scheduled work.",
    icon: Hammer,
  },
  {
    status: "Completed",
    title: "Close the loop",
    description: "Once completed, the booking becomes eligible for your review.",
    icon: CheckCircle2,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function RouteVisualizerSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-border bg-surface-raised py-20 sm:py-24"
      aria-labelledby="booking-journey-heading"
    >
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border-[48px] border-brand/5" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:gap-14 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, ease }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            A transparent booking journey
          </p>
          <h2
            id="booking-journey-heading"
            className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl"
          >
            One booking. Every next step visible.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            FixItNow uses a clear status flow, so customers and technicians know what can happen
            next—from the first request through payment and completion.
          </p>

          <div className="mt-7 flex items-start gap-3 border-l-2 border-accent pl-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <p className="text-sm leading-6 text-foreground">
              Payment becomes available after acceptance, and reviews become available after
              completion.
            </p>
          </div>

          <Button variant="outline" size="lg" asChild className="group mt-8 bg-surface">
            <Link href={ROUTES.howItWorks}>
              See how booking works
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.62, delay: 0.08, ease }}
          className="rounded-[calc(var(--radius-xl)+0.35rem)] border border-border bg-surface p-5 shadow-xl shadow-brand/5 sm:p-7 lg:p-8"
        >
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Booking journey
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">From request to review</p>
            </div>
            <span className="rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
              Clear status flow
            </span>
          </div>

          <div className="relative">
            <div
              className="absolute bottom-5 left-5 top-5 w-px bg-border md:hidden"
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-5 left-5 top-5 w-px origin-top bg-brand md:hidden"
              initial={shouldReduceMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 1, delay: 0.25, ease }}
              aria-hidden="true"
            />
            <div
              className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-border md:block"
              aria-hidden="true"
            />
            <motion.div
              className="absolute left-[10%] right-[10%] top-5 hidden h-px origin-left bg-brand md:block"
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 1.05, delay: 0.25, ease }}
              aria-hidden="true"
            />

            <ol className="grid gap-6 md:grid-cols-5 md:gap-3" aria-label="Booking status sequence">
              {BOOKING_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.status}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 0.38,
                      delay: shouldReduceMotion ? 0 : 0.18 + index * 0.1,
                      ease,
                    }}
                    className="relative grid grid-cols-[2.5rem_1fr] gap-4 md:block md:text-center"
                  >
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand/25 bg-brand-subtle text-brand shadow-[0_0_0_6px_var(--surface)] md:mx-auto">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-brand md:mt-4">
                        {step.status}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
