import { createHttpClient } from "./http-client";
import { serverEnv } from "@/config/env";

// Server-side → Express directly (with Bearer token attached)
export function createServerApiClient(accessToken?: string) {
  return createHttpClient(serverEnv.API_BASE_URL, async () => {
    const headers: Record<string, string> = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return headers;
  });
}

// Public server client (no auth)
export const serverApi = createHttpClient(serverEnv.API_BASE_URL);
