"use client";

import { createHttpClient } from "./http-client";

// Browser → same-origin Next.js API routes (BFF)
// The Next.js BFF attaches the Bearer token server-side before forwarding to Express
const BFF_BASE = "/api/bff";

export const browserApi = createHttpClient(BFF_BASE);
