// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Dados da conta autenticada, como plano atual e uso da janela vigente.
 */
export class User extends APIResource {
  /**
   * Quanto da sua cota você já gastou na janela atual.
   *
   * A resposta traz `planName` (`free`, `startup` ou `pro`), `planLimit` com o
   * limite do plano, `currentUsage` com o consumo registrado, `remainingUsage` com o
   * saldo, `usageWindow` indicando se a contagem é por ciclo de cobrança ou por 30
   * dias móveis, e `subscriptionPeriod` com o período atual da assinatura.
   *
   * A contagem vem do mesmo cache que o limitador usa, então ela pode ficar alguns
   * segundos atrás do consumo real.
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/user/usage"
   * ```
   *
   * @example
   * ```ts
   * const response = await client.v2.user.usage();
   * ```
   */
  usage(
    query: UserUsageParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserUsageResponse> {
    return this._client.get('/api/v2/user/usage', { query, ...options });
  }
}

export interface UserUsageResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  usage: UserUsageResponse.Usage;
}

export namespace UserUsageResponse {
  export interface Usage {
    currentUsage: number;

    planLimit: number;

    planName: 'free' | 'startup' | 'pro';

    remainingUsage: number;

    subscriptionPeriod: Usage.SubscriptionPeriod;

    usageWindow: Usage.UsageWindow;
  }

  export namespace Usage {
    export interface SubscriptionPeriod {
      end: string | null;

      start: string | null;
    }

    export interface UsageWindow {
      end: string;

      start: string;

      type: 'billing-cycle' | 'rolling-30d';
    }
  }
}

export interface UserUsageParams {
  /**
   * Formato da resposta. JSON é o formato suportado.
   */
  format?: 'json';
}

export declare namespace User {
  export { type UserUsageResponse as UserUsageResponse, type UserUsageParams as UserUsageParams };
}
