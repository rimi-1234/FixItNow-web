import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookingDraft {
  technicianId?: string;
  serviceId?: string;
  scheduledTime?: string;
  technicianEmail?: string;
  serviceName?: string;
  servicePrice?: number;
}

interface BookingDraftState {
  draft: BookingDraft;
  step: number;
  setDraft: (draft: Partial<BookingDraft>) => void;
  setStep: (step: number) => void;
  clearDraft: () => void;
}

export const useBookingDraftStore = create<BookingDraftState>()(
  persist(
    (set) => ({
      draft: {},
      step: 0,
      setDraft: (partial) => set((s) => ({ draft: { ...s.draft, ...partial } })),
      setStep: (step) => set({ step }),
      clearDraft: () => set({ draft: {}, step: 0 }),
    }),
    {
      name: "fixitnow-booking-draft",
    }
  )
);
