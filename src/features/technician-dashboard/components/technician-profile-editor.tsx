"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCurrentUser } from "@/features/auth/queries";
import { useUpdateTechnicianProfileMutation } from "@/features/technicians/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const profileSchema = z.object({
  skills: z.string(),
  experience: z.string(),
  hourlyRate: z.string(),
  bio: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function TechnicianProfileEditor() {
  const { data: user, isLoading } = useCurrentUser();
  const { mutateAsync, isPending } = useUpdateTechnicianProfileMutation();
  const profile = user?.technicianProfile;

  const { register, handleSubmit } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      skills: profile?.skills?.join(", ") ?? "",
      experience: String(profile?.experience ?? 0),
      hourlyRate: String(profile?.hourlyRate ?? 0),
      bio: profile?.bio ?? "",
      location: profile?.location ?? "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    await mutateAsync({
      skills: values.skills.split(",").map((s) => s.trim()).filter(Boolean),
      experience: Number(values.experience),
      hourlyRate: Number(values.hourlyRate),
      bio: values.bio || undefined,
      location: values.location || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-lg">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-80 w-full rounded-[var(--radius-xl)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold text-foreground">My Profile</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-brand-subtle flex items-center justify-center text-brand font-bold text-xl">
              {user?.email[0]?.toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-base">{user?.email}</CardTitle>
              <p className="text-xs text-muted-foreground">Technician</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="tp-skills">Skills</Label>
              <Input id="tp-skills" placeholder="Plumbing, Electrical, …" {...register("skills")} />
              <p className="text-xs text-muted-foreground">Separate with commas</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="tp-exp">Experience (years)</Label>
                <Input id="tp-exp" type="number" min="0" {...register("experience")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tp-rate">Hourly rate (BDT)</Label>
                <Input id="tp-rate" type="number" min="0" {...register("hourlyRate")} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tp-location">Service area</Label>
              <Input id="tp-location" placeholder="e.g. Dhaka, Chittagong" {...register("location")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tp-bio">Bio</Label>
              <Input id="tp-bio" placeholder="Brief description of your expertise" {...register("bio")} />
            </div>
            <Button type="submit" className="w-full" loading={isPending} disabled={isPending}>
              {isPending ? "Saving…" : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
