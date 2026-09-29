// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FundsAPI from './funds';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Descubra e consulte fundos brasileiros listados e estruturados, incluindo FIIs, FIAGROs, FI-Infra/FIFs, FIDCs e FIPs.
 */
export class Fidc extends APIResource {
  /**
   * Carteira de FIDC em um mês: setores, vencimentos, inadimplência, faixas de
   * risco, classes de cota, cotistas e cedentes.
   *
   * Use para avaliar o risco de crédito de um FIDC e a concentração por cedente.
   *
   * Informe `cnpjs`, ou `symbols` quando o fundo tem ticker. Sem `referenceDate`, a
   * resposta traz o mês mais recente.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.fidc.portfolio();
   * ```
   */
  portfolio(
    query: FidcPortfolioParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FidcPortfolioResponse> {
    return this._client.get('/api/v2/funds/fidc/portfolio', { query, ...options });
  }

  /**
   * Relatório mensal de FIDC na CVM: ativos, valor da carteira, patrimônio líquido,
   * patrimônio médio, passivos, classe de cota e tipo de condomínio.
   *
   * Use para acompanhar o tamanho e a evolução de um FIDC mês a mês.
   *
   * A maioria dos FIDCs não tem ticker em bolsa. Use `cnpjs`. `symbols` funciona só
   * quando o fundo tem ticker.
   *
   * `sortBy` aceita `referenceDate`, `cnpj`, `netEquity`, `assets` e
   * `portfolioValue`. O padrão é `referenceDate`.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.fidc.reports();
   * ```
   */
  reports(
    query: FidcReportsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FidcReportsResponse> {
    return this._client.get('/api/v2/funds/fidc/reports', { query, ...options });
  }
}

export interface FidcPortfolioResponse {
  funds: Array<FidcPortfolioResponse.Fund>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FidcPortfolioResponse {
  export interface Fund {
    cedentes: { [key: string]: unknown } | null;

    cnpj: string;

    delinquencyBuckets: { [key: string]: unknown } | null;

    investors: { [key: string]: unknown } | null;

    maturityBuckets: { [key: string]: unknown } | null;

    quotaClasses: Array<{ [key: string]: unknown }> | null;

    referenceDate: string;

    riskBuckets: { [key: string]: unknown } | null;

    sectors: { [key: string]: unknown } | null;

    symbol: string | null;
  }
}

export interface FidcReportsResponse {
  pagination: FundsAPI.FundPaginationMeta;

  reports: Array<FidcReportsResponse.Report>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FidcReportsResponse {
  export interface Report {
    administratorName: string | null;

    assets: number | null;

    averageNetEquity: number | null;

    class: string | null;

    cnpj: string;

    condominiumType: string | null;

    liabilities: number | null;

    name: string | null;

    netEquity: number | null;

    portfolioValue: number | null;

    referenceDate: string;

    symbol: string | null;
  }
}

export interface FidcPortfolioParams {
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

export interface FidcReportsParams {
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

export declare namespace Fidc {
  export {
    type FidcPortfolioResponse as FidcPortfolioResponse,
    type FidcReportsResponse as FidcReportsResponse,
    type FidcPortfolioParams as FidcPortfolioParams,
    type FidcReportsParams as FidcReportsParams,
  };
}
