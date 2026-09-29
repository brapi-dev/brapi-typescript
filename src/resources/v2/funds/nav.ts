// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FundsAPI from './funds';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Descubra e consulte fundos brasileiros listados e estruturados, incluindo FIIs, FIAGROs, FI-Infra/FIFs, FIDCs e FIPs.
 */
export class Nav extends APIResource {
  /**
   * Série do valor patrimonial por cota, com patrimônio, ativos, cotistas,
   * aplicações e resgates. FI e FIF têm pontos diários. FIDC tem pontos mensais por
   * classe ou série, com a rentabilidade do mês em `monthlyReturn`.
   *
   * Use para gráficos de valor da cota, cálculo de rentabilidade e acompanhamento do
   * patrimônio.
   *
   * Informe `symbols` ou `cnpjs`. Os filtros de data usam o campo `date`.
   *
   * Este é o valor patrimonial, não o preço negociado em bolsa. Para comparar um FI
   * com um FIDC, alinhe os pontos por mês.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.nav.history();
   * ```
   */
  history(
    query: NavHistoryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NavHistoryResponse> {
    return this._client.get('/api/v2/funds/nav/history', { query, ...options });
  }
}

export interface NavHistoryResponse {
  history: Array<NavHistoryResponse.History>;

  pagination: FundsAPI.FundPaginationMeta;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace NavHistoryResponse {
  export interface History {
    classOrSeries: string | null;

    cnpj: string;

    dailyApplications: number | null;

    dailyRedemptions: number | null;

    date: string;

    equity: number | null;

    monthlyReturn: number | null;

    navPerShare: number | null;

    symbol: string | null;

    totalAssets: number | null;

    totalInvestors: number | null;
  }
}

export interface NavHistoryParams {
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

export declare namespace Nav {
  export { type NavHistoryResponse as NavHistoryResponse, type NavHistoryParams as NavHistoryParams };
}
