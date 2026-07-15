"use client";

import { useState } from "react";
import { Plus, X, Clock } from "lucide-react";
import { useCurrentUser } from "@/features/auth/queries";
import { useUpdateAvailabilityMutation } from "@/features/technicians/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TechnicianAvailabilityManager() {
  const { data: user } = useCurrentUser();
  const { mutate, isPending } = useUpdateAvailabilityMutation();

  const initialSlots = user?.technicianProfile?.availability ?? [];
  const [slots, setSlots] = useState<string[]>(initialSlots);
  const [newSlot, setNewSlot] = useState("");

  const addSlot = () => {
    const trimmed = newSlot.trim();
    if (!trimmed || slots.includes(trimmed)) return;
    setSlots((prev) => [...prev, trimmed]);
    setNewSlot("");
  };

  const removeSlot = (slot: string) => {
    setSlots((prev) => prev.filter((s) => s !== slot));
  };

  const save = () => {
    mutate(slots);
  };

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold text-foreground">Availability</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden /> Available Time Slots
          </CardTitle>
          <CardDescription>
            Add time slots to let customers know when you're available. E.g. "Monday 9am–5pm", "Weekdays", "Sat–Sun 10am–4pm"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing slots */}
          {slots.length > 0 && (
            <div className="flex flex-wrap gap-2" aria-label="Current availability slots">
              {slots.map((slot) => (
                <Badge key={slot} variant="secondary" className="flex items-center gap-1 pr-1.5 py-1">
                  {slot}
                  <button
                    onClick={() => removeSlot(slot)}
                    className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                    aria-label={`Remove ${slot}`}
                  >
                    <X className="h-3 w-3" aria-hidden />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add slot */}
          <div className="flex gap-2">
            <Input
              placeholder="e.g. Monday 9am–5pm"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSlot())}
              aria-label="New availability slot"
            />
            <Button type="button" variant="outline" size="icon" onClick={addSlot} aria-label="Add slot">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            className="w-full"
            loading={isPending}
            disabled={isPending}
            onClick={save}
          >
            {isPending ? "Saving…" : "Save Availability"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
