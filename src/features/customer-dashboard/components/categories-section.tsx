"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Wrench, Zap, Paintbrush, Waves, Wind, Hammer, Sparkles, Settings } from "lucide-react";
import { useCategories } from "@/features/categories/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { EntityImage } from "@/components/ui/entity-image";
import { resolveCategoryImage } from "@/config/placeholder-media";
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
              <Skeleton key={i} className="aspect-[4/3] h-auto w-full rounded-[var(--radius-xl)]" />
            ))}
          </div>
        ) : (
          <ul
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            role="list"
          >
            {(categories ?? []).map((cat, idx) => {
              const Icon = getIcon(cat.slug);
              return (
                <motion.li
                  key={cat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.42,
                    delay: Math.min(idx * 0.055, 0.32),
                    ease: "easeOut",
                  }}
                  className="h-full"
                >
                  <Link
                    href={`${ROUTES.services}?categoryId=${cat.id}`}
                    className="group block h-full overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                  >
                    <EntityImage
                      src={resolveCategoryImage(cat)}
                      alt={`${cat.name} service category illustration`}
                      aspect="category"
                    >
                      <div className="flex h-full flex-col justify-between p-3.5 sm:p-4">
                        <span className="mr-auto rounded-xl border border-white/50 bg-white/90 p-2.5 text-brand shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                        </span>
                        <span className="flex items-center justify-between gap-2 text-left text-sm font-semibold text-white sm:text-base">
                          <span>{cat.name}</span>
                          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </div>
                    </EntityImage>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 text-center">
          <Link
            href={ROUTES.services}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            Browse all services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
