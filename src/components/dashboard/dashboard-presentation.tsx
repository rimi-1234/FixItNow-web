"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type DashboardTone = "brand" | "accent" | "success" | "warning";

const TONE_STYLES: Record<
  DashboardTone,
  { icon: string; glow: string; line: string; dot: string }
> = {
  brand: {
    icon: "bg-brand-subtle text-brand",
    glow: "bg-brand/20",
    line: "from-brand to-brand/20",
    dot: "bg-brand",
  },
  accent: {
    icon: "bg-accent/15 text-accent",
    glow: "bg-accent/20",
    line: "from-accent to-accent/20",
    dot: "bg-accent",
  },
  success: {
    icon: "bg-success/15 text-success",
    glow: "bg-success/20",
    line: "from-success to-success/20",
    dot: "bg-success",
  },
  warning: {
    icon: "bg-warning/15 text-warning-foreground",
    glow: "bg-warning/20",
    line: "from-warning to-warning/20",
    dot: "bg-warning",
  },
};

interface DashboardRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function DashboardReveal({
  children,
  className,
  delay = 0,
}: DashboardRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.42,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface DashboardHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  mediaLabel?: string;
  mediaValue?: string | number;
  tone?: DashboardTone;
  className?: string;
}

export function DashboardHero({
  eyebrow,
  title,
  description,
  actions,
  imageSrc,
  imageAlt = "",
  mediaLabel,
  mediaValue,
  tone = "brand",
  className,
}: DashboardHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const toneStyle = TONE_STYLES[tone];

  return (
    <DashboardReveal>
      <section
        className={cn(
          "relative isolate overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-sm",
          className
        )}
        aria-labelledby="dashboard-hero-title"
      >
        <div
          className={cn(
            "pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full blur-3xl",
            toneStyle.glow
          )}
          aria-hidden="true"
        />

        <div className="grid min-h-[17rem] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="mb-5 flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", toneStyle.dot)} />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
            </div>
            <h1
              id="dashboard-hero-title"
              className="max-w-2xl text-balance text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08]"
            >
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              {description}
            </p>
            {actions && (
              <div className="mt-7 flex flex-wrap items-center gap-3">{actions}</div>
            )}
          </div>

          <div className="relative min-h-56 overflow-hidden border-t border-border/60 bg-muted lg:min-h-full lg:border-l lg:border-t-0">
            {imageSrc ? (
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 1.04, opacity: 0.82 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-subtle via-muted to-accent/15" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" aria-hidden="true" />

            {mediaLabel && mediaValue !== undefined && (
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-2xl border border-white/20 bg-black/35 p-4 text-white shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:min-w-52">
                <div>
                  <p className="text-xs font-medium text-white/70">{mediaLabel}</p>
                  <p className="mt-1 text-2xl font-bold tracking-tight">{mediaValue}</p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </DashboardReveal>
  );
}

interface DashboardMetricProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  supportingText?: string;
  href?: string;
  tone?: DashboardTone;
  loading?: boolean;
  delay?: number;
}

export function DashboardMetric({
  icon: Icon,
  label,
  value,
  supportingText,
  href,
  tone = "brand",
  loading = false,
  delay = 0,
}: DashboardMetricProps) {
  const shouldReduceMotion = useReducedMotion();
  const toneStyle = TONE_STYLES[tone];

  const content = (
    <div className="relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-colors duration-300 group-hover:border-brand/35">
      <div className={cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r", toneStyle.line)} aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {loading ? (
            <Skeleton className="mt-3 h-8 w-20" />
          ) : (
            <p className="mt-2 text-3xl font-bold tracking-[-0.04em] text-foreground">{value}</p>
          )}
          {supportingText &&
            (loading ? (
              <Skeleton className="mt-3 h-3 w-32 max-w-full" />
            ) : (
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{supportingText}</p>
            ))}
        </div>
        <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", toneStyle.icon)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </div>
  );

  return (
    <DashboardReveal delay={delay} className="h-full">
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group h-full"
      >
        {href ? (
          <Link href={href} className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {content}
          </Link>
        ) : (
          content
        )}
      </motion.div>
    </DashboardReveal>
  );
}

interface DashboardPanelProps {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  delay?: number;
}

export function DashboardPanel({
  title,
  description,
  eyebrow,
  action,
  children,
  className,
  contentClassName,
  delay = 0,
}: DashboardPanelProps) {
  return (
    <DashboardReveal delay={delay} className={className}>
      <section className="h-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        <header className="flex flex-col gap-3 border-b border-border/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            {eyebrow && (
              <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
                {eyebrow}
              </p>
            )}
            <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{title}</h2>
            {description && <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
        <div className={cn("p-5 sm:p-6", contentClassName)}>{children}</div>
      </section>
    </DashboardReveal>
  );
}
