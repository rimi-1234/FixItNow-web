import { browserApi } from "@/services/http/browser-client";
import { apiPaths } from "@/config/api-paths";
import type { User } from "@/domain/models";

export const adminService = {
  async listUsers(signal?: AbortSignal): Promise<User[]> {
    return browserApi.get<undefined>(apiPaths.admin.users.list, { signal }) as Promise<User[]>;
  },

  async updateUserStatus(
    id: string,
    status: "ACTIVE" | "BANNED"
  ): Promise<User> {
    return browserApi.patch<undefined>(apiPaths.admin.users.updateStatus(id), {
      body: { status },
    }) as Promise<User>;
  },
};
