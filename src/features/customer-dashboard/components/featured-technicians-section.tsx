"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTechnicians } from "@/features/technicians/queries";
import { TechnicianCard } from "@/features/technicians/components/technician-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function FeaturedTechniciansSection() {
  const { data: technicians, isLoading } = useTechnicians();

  return (
    <section className="py-20 bg-surface-raised" aria-labelledby="featured-technicians-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-10 flex items-end justify-between"
        >
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
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[26rem] rounded-[var(--radius-xl)]" />
            ))}
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="Featured technicians">
            {(technicians ?? []).slice(0, 6).map((user) => (
              <li key={user.id} className="h-full">
                <TechnicianCard
                  user={user}
                  actionLabel="View profile"
                  actionVariant="outline"
                />
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
