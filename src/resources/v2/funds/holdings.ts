// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Descubra e consulte fundos brasileiros listados e estruturados, incluindo FIIs, FIAGROs, FI-Infra/FIFs, FIDCs e FIPs.
 */
export class Holdings extends APIResource {
  /**
   * A posição de um fundo em um ativo, mês a mês: peso no patrimônio, valor e
   * quantidade. Os dados vêm da carteira mensal que os fundos entregam à CVM.
   *
   * Use para ver quando um fundo ou ETF comprou ou vendeu uma ação, ou como mudou o
   * peso de um ativo na carteira.
   *
   * Informe o fundo (`symbol` ou `cnpj`) e o ativo (`asset` com o ticker, ou
   * `assetCnpj` com o CNPJ de um fundo ou de uma empresa, como em
   * `/api/v2/funds/holders`). Sem datas, a resposta traz os últimos 24 meses.
   *
   * Um mês em que o fundo entregou a carteira sem o ativo aparece com zeros. Um mês
   * sem carteira não aparece.
   *
   * Só posições diretas: o ativo detido por meio de outro fundo não entra. Ações
   * próprias e emprestadas somam uma posição. Derivativos, valores a pagar e
   * posições confidenciais não entram.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.holdings.history();
   * ```
   */
  history(
    query: HoldingHistoryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<HoldingHistoryResponse> {
    return this._client.get('/api/v2/funds/holdings/history', { query, ...options });
  }
}

export interface HoldingHistoryResponse {
  asset: HoldingHistoryResponse.Asset;

  fund: HoldingHistoryResponse.Fund;

  history: Array<HoldingHistoryResponse.History>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace HoldingHistoryResponse {
  export interface Asset {
    cnpj: string | null;

    name: string | null;

    symbol: string | null;
  }

  export interface Fund {
    assetType: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other' | null;

    cnpj: string;

    name: string | null;

    symbol: string | null;
  }

  export interface History {
    /**
     * Valor em reais.
     */
    marketValue: number;

    /**
     * Patrimônio líquido do fundo, em reais.
     */
    netAssets: number;

    /**
     * Quantidade. Vendas a descoberto ficam negativas. `null` quando o fundo tem mais
     * de um ativo da empresa no mês, ou títulos sem código.
     */
    quantity: number | null;

    /**
     * Fim do mês da carteira.
     */
    referenceDate: string;

    /**
     * Peso do ativo no patrimônio do fundo, em %. Zero quando o fundo não tem o ativo
     * no mês.
     */
    weightPercent: number;
  }
}

export interface HoldingHistoryParams {
  /**
   * Ticker do ativo na bolsa. Ex.: PETR4.
   */
  asset?: string;

  /**
   * CNPJ de um fundo, para as cotas dele, ou de uma empresa, para as ações e a
   * dívida dela. Use `asset` ou `assetCnpj`, não os dois.
   */
  assetCnpj?: string;

  /**
   * CNPJ do fundo, com ou sem pontuação. Use `symbol` ou `cnpj`, não os dois.
   */
  cnpj?: string;

  /**
   * Data final no formato YYYY-MM-DD. Padrão: hoje.
   */
  endDate?: string;

  /**
   * Do mês mais antigo (`asc`) ou do mais recente (`desc`, padrão).
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD. Padrão: 24 meses antes de `endDate`.
   */
  startDate?: string;

  /**
   * Ticker do fundo. Ex.: BOVA11.
   */
  symbol?: string;
}

export declare namespace Holdings {
  export {
    type HoldingHistoryResponse as HoldingHistoryResponse,
    type HoldingHistoryParams as HoldingHistoryParams,
  };
}
