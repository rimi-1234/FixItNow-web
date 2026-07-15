export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: unknown,
    public readonly requestId?: string
  ) {
    super(message);
    this.name = "ApiError";
  }

  get isValidationError(): boolean {
    return this.status === 400 || this.status === 422;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isConflict(): boolean {
    return this.status === 409;
  }

  get isRateLimit(): boolean {
    return this.status === 429;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }
}

export type FieldErrors = Record<string, string | string[]>;

export function extractFieldErrors(details: unknown): FieldErrors {
  if (!details || typeof details !== "object") return {};
  const d = details as Record<string, unknown>;

  // Flat map of field → message
  const result: FieldErrors = {};
  for (const [key, value] of Object.entries(d)) {
    if (typeof value === "string") {
      result[key] = value;
    } else if (Array.isArray(value)) {
      result[key] = value.filter((v) => typeof v === "string") as string[];
    } else if (value && typeof value === "object") {
      const nested = value as Record<string, unknown>;
      if (typeof nested["message"] === "string") {
        result[key] = nested["message"];
      }
    }
  }
  return result;
}
