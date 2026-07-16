"use client";

import { useState } from "react";
import { CalendarClock, CheckCircle2, Clock, Info, Plus, X } from "lucide-react";
import { useCurrentUser } from "@/features/auth/queries";
import { useUpdateAvailabilityMutation } from "@/features/technicians/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function AvailabilityEditor({ initialSlots }: { initialSlots: string[] }) {
  const { mutate, isPending } = useUpdateAvailabilityMutation();
  const [slots, setSlots] = useState(initialSlots);
  const [newSlot, setNewSlot] = useState("");

  const addSlot = () => {
    const trimmed = newSlot.trim();
    if (!trimmed || slots.includes(trimmed)) return;
    setSlots((current) => [...current, trimmed]);
    setNewSlot("");
  };

  const removeSlot = (slot: string) => {
    setSlots((current) => current.filter((item) => item !== slot));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/25">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <CardTitle className="text-base">Available time slots</CardTitle>
              <CardDescription className="mt-1 leading-5">
                Add clear windows such as “Monday 9am–5pm”, “Weekdays”, or “Sat–Sun 10am–4pm”.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Current schedule
            </p>
            {slots.length > 0 ? (
              <div className="flex flex-wrap gap-2" aria-label="Current availability slots">
                {slots.map((slot) => (
                  <Badge key={slot} variant="secondary" className="gap-1.5 py-1.5 pl-3 pr-1.5">
                    {slot}
                    <button
                      type="button"
                      onClick={() => removeSlot(slot)}
                      className="rounded-full p-1 transition-colors hover:bg-foreground/10"
                      aria-label={`Remove ${slot}`}
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/25 px-4 py-7 text-center">
                <CalendarClock className="mx-auto h-6 w-6 text-muted-foreground" aria-hidden="true" />
                <p className="mt-2 text-sm font-medium text-foreground">No time slots added yet</p>
                <p className="mt-1 text-xs text-muted-foreground">Add your first availability window below.</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="availability-slot" className="mb-2 block text-sm font-semibold text-foreground">
              Add a time slot
            </label>
            <div className="flex gap-2">
              <Input
                id="availability-slot"
                placeholder="e.g. Monday 9am–5pm"
                value={newSlot}
                onChange={(event) => setNewSlot(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSlot();
                  }
                }}
              />
              <Button type="button" variant="outline" size="icon" onClick={addSlot} aria-label="Add slot">
                <Plus className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <Button className="w-full sm:w-auto" loading={isPending} disabled={isPending} onClick={() => mutate(slots)}>
            {isPending ? "Saving…" : "Save availability"}
          </Button>
        </CardContent>
      </Card>

      <Card className="h-fit bg-brand-subtle/55 shadow-sm">
        <CardContent className="p-6">
          <Info className="h-5 w-5 text-brand" aria-hidden="true" />
          <h2 className="mt-4 font-semibold text-foreground">Make availability easy to scan</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground" role="list">
            {["Use a day or day range.", "Include start and end times.", "Keep each slot short and specific."].map((tip) => (
              <li key={tip} className="flex gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export function TechnicianAvailabilityManager() {
  const { data: user } = useCurrentUser();
  const initialSlots = user?.technicianProfile?.availability ?? [];
  const editorKey = initialSlots.join("|");

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Schedule</p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-foreground">Availability</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Show customers when you usually accept work. You can update these windows at any time.
        </p>
      </header>
      <AvailabilityEditor key={editorKey} initialSlots={initialSlots} />
    </div>
  );
}
