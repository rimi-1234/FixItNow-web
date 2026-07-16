"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Clock3,
  Settings2,
  Star,
  UserRoundCog,
  Wrench,
} from "lucide-react";
import { useTechnicianBookings } from "@/features/bookings/queries";
import { useCurrentUser } from "@/features/auth/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardHero,
  DashboardMetric,
  DashboardPanel,
} from "@/components/dashboard/dashboard-presentation";
import { ROUTES } from "@/config/routes";
import { getBookingStatusPresentation } from "@/domain/policies/booking.policy";
import { formatScheduledTime } from "@/domain/formatters";
import type { Booking, TechnicianProfile } from "@/domain/models";

const BADGE_VARIANT_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  warning: "warning" as const,
  danger: "danger" as const,
  info: "info" as const,
};

function BookingStatusBadge({ booking }: { booking: Booking }) {
  const { label, color } = getBookingStatusPresentation(booking.status);
  const badgeVariant = BADGE_VARIANT_MAP[color] ?? "secondary";
  return <Badge variant={badgeVariant}>{label}</Badge>;
}

function getProfileCompletion(profile: TechnicianProfile | null | undefined): number {
  if (!profile) return 0;
  const checks = [
    profile.skills.length > 0,
    profile.experience > 0,
    profile.hourlyRate > 0,
    Boolean(profile.bio),
    Boolean(profile.location),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export function TechnicianOverview() {
  const { data: user } = useCurrentUser();
  const { data: bookings, isLoading } = useTechnicianBookings();

  const pending = bookings?.filter((booking) => booking.status === "REQUESTED").length ?? 0;
  const active =
    bookings?.filter((booking) => ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(booking.status)).length ?? 0;
  const completed = bookings?.filter((booking) => booking.status === "COMPLETED").length ?? 0;
  const recentBookings = bookings?.slice(0, 5) ?? [];
  const profileCompletion = getProfileCompletion(user?.technicianProfile ?? null);
  const pipelineTotal = Math.max(pending + active + completed, 1);

  return (
    <div className="space-y-6 lg:space-y-8">
      <DashboardHero
        eyebrow="Technician workspace"
        title="Turn incoming requests into great service."
        description="Stay ahead of new jobs, keep customers informed, and maintain a professional service profile from one focused workspace."
        imageSrc="/images/hero/home-services-hero.webp"
        imageAlt="Professional home-service technicians"
        mediaLabel="Active jobs"
        mediaValue={isLoading ? "—" : active}
        tone="accent"
        actions={
          <>
            <Button asChild className="rounded-xl">
              <Link href={ROUTES.dashboard.technician.bookings}>
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Open booking inbox
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-xl bg-card/60">
              <Link href={ROUTES.dashboard.technician.services}>
                Manage services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Job summary">
        <DashboardMetric
          icon={Clock3}
          label="Pending requests"
          value={pending}
          supportingText="Waiting for your response"
          href={ROUTES.dashboard.technician.bookings}
          loading={isLoading}
          tone="warning"
          delay={0.04}
        />
        <DashboardMetric
          icon={BriefcaseBusiness}
          label="Active jobs"
          value={active}
          supportingText="Accepted or in progress"
          href={ROUTES.dashboard.technician.bookings}
          loading={isLoading}
          tone="accent"
          delay={0.08}
        />
        <DashboardMetric
          icon={CheckCircle2}
          label="Completed"
          value={completed}
          supportingText="Successfully finished jobs"
          href={ROUTES.dashboard.technician.bookings}
          loading={isLoading}
          tone="success"
          delay={0.12}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <DashboardPanel
          className="lg:col-span-8"
          eyebrow="Inbox"
          title="Recent booking requests"
          description="Review the latest jobs and keep their status moving."
          delay={0.14}
          contentClassName="p-0 sm:p-0"
          action={
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.dashboard.technician.bookings}>
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          }
        >
          {isLoading ? (
            <div className="space-y-3 p-5 sm:p-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-52 max-w-full" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">Your booking inbox is clear</h3>
              <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                New customer requests will appear here as soon as they arrive.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border/60" role="list" aria-label="Recent booking requests">
              {recentBookings.map((booking) => (
                <li key={booking.id} className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/40 sm:px-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Wrench className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {booking.service?.name ?? "Service request"}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {booking.customer?.email ?? "Customer"} · {formatScheduledTime(booking.scheduledTime)}
                    </p>
                  </div>
                  <BookingStatusBadge booking={booking} />
                </li>
              ))}
            </ul>
          )}
        </DashboardPanel>

        <div className="space-y-6 lg:col-span-4">
          <DashboardPanel
            eyebrow="Professional profile"
            title="Profile readiness"
            description="A complete profile helps customers book with confidence."
            delay={0.18}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-bold tracking-[-0.04em] text-foreground">{profileCompletion}%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {profileCompletion === 100 ? "Profile complete" : "Keep improving your profile"}
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
                <UserRoundCog className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div
              className="mt-5 h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-label="Profile completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={profileCompletion}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <Button variant="outline" size="sm" className="mt-5 w-full" asChild>
              <Link href={ROUTES.dashboard.technician.profile}>
                Update profile
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </DashboardPanel>

          <DashboardPanel
            eyebrow="Job flow"
            title="Pipeline snapshot"
            delay={0.2}
          >
            <div className="space-y-4">
              {[
                { label: "Pending", value: pending, className: "bg-warning" },
                { label: "Active", value: active, className: "bg-accent" },
                { label: "Completed", value: completed, className: "bg-success" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${item.className}`}
                      style={{ width: `${(item.value / pipelineTotal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DashboardPanel>

          <DashboardPanel
            eyebrow="Shortcuts"
            title="Manage your work"
            delay={0.22}
            contentClassName="p-2 sm:p-2"
          >
            <ul role="list" className="divide-y divide-border/60">
              {[
                { href: ROUTES.dashboard.technician.services, label: "Service catalog", icon: Settings2 },
                { href: ROUTES.dashboard.technician.availability, label: "Availability", icon: Calendar },
                { href: ROUTES.dashboard.technician.reviews, label: "Customer reviews", icon: Star },
              ].map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                    <span className="flex-1">{label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </DashboardPanel>
        </div>
      </div>
    </div>
  );
}
