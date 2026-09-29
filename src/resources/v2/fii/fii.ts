// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as IndicatorsAPI from './indicators';
import {
  IndicatorHistoryParams,
  IndicatorHistoryResponse,
  IndicatorRetrieveParams,
  IndicatorRetrieveResponse,
  Indicators,
} from './indicators';
import * as PortfolioAPI from './portfolio';
import {
  FiiFinancialAsset,
  FiiPortfolioAllocation,
  FiiPortfolioSummary,
  FiiProperty,
  Portfolio,
  PortfolioHistoryParams,
  PortfolioHistoryResponse,
  PortfolioRetrieveParams,
  PortfolioRetrieveResponse,
} from './portfolio';
import * as PropertiesAPI from './properties';
import {
  FiiPropertySummary,
  Properties,
  PropertyHistoryParams,
  PropertyHistoryResponse,
  PropertyRetrieveParams,
  PropertyRetrieveResponse,
} from './properties';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Acesse dados completos de FIIs: cotações, indicadores fundamentalistas (P/VP, DY), relatórios gerenciais e histórico de proventos.
 */
export class Fii extends APIResource {
  indicators: IndicatorsAPI.Indicators = new IndicatorsAPI.Indicators(this._client);
  portfolio: PortfolioAPI.Portfolio = new PortfolioAPI.Portfolio(this._client);
  properties: PropertiesAPI.Properties = new PropertiesAPI.Properties(this._client);

  /**
   * Lista paginada de FIIs com dados cadastrais, dados do administrador e
   * indicadores atuais: preço, valor patrimonial por cota, P/VP, dividend yield de
   * 12 meses e total de cotistas.
   *
   * Use para montar um screener, filtrar fundos por segmento ou achar o ticker de um
   * CNPJ.
   *
   * `search` busca no nome, no ticker e no CNPJ. `segmentoAtuacao` aceita valores
   * como Logística, Shoppings, Escritórios, Lajes Corporativas, Títulos e Val. Mob.,
   * Residencial, Hospital, Hotel, Educacional, Híbrido, Multicategoria, Varejo e
   * Outros.
   *
   * `sortBy` aceita `symbol`, `name`, `segmentoAtuacao`, `mandate`, `price`,
   * `navPerShare`, `priceToNav`, `dividendYield12m` e `totalInvestors`. O padrão é
   * `totalInvestors`.
   *
   * Nem todo ticker terminado em 11 é FII. FI-Infra (como JURO11), FIAGRO, FIDC e
   * FIP ficam em [fundos](https://brapi.dev/docs/fundos).
   *
   * Plano Pro. Sem token, aceita só `symbols` ou `cnpjs` de MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const fiis = await client.v2.fii.list();
   * ```
   */
  list(query: FiiListParams | null | undefined = {}, options?: RequestOptions): APIPromise<FiiListResponse> {
    return this._client.get('/api/v2/fii/list', { query, ...options });
  }

  /**
   * Informe anual que cada FII entrega à CVM, com os dados consolidados do exercício
   * em `fields`.
   *
   * Use para consultar dados anuais oficiais de um fundo.
   *
   * Busque por `symbols` ou `cnpjs`. Filtre por `year` ou por `startDate` e
   * `endDate`. FIAGRO, FI-Infra, FIDC e FIP ficam em
   * [fundos](https://brapi.dev/docs/fundos).
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const response = await client.v2.fii.annualReports();
   * ```
   */
  annualReports(
    query: FiiAnnualReportsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FiiAnnualReportsResponse> {
    return this._client.get('/api/v2/fii/annual-reports', { query, ...options });
  }

  /**
   * Rendimentos e amortizações pagos por FIIs. Cada evento traz tipo (`label`),
   * valor por cota em reais (`rate`), data-com (`lastDatePrior`), data de pagamento,
   * data de aprovação e ISIN.
   *
   * Use para calcular dividend yield, montar calendários de rendimentos e somar a
   * renda de uma carteira.
   *
   * `label` é RENDIMENTO ou AMORTIZAÇÃO. Amortização devolve capital e reduz o valor
   * patrimonial da cota. Não some as duas para calcular yield.
   *
   * Os dados vêm dos informes mensais da CVM e de comunicados dos administradores.
   * Quando a fonte não tem as datas reais, `paymentDate` e `lastDatePrior` recebem a
   * data de referência do informe mensal, e `remarks` indica a origem. A data
   * inicial varia por fundo.
   *
   * `startDate` e `endDate` filtram por `paymentDate`. Sem datas, retorna os últimos
   * 12 meses. `sortBy` aceita `paymentDate` (padrão), `lastDatePrior`, `approvedOn`,
   * `rate` e `symbol`.
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const response = await client.v2.fii.dividends({
   *   symbols: 'HGLG11,MXRF11',
   * });
   * ```
   */
  dividends(query: FiiDividendsParams, options?: RequestOptions): APIPromise<FiiDividendsResponse> {
    return this._client.get('/api/v2/fii/dividends', { query, ...options });
  }

  /**
   * Demonstrações financeiras auditadas de FIIs, extraídas dos documentos DFIN
   * entregues à CVM. Os valores vêm em `fields`, por ano e data de referência.
   *
   * Use para analisar números auditados de um fundo e conferir os dados do
   * [relatório mensal](https://brapi.dev/docs/fiis/relatorios).
   *
   * Busque por `symbols` ou `cnpjs`. Filtre por `year` ou por `startDate` e
   * `endDate`. A demonstração auditada sai depois do relatório mensal e prevalece
   * quando os dois divergem.
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const response = await client.v2.fii.financials();
   * ```
   */
  financials(
    query: FiiFinancialsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FiiFinancialsResponse> {
    return this._client.get('/api/v2/fii/financials', { query, ...options });
  }

  /**
   * Série diária de preços das cotas de FIIs: `open`, `high`, `low`, `close`,
   * `volume` e `adjustedClose`, em reais. `date` é um timestamp UNIX em segundos.
   *
   * Use para gráficos de preço, cálculo de retorno e backtests.
   *
   * Use `adjustedClose` para calcular retorno. Ele considera desdobramentos e
   * proventos. `close` não.
   *
   * Sem `startDate` e `endDate`, retorna os últimos 12 meses. Cada símbolo tem a
   * própria série em `historicalDataPrice`.
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const response = await client.v2.fii.historical({
   *   symbols: 'HGLG11,MXRF11',
   * });
   * ```
   */
  historical(query: FiiHistoricalParams, options?: RequestOptions): APIPromise<FiiHistoricalResponse> {
    return this._client.get('/api/v2/fii/historical', { query, ...options });
  }

  /**
   * Informe mensal que cada FII entrega à CVM: patrimônio, cotas, valor patrimonial
   * por cota, taxa de administração, retorno e yield do mês, cotistas, e a
   * composição do ativo e do passivo.
   *
   * Use para ver a composição do patrimônio, acompanhar taxas e comparar o retorno
   * mensal entre fundos.
   *
   * O ativo separa caixa, títulos públicos e privados, fundos de renda fixa,
   * imóveis, CRI, LCI, cotas de outros FIIs e recebíveis. O passivo separa
   * distribuições a pagar, taxas a pagar e obrigações imobiliárias.
   *
   * Sem `startDate` e `endDate`, retorna os últimos 12 meses. O padrão retorna a
   * versão mais recente de cada mês, e `allVersions=true` inclui as versões
   * retificadas. `sortBy` aceita `referenceDate` (padrão), `symbol`, `totalAssets`,
   * `equity`, `navPerShare`, `monthlyReturn`, `monthlyDividendYield`,
   * `totalInvestors` e `version`.
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const response = await client.v2.fii.reports({
   *   symbols: 'HGLG11,MXRF11',
   * });
   * ```
   */
  reports(query: FiiReportsParams, options?: RequestOptions): APIPromise<FiiReportsResponse> {
    return this._client.get('/api/v2/fii/reports', { query, ...options });
  }
}

export interface PaginationMeta {
  hasNextPage: boolean;

  limit: number;

  page: number;

  totalItems: number;

  totalPages: number;
}

export interface FiiListResponse {
  fiis: Array<FiiListResponse.Fii>;

  pagination: PaginationMeta;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FiiListResponse {
  export interface Fii {
    administratorAddress: string | null;

    administratorAddressComplement: string | null;

    administratorAddressNumber: string | null;

    administratorCity: string | null;

    administratorCnpj: string | null;

    administratorDistrict: string | null;

    administratorEmail: string | null;

    administratorName: string | null;

    administratorPhone1: string | null;

    administratorPhone2: string | null;

    administratorPhone3: string | null;

    administratorState: string | null;

    administratorWebsite: string | null;

    administratorZipCode: string | null;

    cnpj: string | null;

    dividendYield12m: number | null;

    mandate: string | null;

    name: string | null;

    navPerShare: number | null;

    price: number | null;

    priceToNav: number | null;

    segmentoAtuacao: string | null;

    segmentType: string | null;

    symbol: string | null;

    tipoGestao: string | null;

    totalInvestors: number | null;
  }
}

export interface FiiAnnualReportsResponse {
  pagination: PaginationMeta;

  reports: Array<FiiAnnualReportsResponse.Report>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FiiAnnualReportsResponse {
  export interface Report {
    cnpj: string;

    fields: { [key: string]: unknown } | null;

    includeSections: { [key: string]: unknown } | null;

    referenceDate: string;

    symbol: string | null;

    year: number;
  }
}

export interface FiiDividendsResponse {
  dividends: Array<FiiDividendsResponse.Dividend>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FiiDividendsResponse {
  export interface Dividend {
    approvedOn: string | null;

    exDate: string | null;

    isinCode: string | null;

    label: string;

    lastDatePrior: string;

    paymentDate: string;

    rate: number;

    relatedTo: string | null;

    remarks: string | null;

    symbol: string;
  }
}

export interface FiiFinancialsResponse {
  financials: Array<FiiFinancialsResponse.Financial>;

  pagination: PaginationMeta;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FiiFinancialsResponse {
  export interface Financial {
    cnpj: string;

    documentType: string;

    fields: { [key: string]: unknown } | null;

    referenceDate: string;

    symbol: string | null;

    year: number;
  }
}

export interface FiiHistoricalResponse {
  fiis: Array<FiiHistoricalResponse.Fii>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FiiHistoricalResponse {
  export interface Fii {
    historicalDataPrice: Array<Fii.HistoricalDataPrice>;

    symbol: string;
  }

  export namespace Fii {
    export interface HistoricalDataPrice {
      adjustedClose: number | null;

      close: number | null;

      date: number;

      high: number | null;

      low: number | null;

      open: number | null;

      volume: number | null;
    }
  }
}

export interface FiiReportsResponse {
  pagination: PaginationMeta;

  reports: Array<FiiReportsResponse.Report>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FiiReportsResponse {
  export interface Report {
    adminFeeRate: number | null;

    adminFeesPayable: number | null;

    administratorAddress: string | null;

    administratorAddressComplement: string | null;

    administratorAddressNumber: string | null;

    administratorCity: string | null;

    administratorCnpj: string | null;

    administratorDistrict: string | null;

    administratorEmail: string | null;

    administratorName: string | null;

    administratorPhone1: string | null;

    administratorPhone2: string | null;

    administratorPhone3: string | null;

    administratorState: string | null;

    administratorWebsite: string | null;

    administratorZipCode: string | null;

    amortizationRate: number | null;

    cash: number | null;

    cnpj: string;

    cri: number | null;

    distributionsPayable: number | null;

    equity: number | null;

    fiiHoldings: number | null;

    fixedIncomeFunds: number | null;

    governmentBonds: number | null;

    lci: number | null;

    liquidityNeeds: number | null;

    monthlyDividendYield: number | null;

    monthlyPatrimonialReturn: number | null;

    monthlyReturn: number | null;

    name: string | null;

    navPerShare: number | null;

    otherReceivables: number | null;

    privateBonds: number | null;

    realEstateAssets: number | null;

    realEstateCompanyShares: number | null;

    realEstateCompanyUnits: number | null;

    realEstateObligations: number | null;

    receivables: number | null;

    referenceDate: string;

    rentalReceivables: number | null;

    sharesOutstanding: number | null;

    symbol: string | null;

    totalAssets: number | null;

    totalInvested: number | null;

    totalInvestors: number | null;

    totalLiabilities: number | null;

    version: number;
  }
}

export interface FiiListParams {
  /**
   * CNPJs de FIIs separados por vírgula, até 20. Aceita com ou sem pontuação.
   */
  cnpjs?: string;

  /**
   * Itens por página. Não há limite máximo.
   */
  limit?: number;

  /**
   * Mandato do fundo. Ex.: Renda, Híbrido, Títulos e Valores Mobiliários.
   */
  mandate?: string;

  /**
   * Número da página, a partir de 1.
   */
  page?: number;

  /**
   * Texto buscado no nome, no ticker ou no CNPJ.
   */
  search?: string;

  /**
   * Setor de atuação. Ex.: Logística, Shoppings, Escritórios.
   */
  segmentoAtuacao?: string;

  /**
   * Tipo do fundo: papel, tijolo, hibrido ou fof.
   */
  segmentType?: 'papel' | 'tijolo' | 'hibrido' | 'fof';

  /**
   * Campo de ordenação.
   */
  sortBy?: string;

  /**
   * Direção da ordenação.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Tickers de FIIs separados por vírgula, até 20.
   */
  symbols?: string;

  /**
   * Tipo de gestão: Ativa ou Definida.
   */
  tipoGestao?: string;
}

export interface FiiAnnualReportsParams {
  /**
   * CNPJs de FIIs separados por vírgula, até 20. Aceita com ou sem pontuação.
   */
  cnpjs?: string;

  /**
   * Data de referência final no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Seções opcionais conforme estrutura do informe anual
   */
  include?: string;

  limit?: number;

  page?: number;

  /**
   * Campo de ordenação: referenceDate, symbol, cnpj ou year.
   */
  sortBy?: string;

  sortOrder?: 'asc' | 'desc';

  /**
   * Data de referência inicial no formato YYYY-MM-DD.
   */
  startDate?: string;

  /**
   * Tickers de FIIs separados por vírgula, até 20.
   */
  symbols?: string;

  /**
   * Ano do exercício do documento.
   */
  year?: number | null;
}

export interface FiiDividendsParams {
  /**
   * Tickers de FIIs separados por vírgula, até 20. Ex.: HGLG11,MXRF11.
   */
  symbols: string;

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

export interface FiiFinancialsParams {
  /**
   * CNPJs de FIIs separados por vírgula, até 20. Aceita com ou sem pontuação.
   */
  cnpjs?: string;

  /**
   * Data de referência final no formato YYYY-MM-DD.
   */
  endDate?: string;

  limit?: number;

  page?: number;

  /**
   * Campo de ordenação: referenceDate, symbol, cnpj ou year.
   */
  sortBy?: string;

  sortOrder?: 'asc' | 'desc';

  /**
   * Data de referência inicial no formato YYYY-MM-DD.
   */
  startDate?: string;

  /**
   * Tickers de FIIs separados por vírgula, até 20.
   */
  symbols?: string;

  /**
   * Ano do exercício do documento.
   */
  year?: number | null;
}

export interface FiiHistoricalParams {
  /**
   * Tickers de FIIs separados por vírgula, até 20. Ex.: HGLG11,MXRF11.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Direção da ordenação por data.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD.
   */
  startDate?: string;
}

export interface FiiReportsParams {
  /**
   * Tickers de FIIs separados por vírgula, até 20. Ex.: HGLG11,MXRF11.
   */
  symbols: string;

  /**
   * true inclui todas as versões de cada mês. false retorna só a mais recente.
   */
  allVersions?: 'true' | 'false';

  /**
   * Data final no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Itens por página. Não há limite máximo.
   */
  limit?: number;

  /**
   * Número da página, a partir de 1.
   */
  page?: number;

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

Fii.Indicators = Indicators;
Fii.Portfolio = Portfolio;
Fii.Properties = Properties;

export declare namespace Fii {
  export {
    type PaginationMeta as PaginationMeta,
    type FiiListResponse as FiiListResponse,
    type FiiAnnualReportsResponse as FiiAnnualReportsResponse,
    type FiiDividendsResponse as FiiDividendsResponse,
    type FiiFinancialsResponse as FiiFinancialsResponse,
    type FiiHistoricalResponse as FiiHistoricalResponse,
    type FiiReportsResponse as FiiReportsResponse,
    type FiiListParams as FiiListParams,
    type FiiAnnualReportsParams as FiiAnnualReportsParams,
    type FiiDividendsParams as FiiDividendsParams,
    type FiiFinancialsParams as FiiFinancialsParams,
    type FiiHistoricalParams as FiiHistoricalParams,
    type FiiReportsParams as FiiReportsParams,
  };

  export {
    Indicators as Indicators,
    type IndicatorRetrieveResponse as IndicatorRetrieveResponse,
    type IndicatorHistoryResponse as IndicatorHistoryResponse,
    type IndicatorRetrieveParams as IndicatorRetrieveParams,
    type IndicatorHistoryParams as IndicatorHistoryParams,
  };

  export {
    Portfolio as Portfolio,
    type FiiFinancialAsset as FiiFinancialAsset,
    type FiiPortfolioAllocation as FiiPortfolioAllocation,
    type FiiPortfolioSummary as FiiPortfolioSummary,
    type FiiProperty as FiiProperty,
    type PortfolioRetrieveResponse as PortfolioRetrieveResponse,
    type PortfolioHistoryResponse as PortfolioHistoryResponse,
    type PortfolioRetrieveParams as PortfolioRetrieveParams,
    type PortfolioHistoryParams as PortfolioHistoryParams,
  };

  export {
    Properties as Properties,
    type FiiPropertySummary as FiiPropertySummary,
    type PropertyRetrieveResponse as PropertyRetrieveResponse,
    type PropertyHistoryResponse as PropertyHistoryResponse,
    type PropertyRetrieveParams as PropertyRetrieveParams,
    type PropertyHistoryParams as PropertyHistoryParams,
  };
}
