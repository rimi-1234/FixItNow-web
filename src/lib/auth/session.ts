import { cookies } from "next/headers";
import { createServerApiClient } from "@/services/http/server-client";
import type { User } from "@/domain/models";

const SESSION_COOKIE = "fixitnow_session";

export const SESSION_COOKIE_OPTIONS = {
  name: SESSION_COOKIE,
  httpOnly: true,
  secure: process.env["NODE_ENV"] === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24, // 24 hours
};

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function getSessionUser(): Promise<User | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    const api = createServerApiClient(token);
    const user = await api.get<undefined>("/api/auth/me") as User;
    return user;
  } catch {
    return null;
  }
}

export async function setSessionToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, SESSION_COOKIE_OPTIONS);
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
