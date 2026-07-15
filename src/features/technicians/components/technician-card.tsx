"use client";

import Link from "next/link";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/domain/formatters";
import { ROUTES } from "@/config/routes";
import type { User } from "@/domain/models";

interface TechnicianCardProps {
  user: User;
}

export function TechnicianCard({ user }: TechnicianCardProps) {
  const profile = user.technicianProfile;
  const initials = user.email[0]?.toUpperCase() ?? "T";

  return (
    <article className="flex flex-col rounded-[var(--radius-xl)] border border-border bg-card p-5 hover:border-brand/40 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start gap-3 mb-3">
        <div className="h-12 w-12 rounded-full bg-brand-subtle flex items-center justify-center text-brand font-bold text-lg shrink-0 group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground text-sm truncate">{user.email}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
            {profile?.experience !== undefined && (
              <span className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" aria-hidden="true" />
                {profile.experience}yr
              </span>
            )}
            {profile?.location && (
              <span className="flex items-center gap-1 truncate">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                {profile.location}
              </span>
            )}
          </div>
        </div>
        {profile?.hourlyRate !== undefined && (
          <div className="shrink-0 text-right">
            <p className="text-sm font-bold text-foreground">{formatCurrency(profile.hourlyRate)}</p>
            <p className="text-xs text-muted-foreground">/hr</p>
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
            <Badge variant="outline" className="text-xs">+{profile.skills.length - 3} more</Badge>
          )}
        </div>
      )}

      {/* Availability preview */}
      {profile?.availability && profile.availability.length > 0 && (
        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
          <Clock className="h-3 w-3" aria-hidden="true" />
          Available: {profile.availability.slice(0, 2).join(", ")}
          {profile.availability.length > 2 && ` +${profile.availability.length - 2} more`}
        </p>
      )}

      {profile?.bio && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{profile.bio}</p>
      )}

      <Button size="sm" className="mt-auto w-full" asChild>
        <Link href={`${ROUTES.technicians}/${user.id}`}>
          Book this technician
        </Link>
      </Button>
    </article>
  );
}
