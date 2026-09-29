// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as TreasuryAPI from './treasury';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Consulte dados de títulos públicos e outros instrumentos de renda fixa brasileira.
 */
export class Indicators extends APIResource {
  /**
   * Taxa e preço indicativos mais recentes de até 20 títulos do Tesouro Direto, com
   * vencimento, indexador, tipo de cupom e dias até o vencimento.
   *
   * Use para mostrar a taxa do dia de um título, calcular o valor de uma posição ou
   * avisar quando a taxa passa de um limite.
   *
   * As taxas vêm em % a.a., mas o sentido muda por indexador. No Tesouro Selic, são
   * o spread sobre a Selic. No Prefixado, a taxa nominal. No IPCA+ e no IGP-M, a
   * taxa real acima da inflação. Leia `rateInfo` antes de formatar o número.
   *
   * Código desconhecido não gera erro. Ele fica fora de `results`.
   *
   * Plano Pro. Sem token, todos os `symbols` precisam estar entre os três títulos
   * liberados, listados em [Tesouro Direto](https://brapi.dev/docs/tesouro-direto).
   *
   * @example
   * ```ts
   * const indicator =
   *   await client.v2.treasury.indicators.retrieve({
   *     symbols: 'tesouro-selic-01032031,tesouro-ipca-15052035',
   *   });
   * ```
   */
  retrieve(query: IndicatorRetrieveParams, options?: RequestOptions): APIPromise<IndicatorRetrieveResponse> {
    return this._client.get('/api/v2/treasury/indicators', { query, ...options });
  }

  /**
   * Série diária de taxas e preços indicativos de até 20 títulos do Tesouro Direto,
   * com uma série por `symbol`.
   *
   * Use para gráficos de taxa, estudo de marcação a mercado ou backtests de renda
   * fixa.
   *
   * Sem `startDate`, a série começa 12 meses antes de hoje. Sem `endDate`, termina
   * hoje. O preço de um título prefixado sobe quando a taxa cai. Quem vende antes do
   * vencimento recebe esse preço.
   *
   * Cada série traz `rateInfo`, que diz como ler `buyRate` e `sellRate`. Título sem
   * dados no período fica fora de `results`.
   *
   * Plano Pro. Sem token, todos os `symbols` precisam estar entre os três títulos
   * liberados, listados em [Tesouro Direto](https://brapi.dev/docs/tesouro-direto).
   *
   * @example
   * ```ts
   * const response =
   *   await client.v2.treasury.indicators.history({
   *     symbols: 'tesouro-selic-01032031,tesouro-ipca-15052035',
   *   });
   * ```
   */
  history(query: IndicatorHistoryParams, options?: RequestOptions): APIPromise<IndicatorHistoryResponse> {
    return this._client.get('/api/v2/treasury/indicators/history', { query, ...options });
  }
}

export interface IndicatorRetrieveResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<TreasuryAPI.TreasuryListItem>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface IndicatorHistoryResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<IndicatorHistoryResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace IndicatorHistoryResponse {
  export interface Result {
    /**
     * Nome do título no Tesouro Direto.
     */
    bondType: string;

    /**
     * `semestral` para títulos com juros semestrais, `zero` para os demais.
     */
    couponType: 'zero' | 'semestral';

    history: Array<Result.History>;

    /**
     * Indexador do título. Renda+ e Educa+ usam `ipca`.
     */
    indexer: 'selic' | 'prefixado' | 'ipca' | 'igpm';

    /**
     * Data de vencimento, no formato YYYY-MM-DD.
     */
    maturityDate: string | null;

    /**
     * Como ler `buyRate` e `sellRate`. O sentido muda por indexador.
     */
    rateInfo: Result.RateInfo;

    symbol: string;
  }

  export namespace Result {
    export interface History {
      /**
       * Data da taxa e do preço, no formato YYYY-MM-DD.
       */
      baseDate: string;

      /**
       * Preço unitário base, em reais.
       */
      basePrice: number | null;

      /**
       * Preço unitário indicativo de compra, em reais.
       */
      buyPrice: number | null;

      /**
       * Taxa indicativa de compra, em % a.a. O sentido muda por indexador. Veja
       * `rateInfo`.
       */
      buyRate: number | null;

      /**
       * Preço unitário indicativo de venda, em reais.
       */
      sellPrice: number | null;

      /**
       * Taxa indicativa de venda, em % a.a. O sentido muda por indexador. Veja
       * `rateInfo`.
       */
      sellRate: number | null;
    }

    /**
     * Como ler `buyRate` e `sellRate`. O sentido muda por indexador.
     */
    export interface RateInfo {
      /**
       * Texto que explica como ler `buyRate` e `sellRate` neste título.
       */
      description: string;

      /**
       * O que `buyRate` e `sellRate` medem.
       */
      rateType: 'spreadOverSelic' | 'nominalAnnualRate' | 'realAnnualRateOverIpca' | 'realAnnualRateOverIgpm';

      /**
       * Unidade de `buyRate` e `sellRate`.
       */
      rateUnit: string;
    }
  }
}

export interface IndicatorRetrieveParams {
  /**
   * Códigos dos títulos separados por vírgula, até 20. Ex.:
   * tesouro-selic-01032031,tesouro-ipca-15052035.
   */
  symbols: string;
}

export interface IndicatorHistoryParams {
  /**
   * Códigos dos títulos separados por vírgula, até 20. Ex.:
   * tesouro-selic-01032031,tesouro-ipca-15052035.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD. Padrão: hoje.
   */
  endDate?: string;

  /**
   * Campo usado na ordenação da série.
   */
  sortBy?: 'baseDate' | 'buyRate' | 'sellRate' | 'buyPrice' | 'sellPrice' | 'basePrice';

  /**
   * Direção da ordenação.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD. Padrão: 12 meses antes de hoje.
   */
  startDate?: string;
}

export declare namespace Indicators {
  export {
    type IndicatorRetrieveResponse as IndicatorRetrieveResponse,
    type IndicatorHistoryResponse as IndicatorHistoryResponse,
    type IndicatorRetrieveParams as IndicatorRetrieveParams,
    type IndicatorHistoryParams as IndicatorHistoryParams,
  };
}
