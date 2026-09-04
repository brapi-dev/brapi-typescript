// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Inflation extends APIResource {
  /**
   * Série do IPCA, o índice oficial de inflação do Brasil, publicada pelo Banco
   * Central.
   *
   * Os dados são mensais e começam em janeiro de 2000. Cada ponto é a variação
   * percentual do mês, não o acumulado do ano.
   *
   * Filtre o período com `start` e `end` no formato `DD/MM/YYYY`. Ordene por data ou
   * por valor.
   *
   * O IPCA sai por volta do dia 10 do mês seguinte. O mês corrente nunca está na
   * série.
   *
   * Plano Startup.
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
   * Os países que `/api/v2/inflation` aceita.
   *
   * Hoje só `brazil`, com o IPCA publicado pelo Banco Central.
   *
   * Plano Startup.
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
   * Data e hora da requisição em formato ISO 8601
   */
  requestedAt: string;

  /**
   * Tempo de processamento em milissegundos
   */
  took: number;
}

export namespace InflationRetrieveResponse {
  export interface Inflation {
    date: string;

    epochDate: number;

    /**
     * Variação percentual do IPCA no mês
     */
    value: string;
  }
}

export interface InflationListAvailableResponse {
  countries: Array<string>;

  message: string;

  /**
   * Data e hora da requisição em formato ISO 8601
   */
  requestedAt: string;
}

export interface InflationRetrieveParams {
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

export interface InflationListAvailableParams {
  /**
   * Formato da resposta. JSON é o formato suportado.
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
