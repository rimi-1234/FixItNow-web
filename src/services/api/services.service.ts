import { browserApi } from "@/services/http/browser-client";
import { apiPaths } from "@/config/api-paths";
import type { Service } from "@/domain/models";

export interface ServiceFilters {
  categoryId?: string;
  technicianId?: string;
  search?: string;
}

export interface CreateServiceInput {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}

export const servicesService = {
  async list(filters?: ServiceFilters, signal?: AbortSignal): Promise<Service[]> {
    return browserApi.get<undefined>(apiPaths.services.list, {
      query: filters as Record<string, string | number | boolean | null | undefined>,
      signal,
    }) as Promise<Service[]>;
  },

  async create(input: CreateServiceInput): Promise<Service> {
    return browserApi.post<undefined>(apiPaths.services.create, {
      body: input,
    }) as Promise<Service>;
  },

  async update(id: string, input: Partial<CreateServiceInput>): Promise<Service> {
    return browserApi.patch<undefined>(apiPaths.services.update(id), {
      body: input,
    }) as Promise<Service>;
  },

  async delete(id: string): Promise<void> {
    await browserApi.delete<undefined>(apiPaths.services.delete(id));
  },
};
