// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class PrimeRate extends APIResource {
  /**
   * Retorna dados históricos da **Taxa SELIC (Sistema Especial de Liquidação e de
   * Custódia)**, a taxa básica de juros da economia brasileira, definida pelo COPOM
   * (Comitê de Política Monetária) do Banco Central.
   *
   * ### Funcionalidades
   *
   * - **Dados Diários:** Taxa SELIC diária (meta anualizada, % a.a.)
   * - **Histórico Completo:** Dados desde janeiro/2000 até a data atual
   * - **Filtros de Período:** Use `start` e `end` (formato DD/MM/YYYY)
   * - **Ordenação:** Por data ou valor, crescente ou decrescente
   *
   * ### Autenticação
   *
   * Bearer token ou query param `token`. Requer plano Startup.
   *
   * ### Exemplos de Uso
   *
   * ```bash
   * # Padrão (últimos 12 meses)
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/prime-rate"
   *
   * # Histórico completo
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/prime-rate?historical=true"
   *
   * # Período específico
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/prime-rate?start=01/01/2023&end=31/12/2023"
   *
   * # Ordenado por valor (decrescente)
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/prime-rate?historical=true&sortBy=value&sortOrder=desc"
   * ```
   *
   * ### Parâmetros de Ordenação
   *
   * - `sortBy`: `date` (padrão) ou `value`
   * - `sortOrder`: `desc` (padrão) ou `asc`
   *
   * ### Campos da Resposta
   *
   * - `date` — Data no formato DD/MM/YYYY
   * - `value` — Taxa SELIC meta anualizada (% a.a.)
   * - `epochDate` — Data em timestamp Unix (milissegundos)
   *
   * ### Sobre a SELIC
   *
   * A SELIC é a taxa básica de juros da economia brasileira e influencia todas as
   * demais taxas de juros do país (empréstimos, financiamentos, aplicações
   * financeiras). Ela é definida pelo COPOM a cada 45 dias e serve como referência
   * para o CDI.
   *
   * ### Fonte dos Dados
   *
   * Banco Central do Brasil (BCB) — Série temporal 432 do Sistema Gerador de Séries
   * Temporais (SGS)
   *
   * **Plano Mínimo:** Startup | **Autenticação:** Necessária
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
   * Retorna a lista de países disponíveis para consulta de dados de taxa de juros.
   *
   * ### Países Disponíveis
   *
   * - **brazil** — Taxa SELIC (Banco Central)
   *
   * Use o valor retornado como referência para futuras expansões do endpoint.
   *
   * ### Exemplo de Uso
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/prime-rate/available"
   * ```
   *
   * **Plano Mínimo:** Startup | **Autenticação:** Necessária
   *
   * @example
   * ```ts
   * const response = await client.v2.primeRate.listAvailable();
   * ```
   */
  listAvailable(options?: RequestOptions): APIPromise<PrimeRateListAvailableResponse> {
    return this._client.get('/api/v2/prime-rate/available', options);
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

export declare namespace PrimeRate {
  export {
    type PrimeRateRetrieveResponse as PrimeRateRetrieveResponse,
    type PrimeRateListAvailableResponse as PrimeRateListAvailableResponse,
    type PrimeRateRetrieveParams as PrimeRateRetrieveParams,
  };
}
