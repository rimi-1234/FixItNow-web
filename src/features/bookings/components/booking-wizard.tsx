"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, ChevronLeft, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCreateBookingMutation } from "@/features/bookings/queries";
import { useCurrentUser } from "@/features/auth/queries";
import { ROUTES } from "@/config/routes";
import { formatCurrency, formatScheduledTime } from "@/domain/formatters";
import Link from "next/link";
import type { Service } from "@/domain/models";

const bookingSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  scheduledTime: z.string().min(1, "Please select a date and time"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingWizardProps {
  technicianId: string;
  services: Service[];
}

const STEPS = ["Select Service", "Choose Time", "Confirm"];

export function BookingWizard({ technicianId, services }: BookingWizardProps) {
  const [step, setStep] = useState(0);
  const [booked, setBooked] = useState(false);
  const { data: user } = useCurrentUser();
  const { mutateAsync, isPending } = useCreateBookingMutation();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({ resolver: zodResolver(bookingSchema) });

  const selectedServiceId = watch("serviceId");
  const scheduledTime = watch("scheduledTime");
  const selectedService = services.find((s) => s.id === selectedServiceId);

  const onSubmit = async (values: BookingFormValues) => {
    await mutateAsync({
      technicianId,
      serviceId: values.serviceId,
      scheduledTime: new Date(values.scheduledTime).toISOString(),
    });
    setBooked(true);
  };

  if (!user) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground mb-3">Please log in to book this technician</p>
        <Button asChild>
          <Link href={`${ROUTES.login}?returnTo=/technicians/${technicianId}`}>Log in to book</Link>
        </Button>
      </div>
    );
  }

  if (user.role !== "CUSTOMER") {
    return (
      <div className="rounded-[var(--radius-xl)] border border-border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">Only customers can book services.</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">This technician hasn&apos;t listed any services yet.</p>
      </div>
    );
  }

  if (booked) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-success/30 bg-success/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" aria-hidden />
        <h3 className="font-semibold text-foreground text-lg mb-1">Booking Submitted!</h3>
        <p className="text-sm text-muted-foreground mb-4">
          The technician will accept or decline your request shortly.
        </p>
        <Button asChild>
          <Link href={ROUTES.dashboard.customer.bookings}>View my bookings</Link>
        </Button>
      </div>
    );
  }

  // Step indicator
  const stepIndicator = (
    <nav aria-label="Booking steps" className="mb-6">
      <ol className="flex items-center gap-0">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <span className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                i === step ? "bg-brand text-brand-foreground" :
                i < step ? "bg-success text-success-foreground" :
                "bg-muted text-muted-foreground"
              )}>
                {i < step ? "✓" : i + 1}
              </span>
              <span className={cn("text-xs font-medium hidden sm:block", i === step ? "text-foreground" : "text-muted-foreground")}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && <div className="h-px w-8 mx-2 bg-border" aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
      {stepIndicator}

      {/* Step 0: Select service */}
      {step === 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-foreground mb-3">
            Select a service
          </legend>
          <div className="space-y-2">
            {services.map((service) => (
              <label
                key={service.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-[var(--radius-md)] border-2 cursor-pointer transition-all",
                  selectedServiceId === service.id
                    ? "border-brand bg-brand-subtle"
                    : "border-border hover:border-brand/40"
                )}
              >
                <input
                  type="radio"
                  className="sr-only"
                  value={service.id}
                  {...register("serviceId")}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{service.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{service.description}</p>
                </div>
                <span className="text-sm font-bold text-brand ml-3 shrink-0">{formatCurrency(service.price)}</span>
              </label>
            ))}
          </div>
          {errors.serviceId && <p className="text-xs text-danger mt-1">{errors.serviceId.message}</p>}

          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              onClick={() => selectedServiceId && setStep(1)}
              disabled={!selectedServiceId}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </fieldset>
      )}

      {/* Step 1: Choose time */}
      {step === 1 && (
        <div>
          <div className="space-y-1.5">
            <Label htmlFor="scheduledTime" className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden />
              Date and time
            </Label>
            <Input
              id="scheduledTime"
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              {...register("scheduledTime")}
              aria-describedby={errors.scheduledTime ? "time-error" : undefined}
              aria-invalid={!!errors.scheduledTime}
            />
            {errors.scheduledTime && (
              <p id="time-error" className="text-xs text-danger">{errors.scheduledTime.message}</p>
            )}
          </div>

          <div className="mt-4 flex gap-2 justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(0)}>
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              type="button"
              onClick={() => scheduledTime && setStep(2)}
              disabled={!scheduledTime}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Confirm */}
      {step === 2 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Booking summary</h3>
          <div className="rounded-[var(--radius-md)] border border-border bg-muted/30 p-4 space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium text-foreground">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price</span>
              <span className="font-bold text-brand">{selectedService ? formatCurrency(selectedService.price) : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scheduled time</span>
              <span className="font-medium text-foreground">{scheduledTime ? formatScheduledTime(scheduledTime) : "—"}</span>
            </div>
          </div>

          <div className="flex gap-2 justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button type="submit" loading={isPending} disabled={isPending}>
              {isPending ? "Booking…" : "Confirm Booking"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
