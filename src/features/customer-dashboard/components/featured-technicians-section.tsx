"use client";

import Link from "next/link";
import { Star, MapPin, Briefcase } from "lucide-react";
import { useTechnicians } from "@/features/technicians/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { formatCurrency } from "@/domain/formatters";
import type { User } from "@/domain/models";

function TechnicianCard({ user }: { user: User }) {
  const profile = user.technicianProfile;
  const initials = user.email[0]?.toUpperCase() ?? "T";

  return (
    <div className="flex flex-col rounded-[var(--radius-xl)] border border-border bg-card p-5 hover:border-brand/40 hover:shadow-md transition-all duration-200 group">
      {/* Avatar + info */}
      <div className="flex items-start gap-3 mb-3">
        <div className="h-12 w-12 rounded-full bg-brand-subtle flex items-center justify-center text-brand font-bold text-lg shrink-0 group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">{user.email}</p>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
            {profile?.experience !== undefined && (
              <span className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" aria-hidden="true" />
                {profile.experience}yr exp
              </span>
            )}
            {profile?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {profile.location}
              </span>
            )}
          </div>
        </div>
        {profile?.hourlyRate !== undefined && (
          <div className="ml-auto shrink-0 text-right">
            <span className="text-sm font-bold text-foreground">{formatCurrency(profile.hourlyRate)}</span>
            <span className="text-xs text-muted-foreground">/hr</span>
          </div>
        )}
      </div>

      {/* Skills */}
      {profile?.skills && profile.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3" aria-label="Skills">
          {profile.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
          ))}
          {profile.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">+{profile.skills.length - 3}</Badge>
          )}
        </div>
      )}

      <Button size="sm" variant="outline" className="mt-auto w-full" asChild>
        <Link href={`${ROUTES.technicians}/${user.id}`}>View profile</Link>
      </Button>
    </div>
  );
}

export function FeaturedTechniciansSection() {
  const { data: technicians, isLoading } = useTechnicians();

  return (
    <section className="py-20 bg-surface-raised" aria-labelledby="featured-technicians-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 id="featured-technicians-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Top-rated professionals
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Skilled, verified, and ready to help
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden sm:flex">
            <Link href={ROUTES.technicians}>View all</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-[var(--radius-xl)]" />
            ))}
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="Featured technicians">
            {(technicians ?? []).slice(0, 6).map((user) => (
              <li key={user.id}>
                <TechnicianCard user={user} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href={ROUTES.technicians}>Browse all technicians</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
