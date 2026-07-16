import { z } from "zod";
import { ApiError } from "./api-error";

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue | QueryValue[]>;

function appendQuery(target: URLSearchParams, query: QueryParams) {
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) {
        if (v !== null && v !== undefined) {
          target.append(key, String(v));
        }
      }
    } else {
      target.set(key, String(value));
    }
  }
}

function buildUrl(base: string, path: string, query?: QueryParams): string {
  const normalized = `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  // Relative BFF paths (e.g. /api/bff/...) work with fetch(), but `new URL()`
  // requires an absolute URL unless a base is provided.
  if (!/^https?:\/\//i.test(normalized)) {
    if (!query) return normalized;
    const params = new URLSearchParams();
    appendQuery(params, query);
    const qs = params.toString();
    return qs ? `${normalized}?${qs}` : normalized;
  }

  const url = new URL(normalized);
  if (query) appendQuery(url.searchParams, query);
  return url.toString();
}

type RequestOptions<TSchema extends z.ZodTypeAny | undefined = undefined> = Omit<
  RequestInit,
  "body"
> & {
  schema?: TSchema;
  query?: QueryParams;
  body?: unknown;
  timeoutMs?: number;
};

type InferOutput<TSchema extends z.ZodTypeAny | undefined> =
  TSchema extends z.ZodTypeAny ? z.output<TSchema> : unknown;

export async function httpRequest<TSchema extends z.ZodTypeAny | undefined = undefined>(
  baseUrl: string,
  path: string,
  options: RequestOptions<TSchema> = {}
): Promise<InferOutput<TSchema>> {
  const { schema, query, body, timeoutMs = 30_000, signal, ...fetchInit } = options;

  const url = buildUrl(baseUrl, path, query);

  // Merge abort signals
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const combinedSignal = controller.signal;
  if (signal) {
    signal.addEventListener("abort", () => controller.abort());
    if (signal.aborted) controller.abort();
  }

  // Build headers
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(fetchInit.headers as Record<string, string>),
  };

  // Serialize body
  let serializedBody: BodyInit | null = null;
  if (body !== undefined && body !== null) {
    if (body instanceof FormData) {
      serializedBody = body;
    } else {
      headers["Content-Type"] = "application/json";
      serializedBody = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchInit,
      headers,
      body: serializedBody,
      signal: combinedSignal,
    });

    clearTimeout(timeoutId);

    // 204 No Content
    if (response.status === 204) {
      return undefined as InferOutput<TSchema>;
    }

    // Try to parse JSON
    const contentType = response.headers.get("content-type") ?? "";
    let json: unknown;

    if (contentType.includes("application/json")) {
      json = await response.json();
    } else {
      const text = await response.text();
      if (!response.ok) {
        throw new ApiError(
          text || `Request failed with status ${response.status}`,
          response.status,
          "NON_JSON_ERROR"
        );
      }
      return text as InferOutput<TSchema>;
    }

    // Check for error response
    if (!response.ok) {
      const errorBody = json as {
        success?: boolean;
        message?: string;
        errorDetails?: unknown;
      };
      throw new ApiError(
        errorBody?.message ?? `Request failed with status ${response.status}`,
        response.status,
        undefined,
        errorBody?.errorDetails,
        response.headers.get("x-request-id") ?? undefined
      );
    }

    // Unwrap success envelope: { success, message, data }
    const envelope = json as {
      success?: boolean;
      message?: string;
      data?: unknown;
    };

    // Some routes return data directly (not wrapped), handle both
    const result = envelope?.data !== undefined ? envelope.data : json;

    if (schema) {
      const parsed = schema.safeParse(result);
      if (!parsed.success) {
        console.warn("[API] Response validation failed:", parsed.error.issues);
        // Don't throw — return raw data to avoid crashing UI on minor schema drift
      } else {
        return parsed.data as InferOutput<TSchema>;
      }
    }

    return result as InferOutput<TSchema>;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) throw error;

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timed out or was cancelled", 408, "TIMEOUT");
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0,
      "NETWORK_ERROR"
    );
  }
}

export type HttpClient = {
  get: <TSchema extends z.ZodTypeAny | undefined = undefined>(
    path: string,
    options?: Omit<RequestOptions<TSchema>, "method" | "body">
  ) => Promise<InferOutput<TSchema>>;
  post: <TSchema extends z.ZodTypeAny | undefined = undefined>(
    path: string,
    options?: Omit<RequestOptions<TSchema>, "method">
  ) => Promise<InferOutput<TSchema>>;
  put: <TSchema extends z.ZodTypeAny | undefined = undefined>(
    path: string,
    options?: Omit<RequestOptions<TSchema>, "method">
  ) => Promise<InferOutput<TSchema>>;
  patch: <TSchema extends z.ZodTypeAny | undefined = undefined>(
    path: string,
    options?: Omit<RequestOptions<TSchema>, "method">
  ) => Promise<InferOutput<TSchema>>;
  delete: <TSchema extends z.ZodTypeAny | undefined = undefined>(
    path: string,
    options?: Omit<RequestOptions<TSchema>, "method">
  ) => Promise<InferOutput<TSchema>>;
};

export function createHttpClient(baseUrl: string, getHeaders?: () => Promise<Record<string, string>>): HttpClient {
  async function req<TSchema extends z.ZodTypeAny | undefined = undefined>(
    method: string,
    path: string,
    options: RequestOptions<TSchema> = {}
  ): Promise<InferOutput<TSchema>> {
    const extraHeaders = getHeaders ? await getHeaders() : {};
    return httpRequest(baseUrl, path, {
      ...options,
      method,
      headers: { ...extraHeaders, ...(options.headers as Record<string, string>) },
    });
  }

  return {
    get: (path, options) => req("GET", path, options),
    post: (path, options) => req("POST", path, options),
    put: (path, options) => req("PUT", path, options),
    patch: (path, options) => req("PATCH", path, options),
    delete: (path, options) => req("DELETE", path, options),
  };
}
