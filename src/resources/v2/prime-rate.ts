// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class PrimeRate extends APIResource {
  /**
   * Série da taxa SELIC, a taxa básica de juros da economia brasileira, definida
   * pelo COPOM.
   *
   * Os dados são diários e começam em janeiro de 2000. O valor é a meta anualizada,
   * em porcentagem ao ano.
   *
   * Filtre o período com `start` e `end` no formato `DD/MM/YYYY`. Ordene por data ou
   * por valor.
   *
   * A meta muda só nas reuniões do COPOM, a cada 45 dias. Entre uma reunião e outra,
   * a série repete o mesmo valor todo dia útil.
   *
   * Plano Startup.
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
   * Os países que `/api/v2/prime-rate` aceita.
   *
   * Hoje só `brazil`, com a SELIC do Banco Central.
   *
   * Plano Startup.
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
   * Data e hora da requisição em formato ISO 8601
   */
  requestedAt: string;

  /**
   * Tempo de processamento em milissegundos
   */
  took: number;
}

export namespace PrimeRateRetrieveResponse {
  export interface PrimeRate {
    date: string;

    epochDate: number;

    /**
     * Taxa SELIC meta anualizada (% a.a.)
     */
    value: string;
  }
}

export interface PrimeRateListAvailableResponse {
  countries: Array<string>;

  message: string;

  /**
   * Data e hora da requisição em formato ISO 8601
   */
  requestedAt: string;
}

export interface PrimeRateRetrieveParams {
  /**
   * Data de fim (DD/MM/YYYY)
   */
  end?: string;

  /**
   * Incluir dados históricos (true/false)
   */
  historical?: string;

  /**
   * Campo para ordenação (date ou value)
   */
  sortBy?: string;

  /**
   * Ordem de classificação (asc ou desc)
   */
  sortOrder?: string;

  /**
   * Data de início (DD/MM/YYYY)
   */
  start?: string;
}

export interface PrimeRateListAvailableParams {
  /**
   * Formato da resposta. JSON é o formato suportado.
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
