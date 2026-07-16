"use client";

import { useDeferredValue, useState } from "react";
import { BadgeCheck, Search, Sparkles } from "lucide-react";
import { useServices } from "@/features/services/queries";
import { useCategories } from "@/features/categories/queries";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/marketing/page-hero";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { ServiceCard } from "./service-card";
import type { ServiceFilters } from "@/services/api/services.service";

interface ServicesPageContentProps {
  initialCategoryId?: string;
}

export function ServicesPageContent({ initialCategoryId }: ServicesPageContentProps) {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategoryId ?? "all");
  const deferredSearch = useDeferredValue(search.trim());
  const { data: categories } = useCategories();

  const filters: ServiceFilters = {
    ...(categoryId !== "all" && { categoryId }),
    ...(deferredSearch && { search: deferredSearch }),
  };

  const { data: services, isLoading, isError, refetch } = useServices(filters);

  return (
    <>
      <PageHero
        eyebrow="Explore services"
        title="Professional help for every corner of your home."
        description="Compare clear service options, discover skilled local professionals, and choose the right help without the usual uncertainty."
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/85 px-3 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
          <BadgeCheck className="h-4 w-4 text-success" aria-hidden="true" />
          Trusted professionals
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/85 px-3 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-warning" aria-hidden="true" />
          Clear service choices
        </span>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 rounded-[var(--radius-xl)] border border-border bg-card p-3 shadow-card sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search plumbing, cleaning, repairs…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-12 rounded-xl border-transparent bg-muted/60 pl-11 focus-visible:border-brand"
                aria-label="Search services"
              />
            </div>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="h-12 w-full rounded-xl bg-muted/60 sm:w-60" aria-label="Filter by category">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {!isLoading && !isError && services ? (
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{services.length}</span>{" "}
              {services.length === 1 ? "service" : "services"} available
            </p>
          </div>
        ) : null}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} className="h-[25rem] rounded-[var(--radius-xl)]" />
            ))}
          </div>
        ) : null}

        {isError ? <ErrorState onRetry={() => refetch()} /> : null}

        {!isLoading && !isError && services?.length === 0 ? (
          <EmptyState
            title="No services found"
            description="Try another keyword or choose a different category."
          />
        ) : null}

        {!isLoading && !isError && services && services.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {services.map((service) => (
              <li key={service.id} className="h-full">
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
