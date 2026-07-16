"use client";

import { useDeferredValue, useState } from "react";
import { BadgeCheck, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useTechnicians } from "@/features/technicians/queries";
import { PageHero } from "@/components/marketing/page-hero";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { TechnicianCard } from "./technician-card";
import type { TechnicianFilters } from "@/services/api/technicians.service";

export function TechniciansPageContent() {
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const deferredSearch = useDeferredValue(search.trim());
  const deferredSkill = useDeferredValue(skill.trim());
  const deferredLocation = useDeferredValue(location.trim());

  const filters: TechnicianFilters = {
    ...(deferredSearch && { search: deferredSearch }),
    ...(deferredSkill && { skill: deferredSkill }),
    ...(deferredLocation && { location: deferredLocation }),
  };

  const { data: technicians, isLoading, isError, refetch } = useTechnicians(filters);

  return (
    <>
      <PageHero
        eyebrow="Meet the professionals"
        title="Skilled people. Clear profiles. Confident choices."
        description="Browse local technicians by specialty and service area, then review their experience before choosing who comes into your home."
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/85 px-3 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
          <BadgeCheck className="h-4 w-4 text-success" aria-hidden="true" />
          Active professionals
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/85 px-3 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
          <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
          Search by service area
        </span>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 rounded-[var(--radius-xl)] border border-border bg-card p-3 shadow-card sm:p-4">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem_13rem]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search by email…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-12 rounded-xl border-transparent bg-muted/60 pl-11 focus-visible:border-brand"
                aria-label="Search technicians"
              />
            </div>
            <Input
              placeholder="Skill, e.g. Plumbing"
              value={skill}
              onChange={(event) => setSkill(event.target.value)}
              className="h-12 rounded-xl border-transparent bg-muted/60 focus-visible:border-brand"
              aria-label="Filter by skill"
            />
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Service area"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-12 rounded-xl border-transparent bg-muted/60 pl-11 focus-visible:border-brand"
                aria-label="Filter by location"
              />
            </div>
          </div>
        </div>

        {!isLoading && !isError && technicians ? (
          <p className="mb-5 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{technicians.length}</span>{" "}
            {technicians.length === 1 ? "professional" : "professionals"} available
          </p>
        ) : null}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[29rem] rounded-[var(--radius-xl)]" />
            ))}
          </div>
        ) : null}

        {isError ? <ErrorState onRetry={() => refetch()} /> : null}

        {!isLoading && !isError && technicians?.length === 0 ? (
          <EmptyState
            icon={SlidersHorizontal}
            title="No professionals found"
            description="Try broader search terms or clear one of your filters."
          />
        ) : null}

        {!isLoading && !isError && technicians && technicians.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Technicians">
            {technicians.map((user) => (
              <li key={user.id} className="h-full">
                <TechnicianCard user={user} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
