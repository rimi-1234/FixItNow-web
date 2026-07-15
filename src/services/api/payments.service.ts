import { browserApi } from "@/services/http/browser-client";
import { apiPaths } from "@/config/api-paths";
import type { Payment } from "@/domain/models";
import type { PaymentProvider } from "@/domain/enums";

export interface CreatePaymentInput {
  bookingId: string;
  provider?: PaymentProvider;
}

export interface CreatePaymentResult {
  paymentUrl?: string;
  sessionUrl?: string;
  url?: string;
  payment?: Payment;
}

export const paymentsService = {
  async create(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    return browserApi.post<undefined>(apiPaths.payments.create, {
      body: input,
    }) as Promise<CreatePaymentResult>;
  },

  async list(signal?: AbortSignal): Promise<Payment[]> {
    return browserApi.get<undefined>(apiPaths.payments.list, { signal }) as Promise<Payment[]>;
  },

  async getById(id: string, signal?: AbortSignal): Promise<Payment> {
    return browserApi.get<undefined>(apiPaths.payments.detail(id), { signal }) as Promise<Payment>;
  },
};
