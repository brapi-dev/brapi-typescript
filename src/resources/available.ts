// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Ferramentas auxiliares para descobrir ativos disponíveis e verificar a saúde da API.
 */
export class Available extends APIResource {
  /**
   * Lista simples de tickers aceitos pela API: ativos brasileiros, como ações, FIIs,
   * BDRs e ETFs, em `stocks`, e índices em `indexes`.
   *
   * Use para validar um ticker ou preencher uma lista de opções.
   *
   * `search` filtra por parte do ticker. Tickers antigos não entram na lista. A
   * lista é atualizada a cada 15 minutos.
   *
   * Não exige token. Para filtros por setor e tipo, use a
   * [lista de tickers](https://brapi.dev/docs/tickers).
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
   * Tickers de índices.
   */
  indexes: Array<string>;

  /**
   * Tickers de ativos.
   */
  stocks: Array<string>;
}

export interface AvailableListParams {
  /**
   * Parte do ticker. Filtra ativos e índices.
   */
  search?: string;
}

export declare namespace Available {
  export {
    type AvailableListResponse as AvailableListResponse,
    type AvailableListParams as AvailableListParams,
  };
}
