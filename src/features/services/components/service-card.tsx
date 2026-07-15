"use client";

import Link from "next/link";
import { MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/domain/formatters";
import { ROUTES } from "@/config/routes";
import type { Service } from "@/domain/models";

interface ServiceCardProps {
  service: Service;
  showBookButton?: boolean;
}

export function ServiceCard({ service, showBookButton = true }: ServiceCardProps) {
  return (
    <article className="flex flex-col rounded-[var(--radius-xl)] border border-border bg-card p-5 hover:border-brand/40 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-foreground text-sm line-clamp-1">{service.name}</h3>
        <span className="text-base font-bold text-brand shrink-0">{formatCurrency(service.price)}</span>
      </div>

      {service.category && (
        <div className="flex items-center gap-1 mb-2">
          <Tag className="h-3 w-3 text-muted-foreground" aria-hidden />
          <Badge variant="secondary" className="text-xs">{service.category.name}</Badge>
        </div>
      )}

      <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mb-3">{service.description}</p>

      {service.technician && (
        <p className="text-xs text-muted-foreground mb-3">by {service.technician.email}</p>
      )}

      {showBookButton && (
        <Button size="sm" className="mt-auto" asChild>
          <Link href={`${ROUTES.technicians}/${service.technicianId}`}>
            Book this service
          </Link>
        </Button>
      )}
    </article>
  );
}
