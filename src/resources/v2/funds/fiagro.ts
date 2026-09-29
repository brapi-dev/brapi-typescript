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
   * Use para ver quanto do fundo está em CRA, direitos creditórios, imóveis rurais
   * ou participações.
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
   * cotistas, rentabilidade do mês, dividend yield mensal e valores a distribuir.
   *
   * Use para acompanhar a evolução de um FIAGRO mês a mês.
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
    administratorName: string | null;

    amortizationRateMonthly: number | null;

    cnpj: string;

    dividendYieldMonthly: number | null;

    incomeToDistribute: number | null;

    isin: string | null;

    liquidityNeeds: number | null;

    managerName: string | null;

    market: string | null;

    monthlyReturn: number | null;

    name: string | null;

    navPerShare: number | null;

    netEquity: number | null;

    patrimonialMonthlyReturn: number | null;

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
