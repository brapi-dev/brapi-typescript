// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PropertiesAPI from './properties';
import * as PortfolioAPI from './portfolio';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Acesse dados completos de FIIs: cotações, indicadores fundamentalistas (P/VP, DY), relatórios gerenciais e histórico de proventos.
 */
export class Properties extends APIResource {
  /**
   * Imóveis físicos de FIIs pelo informe trimestral da CVM, com área, endereço,
   * classe, unidades, vacância, inadimplência e participação na receita de cada
   * imóvel.
   *
   * Use para analisar FIIs de tijolo, medir a vacância de um fundo e ver quanto da
   * receita depende de cada imóvel.
   *
   * `summary.vacancyRate` é a vacância do fundo, ponderada pela área quando o
   * informe traz a área de cada imóvel. `vacancyRate`, `delinquencyRate` e
   * `revenueShare` são frações decimais: `0.0328` é 3,28%.
   *
   * Leia `vacancyRate` junto com `revenueShare`. Um imóvel vago com 2% da receita
   * pesa menos que um com 30%.
   *
   * Sem `referenceDate`, retorna o trimestre mais recente de cada fundo. O padrão
   * retorna a versão mais recente do informe, e `allVersions=true` retorna todas.
   * Para a série no tempo, use o
   * [histórico de imóveis](https://brapi.dev/docs/fiis/imoveis-historico).
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const property = await client.v2.fii.properties.retrieve({
   *   symbols: 'HGLG11,MXRF11',
   * });
   * ```
   */
  retrieve(query: PropertyRetrieveParams, options?: RequestOptions): APIPromise<PropertyRetrieveResponse> {
    return this._client.get('/api/v2/fii/properties', { query, ...options });
  }

  /**
   * Série trimestral de imóveis e vacância de FIIs: um ponto por fundo, trimestre e
   * versão do informe, com vacância, área total e quantidade de imóveis em
   * `summary`.
   *
   * Use para gráficos de vacância e para acompanhar o tamanho da carteira física no
   * tempo.
   *
   * A resposta não traz a lista de imóveis. Para os imóveis de um trimestre, use
   * [imóveis de FIIs](https://brapi.dev/docs/fiis/imoveis) com `referenceDate`.
   *
   * Sem `startDate` e `endDate`, retorna os últimos 12 meses. `sortBy` aceita
   * `referenceDate` (padrão), `symbol`, `version`, `count`, `totalArea`,
   * `vacancyRate`, `averageVacancyRate` e `propertiesWithVacancy`.
   * `allVersions=true` inclui as versões retificadas.
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const response = await client.v2.fii.properties.history({
   *   symbols: 'HGLG11,MXRF11',
   * });
   * ```
   */
  history(query: PropertyHistoryParams, options?: RequestOptions): APIPromise<PropertyHistoryResponse> {
    return this._client.get('/api/v2/fii/properties/history', { query, ...options });
  }
}

export interface FiiPropertySummary {
  averageVacancyRate: number | null;

  count: number;

  propertiesWithVacancy: number;

  totalArea: number | null;

  vacancyRate: number | null;
}

export interface PropertyRetrieveResponse {
  fiis: Array<PropertyRetrieveResponse.Fii>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace PropertyRetrieveResponse {
  export interface Fii {
    cnpj: string;

    properties: Array<PortfolioAPI.FiiProperty>;

    referenceDate: string;

    summary: PropertiesAPI.FiiPropertySummary;

    symbol: string | null;

    version: number;
  }
}

export interface PropertyHistoryResponse {
  history: Array<PropertyHistoryResponse.History>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace PropertyHistoryResponse {
  export interface History {
    cnpj: string;

    referenceDate: string;

    summary: PropertiesAPI.FiiPropertySummary;

    symbol: string | null;

    version: number;
  }
}

export interface PropertyRetrieveParams {
  /**
   * Tickers de FIIs separados por vírgula, até 20. Ex.: HGLG11,MXRF11.
   */
  symbols: string;

  /**
   * true inclui todas as versões do trimestre. false retorna só a mais recente.
   */
  allVersions?: 'true' | 'false';

  /**
   * Fim do trimestre no formato YYYY-MM-DD. Sem valor, retorna o trimestre mais
   * recente de cada FII.
   */
  referenceDate?: string;

  /**
   * Campo de ordenação dos imóveis.
   */
  sortBy?: 'revenueShare' | 'area' | 'vacancyRate' | 'name';

  /**
   * Direção da ordenação dos imóveis.
   */
  sortOrder?: 'asc' | 'desc';
}

export interface PropertyHistoryParams {
  /**
   * Tickers de FIIs separados por vírgula, até 20. Ex.: HGLG11,MXRF11.
   */
  symbols: string;

  /**
   * true inclui todas as versões de cada trimestre. false retorna só a mais recente.
   */
  allVersions?: 'true' | 'false';

  /**
   * Data final no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Campo de ordenação.
   */
  sortBy?: string;

  /**
   * Direção da ordenação.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD.
   */
  startDate?: string;
}

export declare namespace Properties {
  export {
    type FiiPropertySummary as FiiPropertySummary,
    type PropertyRetrieveResponse as PropertyRetrieveResponse,
    type PropertyHistoryResponse as PropertyHistoryResponse,
    type PropertyRetrieveParams as PropertyRetrieveParams,
    type PropertyHistoryParams as PropertyHistoryParams,
  };
}
