import { browserApi } from "@/services/http/browser-client";
import { apiPaths } from "@/config/api-paths";
import type { Booking } from "@/domain/models";
import type { BookingStatus } from "@/domain/enums";

export interface CreateBookingInput {
  technicianId: string;
  serviceId: string;
  scheduledTime: string;
}

export const bookingsService = {
  async create(input: CreateBookingInput): Promise<Booking> {
    return browserApi.post<undefined>(apiPaths.bookings.create, {
      body: input,
    }) as Promise<Booking>;
  },

  async list(signal?: AbortSignal): Promise<Booking[]> {
    return browserApi.get<undefined>(apiPaths.bookings.list, { signal }) as Promise<Booking[]>;
  },

  async getById(id: string, signal?: AbortSignal): Promise<Booking> {
    return browserApi.get<undefined>(apiPaths.bookings.detail(id), { signal }) as Promise<Booking>;
  },

  async cancel(id: string): Promise<Booking> {
    return browserApi.patch<undefined>(apiPaths.bookings.cancel(id)) as Promise<Booking>;
  },

  async listTechnicianBookings(signal?: AbortSignal): Promise<Booking[]> {
    return browserApi.get<undefined>(apiPaths.technicians.bookings, { signal }) as Promise<Booking[]>;
  },

  async updateTechnicianBookingStatus(
    id: string,
    status: BookingStatus
  ): Promise<Booking> {
    return browserApi.patch<undefined>(apiPaths.technicians.updateBookingStatus(id), {
      body: { status },
    }) as Promise<Booking>;
  },

  async adminList(signal?: AbortSignal): Promise<Booking[]> {
    return browserApi.get<undefined>(apiPaths.admin.bookings.list, { signal }) as Promise<Booking[]>;
  },
};
