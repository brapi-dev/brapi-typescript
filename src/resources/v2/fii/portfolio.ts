// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PortfolioAPI from './portfolio';
import * as PropertiesAPI from './properties';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Acesse dados completos de FIIs: cotações, indicadores fundamentalistas (P/VP, DY), relatórios gerenciais e histórico de proventos.
 */
export class Portfolio extends APIResource {
  /**
   * Composição da carteira de FIIs pelo informe trimestral da CVM: imóveis, CRIs e
   * outros ativos financeiros, cotas de outros FIIs, terrenos e direitos, com totais
   * em `summary`.
   *
   * Use para analisar FIIs de papel e fundos de fundos, ver os CRIs de um fundo ou
   * somar a exposição por classe de ativo.
   *
   * `include` escolhe as listas. Sem `include`, retorna todas. `summary` sempre vem.
   *
   * Em fundos de fundos, `fundHoldings` lista as cotas de outros FIIs. Em FIIs de
   * papel, `financialAssets` lista os CRIs com emissor e valor. `allocations` resume
   * a carteira por classe de ativo.
   *
   * Sem `referenceDate`, retorna o trimestre mais recente de cada fundo. Informes
   * podem ser retificados. O padrão retorna a versão mais recente, e
   * `allVersions=true` retorna todas.
   *
   * Para imóveis e vacância, use
   * [imóveis de FIIs](https://brapi.dev/docs/fiis/imoveis). Para a série no tempo,
   * use o [histórico da carteira](https://brapi.dev/docs/fiis/carteira-historico).
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const portfolio = await client.v2.fii.portfolio.retrieve({
   *   symbols: 'HGLG11,MXRF11',
   * });
   * ```
   */
  retrieve(query: PortfolioRetrieveParams, options?: RequestOptions): APIPromise<PortfolioRetrieveResponse> {
    return this._client.get('/api/v2/fii/portfolio', { query, ...options });
  }

  /**
   * Série trimestral da carteira de FIIs: um ponto por fundo, trimestre e versão do
   * informe, com `summary` e `allocations` por classe de ativo.
   *
   * Use para ver como a alocação de um fundo mudou no tempo, por exemplo entre
   * imóveis, CRIs e cotas de outros FIIs.
   *
   * A resposta não traz as listas item a item. Para o detalhe de um trimestre, use a
   * [carteira de FIIs](https://brapi.dev/docs/fiis/carteira) com `referenceDate`.
   *
   * Sem `startDate` e `endDate`, retorna os últimos 12 meses. `sortBy` aceita
   * `referenceDate` (padrão), `symbol`, `version`, `totalItems`, `declaredValue` e
   * `financialAssetsDeclaredValue`. `allVersions=true` inclui as versões
   * retificadas.
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const response = await client.v2.fii.portfolio.history({
   *   symbols: 'HGLG11,MXRF11',
   * });
   * ```
   */
  history(query: PortfolioHistoryParams, options?: RequestOptions): APIPromise<PortfolioHistoryResponse> {
    return this._client.get('/api/v2/fii/portfolio/history', { query, ...options });
  }
}

export interface FiiFinancialAsset {
  assetClass: string;

  confidential: boolean;

  identifier: string | null;

  issue: string | null;

  issuer: string | null;

  issuerCnpj: string | null;

  maturityDate: string | null;

  name: string;

  quantity: number | null;

  series: string | null;

  ticker: string | null;

  value: number | null;
}

export interface FiiPortfolioAllocation {
  assetClass: string;

  count: number;

  value: number | null;
}

export interface FiiPortfolioSummary {
  declaredValue: number | null;

  financialAssets: FiiPortfolioSummary.FinancialAssets;

  lands: FiiPortfolioSummary.Lands;

  properties: PropertiesAPI.FiiPropertySummary;

  rights: FiiPortfolioSummary.Rights;

  totalItems: number;
}

export namespace FiiPortfolioSummary {
  export interface FinancialAssets {
    count: number;

    declaredValue: number | null;
  }

  export interface Lands {
    count: number;

    totalArea: number | null;
  }

  export interface Rights {
    count: number;

    declaredValue: number | null;
  }
}

export interface FiiProperty {
  address: string | null;

  area: number | null;

  confidential: boolean;

  constructionCostActual: number | null;

  constructionCostExpected: number | null;

  constructionProgressActual: number | null;

  constructionProgressExpected: number | null;

  delinquencyRate: number | null;

  identifier: string | null;

  investedShare: number | null;

  leasedRate: number | null;

  name: string;

  propertyClass: string | null;

  revenueShare: number | null;

  soldRate: number | null;

  unitCount: number | null;

  vacancyRate: number | null;
}

export interface PortfolioRetrieveResponse {
  fiis: Array<PortfolioRetrieveResponse.Fii>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace PortfolioRetrieveResponse {
  export interface Fii {
    allocations: Array<PortfolioAPI.FiiPortfolioAllocation>;

    cnpj: string;

    financialAssets: Array<PortfolioAPI.FiiFinancialAsset>;

    fundHoldings: Array<PortfolioAPI.FiiFinancialAsset>;

    lands: Array<Fii.Land>;

    properties: Array<PortfolioAPI.FiiProperty>;

    referenceDate: string;

    rights: Array<Fii.Right>;

    summary: PortfolioAPI.FiiPortfolioSummary;

    symbol: string | null;

    version: number;
  }

  export namespace Fii {
    export interface Land {
      address: string | null;

      area: number | null;

      confidential: boolean;

      equityShare: number | null;

      identifier: string | null;

      investedShare: number | null;

      name: string;
    }

    export interface Right {
      confidential: boolean;

      description: string | null;

      identifier: string | null;

      name: string;

      value: number | null;
    }
  }
}

export interface PortfolioHistoryResponse {
  history: Array<PortfolioHistoryResponse.History>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace PortfolioHistoryResponse {
  export interface History {
    allocations: Array<PortfolioAPI.FiiPortfolioAllocation>;

    cnpj: string;

    referenceDate: string;

    summary: PortfolioAPI.FiiPortfolioSummary;

    symbol: string | null;

    version: number;
  }
}

export interface PortfolioRetrieveParams {
  /**
   * Tickers de FIIs separados por vírgula, até 20. Ex.: HGLG11,MXRF11.
   */
  symbols: string;

  /**
   * true inclui todas as versões do trimestre. false retorna só a mais recente.
   */
  allVersions?: 'true' | 'false';

  /**
   * Listas a retornar, separadas por vírgula: allocations, properties,
   * financialAssets, fundHoldings, lands, rights. summary sempre vem. Sem valor,
   * retorna todas.
   */
  include?: string;

  /**
   * Fim do trimestre no formato YYYY-MM-DD. Sem valor, retorna o trimestre mais
   * recente de cada FII.
   */
  referenceDate?: string;
}

export interface PortfolioHistoryParams {
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

export declare namespace Portfolio {
  export {
    type FiiFinancialAsset as FiiFinancialAsset,
    type FiiPortfolioAllocation as FiiPortfolioAllocation,
    type FiiPortfolioSummary as FiiPortfolioSummary,
    type FiiProperty as FiiProperty,
    type PortfolioRetrieveResponse as PortfolioRetrieveResponse,
    type PortfolioHistoryResponse as PortfolioHistoryResponse,
    type PortfolioRetrieveParams as PortfolioRetrieveParams,
    type PortfolioHistoryParams as PortfolioHistoryParams,
  };
}
