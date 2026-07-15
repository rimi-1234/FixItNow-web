import { browserApi } from "@/services/http/browser-client";
import { apiPaths } from "@/config/api-paths";
import type { Payment } from "@/domain/models";
import type { PaymentProvider } from "@/domain/enums";

export interface CreatePaymentInput {
  bookingId: string;
  provider?: PaymentProvider;
}

export interface CreatePaymentResult {
  provider?: PaymentProvider;
  gatewayUrl?: string;
  sessionId?: string;
  paymentUrl?: string;
  sessionUrl?: string;
  url?: string;
  payment?: Payment;
}

export interface SyncPaymentSessionResult {
  synced: boolean;
  paymentStatus?: string;
  bookingId?: string | null;
  payment?: Payment | null;
}

export function getPaymentRedirectUrl(result: CreatePaymentResult): string | null {
  return result.gatewayUrl ?? result.paymentUrl ?? result.sessionUrl ?? result.url ?? null;
}

export const paymentsService = {
  async create(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    return browserApi.post<undefined>(apiPaths.payments.create, {
      body: input,
    }) as Promise<CreatePaymentResult>;
  },

  async syncSession(sessionId: string): Promise<SyncPaymentSessionResult> {
    return browserApi.post<undefined>(apiPaths.payments.syncSession, {
      body: { sessionId },
    }) as Promise<SyncPaymentSessionResult>;
  },

  async list(signal?: AbortSignal): Promise<Payment[]> {
    return browserApi.get<undefined>(apiPaths.payments.list, { signal }) as Promise<Payment[]>;
  },

  async getById(id: string, signal?: AbortSignal): Promise<Payment> {
    return browserApi.get<undefined>(apiPaths.payments.detail(id), { signal }) as Promise<Payment>;
  },
};
