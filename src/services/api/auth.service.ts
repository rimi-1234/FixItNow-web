import { browserApi } from "@/services/http/browser-client";
import type { User } from "@/domain/models";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  role?: "CUSTOMER" | "TECHNICIAN";
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  bio?: string;
  location?: string;
}

export const authService = {
  async login(input: LoginInput): Promise<{ user: User }> {
    return browserApi.post<undefined>("/api/auth/login", { body: input }) as Promise<{ user: User }>;
  },

  async register(input: RegisterInput): Promise<{ user: User }> {
    return browserApi.post<undefined>("/auth/register", { body: input }) as Promise<{ user: User }>;
  },

  async getMe(signal?: AbortSignal): Promise<User> {
    return browserApi.get<undefined>("/auth/me", { signal }) as Promise<User>;
  },

  async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  },
};
