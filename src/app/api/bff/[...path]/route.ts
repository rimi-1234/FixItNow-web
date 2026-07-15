import { NextRequest, NextResponse } from "next/server";
import { serverEnv } from "@/config/env";
import { getSessionToken } from "@/lib/auth/session";

// Strict allowlist of path prefixes that can be proxied
const ALLOWED_PREFIXES = [
  "/auth/me",
  "/auth/register",
  "/services",
  "/technicians",
  "/technician",
  "/categories",
  "/bookings",
  "/payments",
  "/reviews",
  "/admin",
];

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const MAX_BODY_SIZE = 1_048_576; // 1 MB

function isAllowedPath(path: string): boolean {
  return ALLOWED_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix + "/"));
}

async function handler(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path: pathSegments } = await context.params;
  const apiPath = "/" + pathSegments.join("/");

  if (!isAllowedPath(apiPath)) {
    return NextResponse.json({ success: false, message: "Not allowed" }, { status: 403 });
  }

  const method = req.method.toUpperCase();
  if (!ALLOWED_METHODS.includes(method)) {
    return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
  }

  // Forward query string
  const searchParams = req.nextUrl.searchParams.toString();
  const targetUrl = `${serverEnv.API_BASE_URL}/api${apiPath}${searchParams ? "?" + searchParams : ""}`;

  // Build headers
  const headers: Record<string, string> = {
    "Content-Type": req.headers.get("content-type") ?? "application/json",
    Accept: "application/json",
  };

  // Attach Bearer token if session exists
  const token = await getSessionToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Forward body (with size limit)
  let body: BodyInit | null = null;
  if (!["GET", "HEAD"].includes(method)) {
    const contentLength = parseInt(req.headers.get("content-length") ?? "0", 10);
    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json({ success: false, message: "Request too large" }, { status: 413 });
    }
    body = await req.text();
  }

  try {
    const upstream = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    let responseBody: string | null = null;

    if (contentType.includes("application/json")) {
      responseBody = await upstream.text();
    } else {
      responseBody = await upstream.text();
    }

    const response = new NextResponse(responseBody, {
      status: upstream.status,
      headers: { "Content-Type": contentType || "application/json" },
    });

    return response;
  } catch (error) {
    console.error("[BFF Proxy] Error:", error);
    return NextResponse.json(
      { success: false, message: "Upstream request failed" },
      { status: 502 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
