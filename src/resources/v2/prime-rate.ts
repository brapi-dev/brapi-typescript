// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class PrimeRate extends APIResource {
  /**
   * Série diária da meta da taxa Selic, definida pelo Copom, em % ao ano.
   *
   * Endpoint descontinuado. Use as
   * [séries macroeconômicas](https://brapi.dev/docs/macro) com `symbols=selic`.
   *
   * Sem filtros, devolve os últimos 12 meses. Filtre com `start` e `end` no formato
   * `DD/MM/YYYY`. A meta só muda nas reuniões do Copom, então a série repete o mesmo
   * valor entre uma reunião e outra.
   *
   * Planos Startup e Pro.
   *
   * @example
   * ```ts
   * const primeRate = await client.v2.primeRate.retrieve();
   * ```
   */
  retrieve(
    query: PrimeRateRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PrimeRateRetrieveResponse> {
    return this._client.get('/api/v2/prime-rate', { query, ...options });
  }

  /**
   * Lista os países que o endpoint da Selic aceita. Hoje só `brazil`.
   *
   * Endpoint descontinuado. Use as
   * [séries macroeconômicas](https://brapi.dev/docs/macro). Planos Startup e Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.primeRate.listAvailable();
   * ```
   */
  listAvailable(
    query: PrimeRateListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PrimeRateListAvailableResponse> {
    return this._client.get('/api/v2/prime-rate/available', { query, ...options });
  }
}

export interface PrimeRateRetrieveResponse {
  'prime-rate': Array<PrimeRateRetrieveResponse.PrimeRate>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace PrimeRateRetrieveResponse {
  export interface PrimeRate {
    date: string;

    epochDate: number;

    /**
     * Meta da Selic, em % ao ano.
     */
    value: string;
  }
}

export interface PrimeRateListAvailableResponse {
  countries: Array<string>;

  message: string;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;
}

export interface PrimeRateRetrieveParams {
  /**
   * Data final no formato DD/MM/YYYY. Padrão: hoje.
   */
  end?: string;

  /**
   * true devolve a série desde 01/01/2000. Sem datas e sem este parâmetro, devolve
   * os últimos 12 meses.
   */
  historical?: string;

  /**
   * Campo de ordenação: date ou value. Padrão: date.
   */
  sortBy?: string;

  /**
   * Ordem: asc ou desc. Padrão: desc.
   */
  sortOrder?: string;

  /**
   * Data inicial no formato DD/MM/YYYY.
   */
  start?: string;
}

export interface PrimeRateListAvailableParams {
  /**
   * Formato da resposta. Só aceita json.
   */
  format?: 'json';
}

export declare namespace PrimeRate {
  export {
    type PrimeRateRetrieveResponse as PrimeRateRetrieveResponse,
    type PrimeRateListAvailableResponse as PrimeRateListAvailableResponse,
    type PrimeRateRetrieveParams as PrimeRateRetrieveParams,
    type PrimeRateListAvailableParams as PrimeRateListAvailableParams,
  };
}
