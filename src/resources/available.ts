// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Ferramentas auxiliares para descobrir ativos disponíveis e verificar a saúde da API.
 */
export class Available extends APIResource {
  /**
   * Lista todos os ativos que a API aceita: ações, FIIs, BDRs e ETFs da B3, mais os
   * índices com cotação disponível.
   *
   * Filtre por código ou nome com `search`.
   *
   * ```bash
   * curl "https://brapi.dev/api/available?search=PETR"
   * ```
   *
   * Endpoint público, sem token. A resposta fica em cache por 15 minutos e é
   * atualizada conforme novos ativos entram na bolsa.
   *
   * Para busca com filtros por setor e tipo, `/api/v2/tickers` é mais completo.
   *
   * @example
   * ```ts
   * const availables = await client.available.list();
   * ```
   */
  list(
    query: AvailableListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AvailableListResponse> {
    return this._client.get('/api/available', { query, ...options });
  }
}

export interface AvailableListResponse {
  /**
   * Lista de índices disponíveis
   */
  indexes: Array<string>;

  /**
   * Lista de códigos de ações disponíveis
   */
  stocks: Array<string>;
}

export interface AvailableListParams {
  /**
   * Filtrar ações e índices por nome ou código
   */
  search?: string;
}

export declare namespace Available {
  export {
    type AvailableListResponse as AvailableListResponse,
    type AvailableListParams as AvailableListParams,
  };
}
