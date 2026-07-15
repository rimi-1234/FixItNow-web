import { browserApi } from "@/services/http/browser-client";
import { apiPaths } from "@/config/api-paths";
import type { User, TechnicianProfile } from "@/domain/models";

export interface TechnicianFilters {
  skill?: string;
  location?: string;
  minExperience?: number;
  minRating?: number;
  search?: string;
}

export interface UpdateProfileInput {
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  bio?: string;
  location?: string;
}

export const techniciansService = {
  async list(filters?: TechnicianFilters, signal?: AbortSignal): Promise<User[]> {
    return browserApi.get<undefined>(apiPaths.technicians.list, {
      query: filters as Record<string, string | number | boolean | null | undefined>,
      signal,
    }) as Promise<User[]>;
  },

  async getById(id: string, signal?: AbortSignal): Promise<User> {
    return browserApi.get<undefined>(apiPaths.technicians.detail(id), { signal }) as Promise<User>;
  },

  async updateProfile(input: UpdateProfileInput): Promise<TechnicianProfile> {
    return browserApi.put<undefined>(apiPaths.technicians.profile, {
      body: input,
    }) as Promise<TechnicianProfile>;
  },

  async updateAvailability(availability: string[]): Promise<TechnicianProfile> {
    return browserApi.put<undefined>(apiPaths.technicians.availability, {
      body: { availability },
    }) as Promise<TechnicianProfile>;
  },
};
