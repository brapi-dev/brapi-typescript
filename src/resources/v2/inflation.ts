// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Acompanhe os principais indicadores econômicos do Brasil, incluindo inflação (IPCA, IGP-M) e Taxa Selic.
 */
export class Inflation extends APIResource {
  /**
   * Retorna dados históricos do **IPCA (Índice Nacional de Preços ao Consumidor
   * Amplo)**, o índice oficial de inflação do Brasil, medido pelo IBGE.
   *
   * ### Funcionalidades
   *
   * - **Dados Mensais:** Variação percentual mensal do IPCA
   * - **Histórico Completo:** Dados desde janeiro/2000 até o mês atual
   * - **Filtros de Período:** Use `start` e `end` para definir período específico
   *   (formato DD/MM/YYYY)
   * - **Ordenação:** Ordene por data ou valor, crescente ou decrescente
   *
   * ### Autenticação
   *
   * Bearer token ou query param `token`. Requer plano Startup.
   *
   * ### Exemplos de Uso
   *
   * ```bash
   * # Padrão (últimos 12 meses)
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/inflation"
   *
   * # Histórico completo
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/inflation?historical=true"
   *
   * # Período específico
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/inflation?start=01/01/2023&end=31/12/2023"
   *
   * # Ordenado por valor (decrescente)
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/inflation?historical=true&sortBy=value&sortOrder=desc"
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
   * - `value` — Variação percentual do IPCA no mês
   * - `epochDate` — Data em timestamp Unix (milissegundos)
   *
   * ### Sobre o IPCA
   *
   * O IPCA é o índice oficial de inflação do Brasil, calculado mensalmente pelo
   * IBGE. Ele mede a variação de preços de uma cesta de produtos e serviços
   * consumidos pelas famílias brasileiras.
   *
   * ### Fonte dos Dados
   *
   * Banco Central do Brasil (BCB) — Série temporal 13522 do Sistema Gerador de
   * Séries Temporais (SGS)
   *
   * **Plano Mínimo:** Startup | **Autenticação:** Necessária
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
   * Retorna a lista de países disponíveis para consulta de dados de inflação.
   *
   * ### Países Disponíveis
   *
   * - **brazil** — Dados do IPCA (IBGE)
   *
   * Use o valor retornado como referência para futuras expansões do endpoint.
   *
   * ### Exemplo de Uso
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/inflation/available"
   * ```
   *
   * **Plano Mínimo:** Startup | **Autenticação:** Necessária
   *
   * @example
   * ```ts
   * const response = await client.v2.inflation.listAvailable();
   * ```
   */
  listAvailable(options?: RequestOptions): APIPromise<InflationListAvailableResponse> {
    return this._client.get('/api/v2/inflation/available', options);
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

export declare namespace Inflation {
  export {
    type InflationRetrieveResponse as InflationRetrieveResponse,
    type InflationListAvailableResponse as InflationListAvailableResponse,
    type InflationRetrieveParams as InflationRetrieveParams,
  };
}
