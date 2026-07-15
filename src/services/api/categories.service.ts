import { browserApi } from "@/services/http/browser-client";
import { apiPaths } from "@/config/api-paths";
import type { Category } from "@/domain/models";

export const categoriesService = {
  async list(signal?: AbortSignal): Promise<Category[]> {
    return browserApi.get<undefined>(apiPaths.categories.list, { signal }) as Promise<Category[]>;
  },

  async adminList(signal?: AbortSignal): Promise<Category[]> {
    return browserApi.get<undefined>(apiPaths.admin.categories.list, { signal }) as Promise<Category[]>;
  },

  async create(input: { name: string; slug: string }): Promise<Category> {
    return browserApi.post<undefined>(apiPaths.admin.categories.create, {
      body: input,
    }) as Promise<Category>;
  },

  async update(id: string, input: Partial<{ name: string; slug: string }>): Promise<Category> {
    return browserApi.patch<undefined>(apiPaths.admin.categories.update(id), {
      body: input,
    }) as Promise<Category>;
  },

  async delete(id: string): Promise<void> {
    await browserApi.delete<undefined>(apiPaths.admin.categories.delete(id));
  },
};
