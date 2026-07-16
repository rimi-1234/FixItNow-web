"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck2,
  CreditCard,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

const TRUST_POINTS = [
  { icon: SearchCheck, label: "Browse skills and rates" },
  { icon: CalendarCheck2, label: "Request a convenient time" },
  { icon: CreditCard, label: "Pay through secure checkout" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function LandingHeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const entrance = (delay: number, distance = 20) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.01 : 0.58, delay, ease },
  });

  return (
    <section
      className="relative isolate overflow-hidden border-b border-border bg-background"
      aria-labelledby="landing-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-36 top-12 -z-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="relative z-10">
          <motion.div
            {...entrance(0.04, 12)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-subtle px-3 py-1.5 text-xs font-semibold text-brand shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Home help, without the runaround
          </motion.div>

          <motion.h1
            id="landing-hero-heading"
            {...entrance(0.1)}
            className="max-w-3xl text-[clamp(2.75rem,7vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-foreground"
          >
            The right professional for the work your{" "}
            <span className="relative inline-block text-brand">
              home needs.
              <motion.span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-accent/70"
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: 0.55, ease }}
              />
            </span>
          </motion.h1>

          <motion.p
            {...entrance(0.18)}
            className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          >
            Explore services, compare technician skills and rates, then request a booking that
            fits your schedule. FixItNow keeps the next step clear from request to review.
          </motion.p>

          <motion.div
            {...entrance(0.25)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button size="xl" asChild className="group shadow-lg shadow-brand/15">
              <Link href={ROUTES.services}>
                Browse services
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="bg-surface/60">
              <Link href={ROUTES.register + "?role=TECHNICIAN"}>Join as a technician</Link>
            </Button>
          </motion.div>

          <motion.ul
            {...entrance(0.32)}
            className="mt-9 grid gap-3 border-t border-border pt-6 sm:grid-cols-3"
            aria-label="Booking benefits"
          >
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="leading-5">{label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 28, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.72, delay: 0.14, ease }}
          className="relative mx-auto w-full max-w-2xl lg:max-w-none"
        >
          <div className="absolute -left-3 -top-3 -z-10 h-full w-full rounded-[calc(var(--radius-xl)+0.5rem)] border border-brand/20 bg-brand-subtle sm:-left-5 sm:-top-5" aria-hidden="true" />
          <div className="relative min-h-[27rem] overflow-hidden rounded-[calc(var(--radius-xl)+0.5rem)] border border-border bg-surface shadow-2xl shadow-brand/10 sm:min-h-[34rem] lg:min-h-[38rem]">
            <Image
              src="/images/hero/home-services-hero.webp"
              alt="A home-service professional repairing a kitchen cabinet"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 56vw"
              className="object-cover object-center transition-transform duration-700 ease-out motion-safe:hover:scale-[1.025]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" aria-hidden="true" />

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.62, ease }}
              className="absolute bottom-4 left-4 right-4 rounded-[var(--radius-xl)] border border-border/80 bg-surface/92 p-4 shadow-xl backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto sm:w-[19rem]"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Booking steps stay visible</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Request, acceptance, payment, work status, and review eligibility—all in order.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.74, ease }}
              className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-border/70 bg-surface/90 px-3 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur-xl sm:right-6 sm:top-6"
            >
              <Wrench className="h-4 w-4 text-brand" aria-hidden="true" />
              Skilled help, one request away
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
