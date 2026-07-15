"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useTechnicians } from "@/features/technicians/queries";
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

  const filters: TechnicianFilters = {
    ...(search && { search }),
    ...(skill && { skill }),
    ...(location && { location }),
  };

  const { data: technicians, isLoading, isError, refetch } = useTechnicians(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Browse Technicians</h1>
        <p className="mt-2 text-muted-foreground">Find skilled professionals ready to help</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            aria-label="Search technicians"
          />
        </div>
        <Input
          placeholder="Filter by skill…"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="w-full sm:w-40"
          aria-label="Filter by skill"
        />
        <Input
          placeholder="Filter by location…"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-44"
          aria-label="Filter by location"
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-[var(--radius-xl)]" />)}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isLoading && !isError && technicians?.length === 0 && (
        <EmptyState
          icon={SlidersHorizontal}
          title="No technicians found"
          description="Try different search terms or clear your filters"
        />
      )}

      {!isLoading && !isError && technicians && technicians.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="Technicians">
          {technicians.map((user) => (
            <li key={user.id}>
              <TechnicianCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
