// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as OptionsAPI from './options';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';

export class Analytics extends APIResource {
  /**
   * Retorna a volatilidade implícita e as gregas (delta, gamma, theta, vega e rho)
   * de cada série de opções sobre futuro de um vencimento, calculadas sobre o preço
   * de fechamento.
   *
   * Use para comparar a IV entre strikes, montar um smile de volatilidade e medir a
   * exposição de uma carteira de opções.
   *
   * `timeToExpirationYears` usa dias corridos até o vencimento divididos por 365.
   * Por exemplo, 17 dias correspondem a `17 / 365 = 0.04657534`.
   *
   * `impliedVolatility` é anual, em decimal. Para um dia corrido, use
   * `impliedVolatility / sqrt(365)`. Para `d` dias corridos, use
   * `impliedVolatility * sqrt(d / 365)`.
   *
   * A divisão por `sqrt(252)` pressupõe 252 pregões por ano. Ela expressa outra
   * convenção diária e não altera o prazo usado no cálculo da opção.
   *
   * Sem negócio no dia, o cálculo usa `referencePrice`. Nesses casos, `priceSource`
   * vem `referencePrice` e `confidence` vem `low`. Sem preço, os campos calculados
   * vêm `null` e `nullReason` diz o motivo.
   *
   * `theta` vem por ano. `vega` e `rho` medem o efeito de uma variação de 1,00 na
   * volatilidade e no juro. Divida por 100 para ter o efeito de 1 ponto percentual.
   *
   * Séries americanas usam árvore binomial sobre o futuro. Séries europeias usam
   * Black-76. A maioria das opções sobre futuros é americana.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=BGI`.
   *
   * @example
   * ```ts
   * const analytics =
   *   await client.v2.futures.options.analytics.retrieve({
   *     expirationDate: '2027-08-31',
   *     underlying: 'BGI',
   *   });
   * ```
   */
  retrieve(query: AnalyticsRetrieveParams, options?: RequestOptions): APIPromise<AnalyticsRetrieveResponse> {
    return this._client.get('/api/v2/futures/options/analytics', { query, ...options });
  }

  /**
   * Retorna o histórico diário de volatilidade implícita e gregas de uma opção sobre
   * futuro, identificada por `symbol`.
   *
   * Use para ver como a IV reagiu a eventos, como relatórios de safra ou o
   * vencimento, e para testar estratégias com gregas.
   *
   * Os campos seguem as regras de
   * [gregas e IV de opções sobre futuros](https://brapi.dev/docs/futuros/opcoes/analytics).
   *
   * Disponível no plano Pro. Sem token, aceita só `symbol` com prefixo `BGI`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v2.futures.options.analytics.history({
   *     symbol: 'BGIM26C028000',
   *   });
   * ```
   */
  history(query: AnalyticsHistoryParams, options?: RequestOptions): APIPromise<AnalyticsHistoryResponse> {
    return this._client.get('/api/v2/futures/options/analytics/history', { query, ...options });
  }
}

export interface AnalyticsRetrieveResponse {
  analytics: Array<AnalyticsRetrieveResponse.Analytics>;

  date: string;

  expirationDate: string;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  underlying: string;
}

export namespace AnalyticsRetrieveResponse {
  export interface Analytics {
    /**
     * Lote padrão de negociação.
     */
    allocationRoundLot: number | null;

    /**
     * `true` quando a opção é exercida automaticamente no vencimento.
     */
    automaticExercise: boolean | null;

    /**
     * Código CFI.
     */
    cficCode: string | null;

    /**
     * Confiança do cálculo. `none` indica IV e gregas nulas, com o motivo em
     * `nullReason`. `low` indica cálculo sobre `referencePrice`.
     */
    confidence: 'high' | 'medium' | 'low' | 'none';

    /**
     * Multiplicador do contrato, herdado do futuro. Ex.: 330 arrobas no boi gordo.
     */
    contractMultiplier: number | null;

    /**
     * Data do pregão, no formato YYYY-MM-DD.
     */
    date: string;

    /**
     * Variação do prêmio para 1 unidade de variação no ativo subjacente.
     */
    delta: number | null;

    /**
     * Sempre `0` em opções sobre futuros.
     */
    dividendYield: number | null;

    /**
     * Tipo de exercício.
     */
    exerciseType: string | null;

    /**
     * Data de vencimento, no formato YYYY-MM-DD.
     */
    expirationDate: string;

    /**
     * Data do primeiro pregão da série, no formato YYYY-MM-DD.
     */
    firstTradeDate: string | null;

    /**
     * Variação do delta para 1 unidade de variação no ativo subjacente.
     */
    gamma: number | null;

    /**
     * Volatilidade implícita anual, em decimal. O cálculo usa tempo em dias corridos
     * dividido por 365.
     */
    impliedVolatility: number | null;

    /**
     * Código ISIN da série de opção.
     */
    isin: string | null;

    /**
     * Data do último pregão da série, no formato YYYY-MM-DD.
     */
    lastTradeDate: string | null;

    /**
     * Modelo de cálculo. Séries americanas usam árvore binomial sobre o futuro
     * (`cox-ross-rubinstein-futures`). Séries europeias usam `black-76`. `unsupported`
     * quando o estilo da opção é desconhecido.
     */
    model: 'black-76' | 'cox-ross-rubinstein-futures' | 'unsupported';

    /**
     * Motivo dos campos calculados nulos. Ex.: `no_trades`,
     * `missing_underlying_price`, `iv_not_converged`.
     */
    nullReason: string | null;

    /**
     * Contratos em aberto na série, na última apuração até a data pedida.
     */
    openInterest: number | null;

    /**
     * Variação de contratos em aberto desde a apuração anterior.
     */
    openInterestChange: number | null;

    /**
     * Data da apuração usada, no formato YYYY-MM-DD. Pode ser anterior à data do
     * pregão.
     */
    openInterestDate: string | null;

    /**
     * Preço da opção usado para calcular a volatilidade implícita.
     */
    optionPrice: number | null;

    /**
     * `american` permite exercício até o vencimento. `european` permite exercício só
     * no vencimento.
     */
    optionStyle: 'american' | 'european' | null;

    /**
     * `call` (opção de compra) ou `put` (opção de venda).
     */
    optionType: 'call' | 'put';

    /**
     * `true` se o prêmio é pago à vista, `false` se é diferido.
     */
    premiumUpfront: boolean | null;

    /**
     * Preço usado para calcular a IV. `close` é o fechamento negociado. Sem negócio, o
     * cálculo usa `referencePrice`, com `confidence` igual a `low`.
     */
    priceSource: 'close' | 'referencePrice' | 'none';

    /**
     * Variação do prêmio para 1,00 de variação na taxa de juro. Divida por 100 para 1
     * ponto percentual.
     */
    rho: number | null;

    /**
     * Taxa livre de risco anual, em decimal. Ex.: 0.105 para 10,5%.
     */
    riskFreeRate: number | null;

    /**
     * Segmento do contrato: `financial` ou `agribusiness`.
     */
    segment: 'financial' | 'agribusiness';

    /**
     * Preço de exercício da opção, na unidade de cotação do futuro.
     */
    strike: number;

    /**
     * Código da série de opção. Ex.: `BGIH27C028550`.
     */
    symbol: string;

    /**
     * Variação do prêmio com a passagem do tempo, por ano.
     */
    theta: number | null;

    /**
     * Dias corridos até o vencimento divididos por 365, inclusive em anos bissextos.
     */
    timeToExpirationYears: number | null;

    /**
     * Código do ativo do futuro. Ex.: `BGI`.
     */
    underlyingAsset: string;

    /**
     * Contrato futuro de base, quando informado.
     */
    underlyingFuture: string | null;

    /**
     * Preço do futuro subjacente usado no cálculo.
     */
    underlyingPrice: number | null;

    /**
     * Variação do prêmio para 1,00 de variação na volatilidade. Divida por 100 para 1
     * ponto percentual.
     */
    vega: number | null;
  }
}

export interface AnalyticsHistoryResponse {
  option: AnalyticsHistoryResponse.Option;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace AnalyticsHistoryResponse {
  export interface Option extends OptionsAPI.FutureOptionSpecs {
    analytics: Array<Option.Analytics>;
  }

  export namespace Option {
    export interface Analytics {
      /**
       * Confiança do cálculo. `none` indica IV e gregas nulas, com o motivo em
       * `nullReason`. `low` indica cálculo sobre `referencePrice`.
       */
      confidence: 'high' | 'medium' | 'low' | 'none';

      /**
       * Data do pregão, no formato YYYY-MM-DD.
       */
      date: string;

      /**
       * Variação do prêmio para 1 unidade de variação no ativo subjacente.
       */
      delta: number | null;

      /**
       * Sempre `0` em opções sobre futuros.
       */
      dividendYield: number | null;

      /**
       * Variação do delta para 1 unidade de variação no ativo subjacente.
       */
      gamma: number | null;

      /**
       * Volatilidade implícita anual, em decimal. O cálculo usa tempo em dias corridos
       * dividido por 365.
       */
      impliedVolatility: number | null;

      /**
       * Modelo de cálculo. Séries americanas usam árvore binomial sobre o futuro
       * (`cox-ross-rubinstein-futures`). Séries europeias usam `black-76`. `unsupported`
       * quando o estilo da opção é desconhecido.
       */
      model: 'black-76' | 'cox-ross-rubinstein-futures' | 'unsupported';

      /**
       * Motivo dos campos calculados nulos. Ex.: `no_trades`,
       * `missing_underlying_price`, `iv_not_converged`.
       */
      nullReason: string | null;

      /**
       * Contratos em aberto na série, na última apuração até a data pedida.
       */
      openInterest: number | null;

      /**
       * Variação de contratos em aberto desde a apuração anterior.
       */
      openInterestChange: number | null;

      /**
       * Data da apuração usada, no formato YYYY-MM-DD. Pode ser anterior à data do
       * pregão.
       */
      openInterestDate: string | null;

      /**
       * Preço da opção usado para calcular a volatilidade implícita.
       */
      optionPrice: number | null;

      /**
       * Preço usado para calcular a IV. `close` é o fechamento negociado. Sem negócio, o
       * cálculo usa `referencePrice`, com `confidence` igual a `low`.
       */
      priceSource: 'close' | 'referencePrice' | 'none';

      /**
       * Variação do prêmio para 1,00 de variação na taxa de juro. Divida por 100 para 1
       * ponto percentual.
       */
      rho: number | null;

      /**
       * Taxa livre de risco anual, em decimal. Ex.: 0.105 para 10,5%.
       */
      riskFreeRate: number | null;

      /**
       * Variação do prêmio com a passagem do tempo, por ano.
       */
      theta: number | null;

      /**
       * Dias corridos até o vencimento divididos por 365, inclusive em anos bissextos.
       */
      timeToExpirationYears: number | null;

      /**
       * Preço do futuro subjacente usado no cálculo.
       */
      underlyingPrice: number | null;

      /**
       * Variação do prêmio para 1,00 de variação na volatilidade. Divida por 100 para 1
       * ponto percentual.
       */
      vega: number | null;
    }
  }
}

export interface AnalyticsRetrieveParams {
  /**
   * Data de vencimento, no formato YYYY-MM-DD. Veja os vencimentos em
   * `/expirations`.
   */
  expirationDate: string;

  /**
   * Código do ativo do futuro. Ex.: `BGI`.
   */
  underlying: string;

  /**
   * Data do pregão, no formato YYYY-MM-DD. Padrão: último pregão disponível.
   */
  date?: string;

  /**
   * Número máximo de séries na resposta. Padrão: todas as séries do filtro.
   */
  limit?: number;

  /**
   * Strike máximo.
   */
  maxStrike?: number | null;

  /**
   * Strike mínimo.
   */
  minStrike?: number | null;

  /**
   * Filtra por `call` ou `put`. Sem o filtro, retorna os dois.
   */
  side?: 'call' | 'put';
}

export interface AnalyticsHistoryParams {
  /**
   * Código da série de opção.
   */
  symbol: string;

  /**
   * Data final, no formato YYYY-MM-DD. Padrão: hoje.
   */
  endDate?: string;

  /**
   * Ordem por data: `asc` do mais antigo ao mais recente, `desc` do mais recente ao
   * mais antigo.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial, no formato YYYY-MM-DD. Padrão: 12 meses atrás.
   */
  startDate?: string;
}

export declare namespace Analytics {
  export {
    type AnalyticsRetrieveResponse as AnalyticsRetrieveResponse,
    type AnalyticsHistoryResponse as AnalyticsHistoryResponse,
    type AnalyticsRetrieveParams as AnalyticsRetrieveParams,
    type AnalyticsHistoryParams as AnalyticsHistoryParams,
  };
}
