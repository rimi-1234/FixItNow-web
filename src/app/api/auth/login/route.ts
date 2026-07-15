import { NextRequest, NextResponse } from "next/server";
import { serverEnv } from "@/config/env";
import { setSessionToken } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email?: string; password?: string };

    const response = await fetch(`${serverEnv.API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json() as {
      success?: boolean;
      message?: string;
      data?: { accessToken?: string; user?: unknown };
    };

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, message: data.message ?? "Login failed" },
        { status: response.status }
      );
    }

    const { accessToken, user } = data.data ?? {};

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "No token received" },
        { status: 500 }
      );
    }

    await setSessionToken(accessToken as string);

    return NextResponse.json({ success: true, data: { user } });
  } catch (error) {
    console.error("[Auth/Login] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
