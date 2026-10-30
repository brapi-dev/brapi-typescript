// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FundsAPI from './funds';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Descubra e consulte fundos brasileiros listados e estruturados, incluindo FIIs, FIAGROs, FI-Infra/FIFs, FIDCs e FIPs.
 */
export class Fiagro extends APIResource {
  /**
   * Carteira de FIAGRO em um mês: resumo, alocações por classe de ativo, passivos e
   * investidores.
   *
   * Use para ver quanto do fundo está em CRA, CRI, cotas de outros fundos, renda
   * fixa, imóveis rurais ou valores a receber, e como se divide o passivo.
   *
   * Informe `symbols` ou `cnpjs`. Sem `referenceDate`, a resposta traz o mês mais
   * recente.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.fiagro.portfolio();
   * ```
   */
  portfolio(
    query: FiagroPortfolioParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FiagroPortfolioResponse> {
    return this._client.get('/api/v2/funds/fiagro/portfolio', { query, ...options });
  }

  /**
   * Relatório mensal de FIAGRO na CVM: patrimônio, valor patrimonial por cota,
   * cotistas, rentabilidade do mês, dividend yield mensal, valores a distribuir e
   * despesas com taxas.
   *
   * Use para acompanhar a evolução de um FIAGRO mês a mês. Use `startDate` e
   * `endDate` para escolher o período.
   *
   * Os campos `adminFeeExpensePercent`, `managementFeeExpensePercent` e
   * `distributionFeeExpensePercent` trazem a despesa do mês com cada taxa, em % do
   * patrimônio líquido. Some 12 meses para ter a despesa do ano.
   *
   * Informe `symbols` ou `cnpjs`. Por padrão, a resposta traz só a versão mais
   * recente de cada mês. Use `allVersions=true` para ver as reapresentações.
   *
   * `sortBy` aceita `referenceDate`, `symbol`, `cnpj`, `netEquity`, `totalInvestors`
   * e `dividendYieldMonthly`. O padrão é `referenceDate`.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.fiagro.reports();
   * ```
   */
  reports(
    query: FiagroReportsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FiagroReportsResponse> {
    return this._client.get('/api/v2/funds/fiagro/reports', { query, ...options });
  }
}

export interface FiagroPortfolioResponse {
  funds: Array<FiagroPortfolioResponse.Fund>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FiagroPortfolioResponse {
  export interface Fund {
    allocations: { [key: string]: unknown } | null;

    cnpj: string;

    investors: { [key: string]: unknown } | null;

    liabilities: { [key: string]: unknown } | null;

    referenceDate: string;

    summary: { [key: string]: unknown } | null;

    symbol: string | null;
  }
}

export interface FiagroReportsResponse {
  pagination: FundsAPI.FundPaginationMeta;

  reports: Array<FiagroReportsResponse.Report>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FiagroReportsResponse {
  export interface Report {
    /**
     * Despesa com taxa de administração no mês, em % do patrimônio líquido.
     */
    adminFeeExpensePercent: number | null;

    administratorName: string | null;

    amortizationRateMonthly: number | null;

    cnpj: string;

    /**
     * Despesa com taxa de distribuição no mês, em % do patrimônio líquido.
     */
    distributionFeeExpensePercent: number | null;

    dividendYieldMonthly: number | null;

    incomeToDistribute: number | null;

    isin: string | null;

    liquidityNeeds: number | null;

    /**
     * Despesa com taxa de gestão no mês, em % do patrimônio líquido.
     */
    managementFeeExpensePercent: number | null;

    managerName: string | null;

    market: string | null;

    monthlyReturn: number | null;

    name: string | null;

    /**
     * Valor patrimonial por cota na base de cotas dos preços: desdobramentos e
     * grupamentos depois da data do informe já estão aplicados, como em `close`.
     */
    navPerShare: number | null;

    netEquity: number | null;

    patrimonialMonthlyReturn: number | null;

    /**
     * Valor patrimonial por cota como o informe declara, sem desdobramentos e
     * grupamentos posteriores.
     */
    rawNavPerShare: number | null;

    referenceDate: string;

    sharesOutstanding: number | null;

    symbol: string | null;

    totalAssets: number | null;

    totalInvestors: number | null;

    totalLiabilities: number | null;

    version: number;
  }
}

export interface FiagroPortfolioParams {
  /**
   * Se `true`, traz todas as versões enviadas à CVM para cada mês.
   */
  allVersions?: boolean | null;

  /**
   * CNPJs separados por vírgula, até 20, com ou sem pontuação.
   */
  cnpjs?: string;

  include?: string;

  /**
   * Mês de referência no formato YYYY-MM-DD.
   */
  referenceDate?: string;

  /**
   * Tickers separados por vírgula, até 20. Ex.: JURO11,XPCA11.
   */
  symbols?: string;
}

export interface FiagroReportsParams {
  /**
   * Se `true`, traz todas as versões enviadas à CVM para cada mês.
   */
  allVersions?: boolean | null;

  /**
   * CNPJs separados por vírgula, até 20, com ou sem pontuação.
   */
  cnpjs?: string;

  /**
   * Data final no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Itens por página.
   */
  limit?: number;

  /**
   * Número da página, a partir de 1.
   */
  page?: number;

  /**
   * Campo usado na ordenação.
   */
  sortBy?: string;

  /**
   * Ordem crescente (`asc`) ou decrescente (`desc`).
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD.
   */
  startDate?: string;

  /**
   * Tickers separados por vírgula, até 20. Ex.: JURO11,XPCA11.
   */
  symbols?: string;
}

export declare namespace Fiagro {
  export {
    type FiagroPortfolioResponse as FiagroPortfolioResponse,
    type FiagroReportsResponse as FiagroReportsResponse,
    type FiagroPortfolioParams as FiagroPortfolioParams,
    type FiagroReportsParams as FiagroReportsParams,
  };
}
