import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_DEFAULT_CURRENCY: z.string().default("BDT"),
  NEXT_PUBLIC_DEFAULT_TIMEZONE: z.string().default("Asia/Dhaka"),
  NEXT_PUBLIC_PAYMENT_SUCCESS_URL: z
    .string()
    .url()
    .default("http://localhost:3000/payment/success"),
  NEXT_PUBLIC_PAYMENT_CANCEL_URL: z
    .string()
    .url()
    .default("http://localhost:3000/payment/cancel"),
});

const serverEnvSchema = z.object({
  API_BASE_URL: z.string().url().default("http://localhost:5000"),
  SESSION_SECRET: z.string().min(16).default("fixitnow-dev-secret-change-in-production"),
});

// Client-safe env (NEXT_PUBLIC_ only)
export const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"],
  NEXT_PUBLIC_DEFAULT_CURRENCY: process.env["NEXT_PUBLIC_DEFAULT_CURRENCY"],
  NEXT_PUBLIC_DEFAULT_TIMEZONE: process.env["NEXT_PUBLIC_DEFAULT_TIMEZONE"],
  NEXT_PUBLIC_PAYMENT_SUCCESS_URL: process.env["NEXT_PUBLIC_PAYMENT_SUCCESS_URL"],
  NEXT_PUBLIC_PAYMENT_CANCEL_URL: process.env["NEXT_PUBLIC_PAYMENT_CANCEL_URL"],
});

// Server-only env (do NOT import in Client Components)
export const serverEnv = serverEnvSchema.parse({
  API_BASE_URL: process.env["API_BASE_URL"],
  SESSION_SECRET: process.env["SESSION_SECRET"],
});
