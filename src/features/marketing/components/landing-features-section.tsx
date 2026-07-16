"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  CalendarRange,
  CreditCard,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { ROUTES } from "@/config/routes";

const FEATURES = [
  {
    icon: SearchCheck,
    eyebrow: "Discover",
    title: "Compare the details that matter",
    description:
      "Explore services and technician profiles by skill, location, experience, availability, and rate.",
    accent: "bg-brand-subtle text-brand",
  },
  {
    icon: CalendarRange,
    eyebrow: "Coordinate",
    title: "Make a clear booking request",
    description:
      "Choose the service and scheduled time, then follow the booking as the technician responds.",
    accent: "bg-accent/12 text-accent",
  },
  {
    icon: CreditCard,
    eyebrow: "Complete",
    title: "Pay and review at the right moment",
    description:
      "Use the supported checkout after acceptance and share a review after the work is completed.",
    accent: "bg-success/12 text-success",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function LandingFeaturesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-background py-20 sm:py-24" aria-labelledby="landing-features-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, ease }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Built around the real workflow
          </p>
          <h2
            id="landing-features-heading"
            className="max-w-xl text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Less chasing. More clarity at every decision.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            The experience stays focused on three things: finding a suitable professional,
            agreeing on the work, and completing the booking with a visible status.
          </p>

          <div className="mt-7 rounded-[var(--radius-xl)] border border-border bg-surface-raised p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-sm leading-6 text-foreground">
                Role-based accounts keep customer, technician, and admin actions separate.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="border-b border-border">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease,
                }}
                className="group grid gap-5 border-t border-border py-8 sm:grid-cols-[3.25rem_1fr_auto] sm:items-start sm:gap-6 sm:py-10"
              >
                <span className={"flex h-12 w-12 items-center justify-center rounded-full " + feature.accent}>
                  <Icon className="h-5 w-5 transition-transform duration-300 motion-safe:group-hover:scale-110" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                    {feature.eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {feature.description}
                  </p>
                </div>
                <span className="hidden text-4xl font-bold tracking-[-0.05em] text-muted-foreground/20 sm:block" aria-hidden="true">
                  0{index + 1}
                </span>
              </motion.article>
            );
          })}

          <div className="border-t border-border py-6 text-right">
            <Link
              href={ROUTES.technicians}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-accent"
            >
              Meet available technicians
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
