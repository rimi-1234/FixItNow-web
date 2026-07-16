"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EntityImage } from "@/components/ui/entity-image";
import { resolveServiceImage } from "@/config/placeholder-media";
import { formatCurrency } from "@/domain/formatters";
import { ROUTES } from "@/config/routes";
import type { Service } from "@/domain/models";

interface ServiceCardProps {
  service: Service;
  showBookButton?: boolean;
}

export function ServiceCard({ service, showBookButton = true }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
    >
      <EntityImage
        src={resolveServiceImage(service)}
        alt={`${service.name} service illustration`}
        aspect="service"
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div>
            {service.category && (
              <Badge className="border border-white/50 bg-white/90 text-slate-900 shadow-sm backdrop-blur-md">
                <Tag className="mr-1 h-3 w-3" aria-hidden="true" />
                {service.category.name}
              </Badge>
            )}
          </div>
          <span className="ml-auto rounded-xl border border-white/15 bg-slate-950/70 px-3 py-1.5 text-sm font-bold text-white shadow-lg backdrop-blur-md">
            {formatCurrency(service.price)}
          </span>
        </div>
      </EntityImage>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-brand">
          {service.name}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        {service.technician && (
          <p className="mt-4 truncate border-t border-border/70 pt-3 text-xs text-muted-foreground">
            Provided by <span className="font-medium text-foreground">{service.technician.email}</span>
          </p>
        )}

        {showBookButton && (
          <Button size="sm" className="mt-4 w-full" asChild>
            <Link href={`${ROUTES.technicians}/${service.technicianId}`}>
              Book this service
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
    </motion.article>
  );
}
