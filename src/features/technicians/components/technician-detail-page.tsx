"use client";

import { MapPin, Briefcase, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useTechnicianDetail } from "@/features/technicians/queries";
import { useServices } from "@/features/services/queries";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/feedback/error-state";
import { ServiceCard } from "@/features/services/components/service-card";
import { BookingWizard } from "@/features/bookings/components/booking-wizard";
import { formatCurrency } from "@/domain/formatters";
import { ROUTES } from "@/config/routes";

export function TechnicianDetailPage({ id }: { id: string }) {
  const { data: user, isLoading, isError, refetch } = useTechnicianDetail(id);
  const { data: services } = useServices({ technicianId: id });

  const profile = user?.technicianProfile;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-40 w-full rounded-[var(--radius-xl)]" />
        <Skeleton className="h-60 w-full rounded-[var(--radius-xl)]" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  const initials = user.email[0]?.toUpperCase() ?? "T";

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link
        href={ROUTES.technicians}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Back to technicians
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-brand-subtle flex items-center justify-center text-brand font-bold text-2xl mb-3">
                {initials}
              </div>
              <h1 className="font-bold text-foreground text-lg">{user.email}</h1>
              <p className="text-xs text-muted-foreground capitalize mt-0.5">Technician</p>

              {profile?.hourlyRate !== undefined && (
                <p className="mt-2 text-xl font-bold text-brand">{formatCurrency(profile.hourlyRate)}<span className="text-sm text-muted-foreground font-normal">/hr</span></p>
              )}
            </div>

            <div className="mt-4 space-y-2 text-sm">
              {profile?.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                  {profile.location}
                </div>
              )}
              {profile?.experience !== undefined && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4 shrink-0" aria-hidden />
                  {profile.experience} years experience
                </div>
              )}
              {profile?.availability && profile.availability.length > 0 && (
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
                  <span>{profile.availability.join(", ")}</span>
                </div>
              )}
            </div>

            {profile?.skills && profile.skills.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-foreground mb-2">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            {profile?.bio && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs font-semibold text-foreground mb-1">About</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{profile.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Services & Booking */}
        <div className="lg:col-span-2 space-y-6">
          {/* Services */}
          {services && services.length > 0 && (
            <section aria-labelledby="services-heading">
              <h2 id="services-heading" className="text-lg font-semibold text-foreground mb-4">
                Services offered
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4" role="list">
                {services.map((service) => (
                  <li key={service.id}>
                    <ServiceCard service={service} showBookButton={false} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Booking wizard */}
          <section aria-labelledby="booking-heading">
            <h2 id="booking-heading" className="text-lg font-semibold text-foreground mb-4">
              Book this technician
            </h2>
            <BookingWizard technicianId={id} services={services ?? []} />
          </section>
        </div>
      </div>
    </div>
  );
}
