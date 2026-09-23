// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Inflation extends APIResource {
  /**
   * Série mensal do IPCA acumulado em 12 meses, o índice oficial de inflação do
   * Brasil. Cada ponto é o acumulado dos 12 meses até aquela data.
   *
   * Endpoint descontinuado. Use as
   * [séries macroeconômicas](https://brapi.dev/docs/macro) com `symbols=ipca12m`
   * para o acumulado ou `symbols=ipca` para a variação do mês.
   *
   * Sem filtros, devolve os últimos 12 meses. Filtre com `start` e `end` no formato
   * `DD/MM/YYYY`. O IPCA de um mês sai no mês seguinte.
   *
   * Planos Startup e Pro.
   *
   * @example
   * ```ts
   * const inflation = await client.v2.inflation.retrieve();
   * ```
   */
  retrieve(
    query: InflationRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InflationRetrieveResponse> {
    return this._client.get('/api/v2/inflation', { query, ...options });
  }

  /**
   * Lista os países que o endpoint de inflação aceita. Hoje só `brazil`.
   *
   * Endpoint descontinuado. Use as
   * [séries macroeconômicas](https://brapi.dev/docs/macro). Planos Startup e Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.inflation.listAvailable();
   * ```
   */
  listAvailable(
    query: InflationListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InflationListAvailableResponse> {
    return this._client.get('/api/v2/inflation/available', { query, ...options });
  }
}

export interface InflationRetrieveResponse {
  inflation: Array<InflationRetrieveResponse.Inflation>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace InflationRetrieveResponse {
  export interface Inflation {
    date: string;

    epochDate: number;

    /**
     * IPCA acumulado em 12 meses, em %.
     */
    value: string;
  }
}

export interface InflationListAvailableResponse {
  countries: Array<string>;

  message: string;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;
}

export interface InflationRetrieveParams {
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

export interface InflationListAvailableParams {
  /**
   * Formato da resposta. Só aceita json.
   */
  format?: 'json';
}

export declare namespace Inflation {
  export {
    type InflationRetrieveResponse as InflationRetrieveResponse,
    type InflationListAvailableResponse as InflationListAvailableResponse,
    type InflationRetrieveParams as InflationRetrieveParams,
    type InflationListAvailableParams as InflationListAvailableParams,
  };
}
