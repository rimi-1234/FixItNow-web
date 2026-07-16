"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Briefcase, Clock, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EntityImage } from "@/components/ui/entity-image";
import { resolveTechnicianImage } from "@/config/placeholder-media";
import { formatCurrency } from "@/domain/formatters";
import { ROUTES } from "@/config/routes";
import type { User } from "@/domain/models";

interface TechnicianCardProps {
  user: User;
  actionLabel?: string;
  actionVariant?: "default" | "outline";
}

export function TechnicianCard({
  user,
  actionLabel = "Book this technician",
  actionVariant = "default",
}: TechnicianCardProps) {
  const profile = user.technicianProfile;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
    >
      <EntityImage
        src={resolveTechnicianImage(user)}
        alt={`Profile illustration for ${user.email}`}
        aspect="technician"
        imageClassName="object-[center_28%]"
      >
        <div className="flex h-full flex-col justify-between p-4">
          <Badge className="mr-auto border border-white/50 bg-white/90 text-slate-900 shadow-sm backdrop-blur-md">
            <ShieldCheck className="mr-1 h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            Verified professional
          </Badge>
          {profile?.hourlyRate !== undefined && (
            <span className="ml-auto rounded-xl border border-white/15 bg-slate-950/70 px-3 py-1.5 text-sm font-bold text-white shadow-lg backdrop-blur-md">
              {formatCurrency(profile.hourlyRate)}
              <span className="ml-0.5 text-[11px] font-medium text-white/70">/hr</span>
            </span>
          )}
        </div>
      </EntityImage>

      <div className="flex flex-1 flex-col p-5">
        <p className="truncate text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-brand">
          {user.email}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {profile?.experience !== undefined && (
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              {profile.experience}yr experience
            </span>
          )}
          {profile?.location && (
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
              <span className="truncate">{profile.location}</span>
            </span>
          )}
        </div>

        {profile?.skills && profile.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
            {profile.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {profile.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {profile?.availability && profile.availability.length > 0 && (
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-success" aria-hidden="true" />
            Available: {profile.availability.slice(0, 2).join(", ")}
            {profile.availability.length > 2 && ` +${profile.availability.length - 2} more`}
          </p>
        )}

        {profile?.bio && (
          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        )}

        <Button size="sm" variant={actionVariant} className="mt-4 w-full" asChild>
          <Link href={`${ROUTES.technicians}/${user.id}`}>
            {actionLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}
