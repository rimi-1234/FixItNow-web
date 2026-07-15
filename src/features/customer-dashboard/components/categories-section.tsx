"use client";

import Link from "next/link";
import { Wrench, Zap, Paintbrush, Waves, Wind, Hammer, Sparkles, Settings } from "lucide-react";
import { useCategories } from "@/features/categories/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/config/routes";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  plumbing: Waves,
  electrical: Zap,
  painting: Paintbrush,
  cleaning: Sparkles,
  carpentry: Hammer,
  "air-conditioning": Wind,
  repair: Wrench,
  default: Settings,
};

const CATEGORY_COLORS: string[] = [
  "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400",
  "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
  "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  "bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400",
  "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
];

function getIcon(slug: string): React.ElementType {
  return CATEGORY_ICONS[slug] ?? CATEGORY_ICONS["default"]!;
}

export function CategoriesSection() {
  const { data: categories, isLoading } = useCategories();

  return (
    <section className="py-20 bg-surface-raised" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="categories-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What do you need fixed?
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Choose from our wide range of professional home services
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-[var(--radius-xl)]" />
            ))}
          </div>
        ) : (
          <ul
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            role="list"
          >
            {(categories ?? []).map((cat, idx) => {
              const Icon = getIcon(cat.slug);
              const colorClass = CATEGORY_COLORS[idx % CATEGORY_COLORS.length] ?? CATEGORY_COLORS[0]!;
              return (
                <li key={cat.id}>
                  <Link
                    href={`${ROUTES.services}?categoryId=${cat.id}`}
                    className="flex flex-col items-center gap-3 p-5 rounded-[var(--radius-xl)] border border-border bg-card hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center group"
                  >
                    <span className={`rounded-[var(--radius-lg)] p-3 ${colorClass} transition-colors`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-foreground group-hover:text-brand transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 text-center">
          <Link
            href={ROUTES.services}
            className="text-sm text-brand font-medium hover:underline"
          >
            Browse all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
