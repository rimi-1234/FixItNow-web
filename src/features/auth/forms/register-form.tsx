"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/features/auth/queries";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  role: z.enum(["CUSTOMER", "TECHNICIAN"]),
  skills: z.string().optional(),
  experience: z.string().optional(),
  hourlyRate: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({ code: "custom", message: "Passwords don't match", path: ["confirmPassword"] });
  }

  if (data.role === "TECHNICIAN") {
    if (!data.skills?.trim()) {
      ctx.addIssue({ code: "custom", message: "Add at least one skill", path: ["skills"] });
    }
    if (!data.location?.trim()) {
      ctx.addIssue({ code: "custom", message: "Service area is required", path: ["location"] });
    }

    const experience = Number(data.experience ?? 0);
    if (!Number.isInteger(experience) || experience < 0) {
      ctx.addIssue({ code: "custom", message: "Enter a valid number of years", path: ["experience"] });
    }

    const hourlyRate = Number(data.hourlyRate ?? 0);
    if (!Number.isFinite(hourlyRate) || hourlyRate < 0) {
      ctx.addIssue({ code: "custom", message: "Enter a valid hourly rate", path: ["hourlyRate"] });
    }
  }
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"CUSTOMER" | "TECHNICIAN">("CUSTOMER");
  const { mutateAsync, isPending } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "CUSTOMER" },
  });

  const onRoleSelect = (role: "CUSTOMER" | "TECHNICIAN") => {
    setSelectedRole(role);
    setValue("role", role, { shouldValidate: true });
  };

  const onSubmit = async (values: RegisterFormValues) => {
    const payload: Parameters<typeof mutateAsync>[0] = {
      email: values.email,
      password: values.password,
      role: values.role,
    };

    if (values.role === "TECHNICIAN") {
      payload.skills = values.skills?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
      payload.experience = Number(values.experience ?? 0);
      payload.hourlyRate = Number(values.hourlyRate ?? 0);
      payload.bio = values.bio;
      payload.location = values.location;
    }

    await mutateAsync(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Role selection */}
      <div className="space-y-1.5">
        <Label>I want to</Label>
        <div className="grid grid-cols-2 gap-3">
          {(["CUSTOMER", "TECHNICIAN"] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => onRoleSelect(role)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-[var(--radius-lg)] border-2 transition-all text-sm font-medium",
                selectedRole === role
                  ? "border-brand bg-brand-subtle text-brand"
                  : "border-border bg-surface hover:border-brand/40 text-muted-foreground"
              )}
              aria-pressed={selectedRole === role}
            >
              {role === "CUSTOMER" ? <User className="h-5 w-5" /> : <Wrench className="h-5 w-5" />}
              {role === "CUSTOMER" ? "Book Services" : "Offer Services"}
            </button>
          ))}
        </div>
        {selectedRole === "TECHNICIAN" && (
          <p className="text-xs text-muted-foreground mt-1">
            You&apos;ll need to provide your skills, experience, and hourly rate.
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="reg-email">Email address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input id="reg-email" type="email" autoComplete="email" placeholder="you@example.com" className="pl-10" {...register("email")} />
        </div>
        {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="reg-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input id="reg-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Min 6 characters" className="pl-10 pr-10" {...register("password")} />
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide" : "Show"}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <Label htmlFor="reg-confirm">Confirm password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input id="reg-confirm" type="password" autoComplete="new-password" placeholder="Repeat password" className="pl-10" {...register("confirmPassword")} />
        </div>
        {errors.confirmPassword && <p className="text-xs text-danger">{errors.confirmPassword.message}</p>}
      </div>

      {/* Technician-specific fields */}
      {selectedRole === "TECHNICIAN" && (
        <div className="space-y-4 rounded-[var(--radius-lg)] border border-border bg-muted/30 p-4">
          <p className="text-sm font-medium text-foreground">Professional details</p>

          <div className="space-y-1.5">
            <Label htmlFor="skills">Skills <span className="text-danger">*</span></Label>
            <Input id="skills" placeholder="e.g. Plumbing, Electrical, Painting" {...register("skills")} />
            {errors.skills ? (
              <p className="text-xs text-danger">{errors.skills.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Separate multiple skills with commas</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="experience">Experience (years)</Label>
              <Input id="experience" type="number" min="0" placeholder="0" {...register("experience")} />
              {errors.experience && <p className="text-xs text-danger">{errors.experience.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hourlyRate">Hourly rate (BDT)</Label>
              <Input id="hourlyRate" type="number" min="0" placeholder="0" {...register("hourlyRate")} />
              {errors.hourlyRate && <p className="text-xs text-danger">{errors.hourlyRate.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="location">Service area <span className="text-danger">*</span></Label>
            <Input id="location" placeholder="e.g. Dhaka, Chittagong" {...register("location")} />
            {errors.location && <p className="text-xs text-danger">{errors.location.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio (optional)</Label>
            <Input id="bio" placeholder="Brief description of your work" {...register("bio")} />
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" loading={isPending} disabled={isPending}>
        {isPending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
