// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as OptionsAPI from './options';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Consulte contratos, cadeias EOD negociadas e histórico de opções.
 */
export class Analytics extends APIResource {
  /**
   * Retorna a volatilidade implícita e as gregas (delta, gamma, theta, vega e rho)
   * de cada série de um vencimento, calculadas sobre o preço de fechamento.
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
   * O cálculo usa só o fechamento negociado. Série sem negócio no dia não tem
   * cálculo: os campos calculados vêm `null` e `nullReason` diz o motivo.
   *
   * `theta` vem por ano. `vega` e `rho` medem o efeito de uma variação de 1,00 na
   * volatilidade e no juro. Divida por 100 para ter o efeito de 1 ponto percentual.
   *
   * Séries americanas usam árvore binomial. Séries europeias usam
   * Black-Scholes-Merton. `dividendYield` considera só os dividendos anunciados até
   * a data do cálculo.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=PETR4`.
   *
   * @example
   * ```ts
   * const analytics =
   *   await client.v2.options.analytics.retrieve({
   *     expirationDate: '2026-12-18',
   *     underlying: 'PETR4',
   *   });
   * ```
   */
  retrieve(query: AnalyticsRetrieveParams, options?: RequestOptions): APIPromise<AnalyticsRetrieveResponse> {
    return this._client.get('/api/v2/options/analytics', { query, ...options });
  }

  /**
   * Retorna o histórico diário de volatilidade implícita e gregas de uma série de
   * opção, identificada por `symbol` e `expirationDate`.
   *
   * Use para ver como a IV reagiu a eventos, como balanço, decisão de juros ou o
   * vencimento, e para testar estratégias com gregas.
   *
   * Os campos seguem as regras de
   * [gregas e IV](https://brapi.dev/docs/opcoes/analytics). Se o mesmo `symbol`
   * aparece duas vezes no vencimento, passe também `strike`.
   *
   * Disponível no plano Pro. Sem token, aceita só `symbol` com prefixo `PETR`.
   *
   * @example
   * ```ts
   * const response = await client.v2.options.analytics.history({
   *   expirationDate: '2026-12-18',
   *   symbol: 'PETRF783',
   * });
   * ```
   */
  history(query: AnalyticsHistoryParams, options?: RequestOptions): APIPromise<AnalyticsHistoryResponse> {
    return this._client.get('/api/v2/options/analytics/history', { query, ...options });
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
     * Lote padrão de negociação. Em geral, 100 nas opções sobre ações.
     */
    allocationRoundLot: number | null;

    /**
     * Confiança do cálculo. `none` indica IV e gregas nulas, com o motivo em
     * `nullReason`.
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
     * Yield contínuo dos dividendos anunciados até a data do cálculo. `0` sem
     * dividendo anunciado. Não inclui estimativas.
     */
    dividendYield: number | null;

    /**
     * Data de vencimento, no formato YYYY-MM-DD.
     */
    expirationDate: string;

    /**
     * Data do primeiro pregão da série, no formato YYYY-MM-DD.
     */
    firstTradeDate: string;

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
     * Data do último pregão da série, no formato YYYY-MM-DD.
     */
    lastTradeDate: string;

    /**
     * Mercado da opção: `equity` para ação ou ETF, `index` para índice, `currency`
     * para DOL e WDO.
     */
    market: 'equity' | 'index' | 'currency';

    /**
     * Modelo de cálculo. Séries americanas usam árvore binomial
     * (`cox-ross-rubinstein`). Séries europeias usam `black-scholes-merton`.
     * `unsupported` quando o estilo da opção é desconhecido.
     */
    model: 'black-scholes-merton' | 'barone-adesi-whaley' | 'cox-ross-rubinstein' | 'unsupported';

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
     * no vencimento. Nulo quando o cadastro da série não informa o estilo.
     */
    optionStyle: 'american' | 'european' | null;

    /**
     * Preço usado para calcular a IV. Aqui é sempre `close` ou `none`. Sem negócio no
     * dia, não há cálculo.
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
     * `call` (opção de compra) ou `put` (opção de venda).
     */
    side: 'call' | 'put';

    /**
     * Preço de exercício da opção.
     */
    strike: number | null;

    /**
     * Código da série de opção. Ex.: PETRF783.
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
     * Preço do ativo subjacente usado no cálculo.
     */
    underlyingPrice: number | null;

    /**
     * Ativo subjacente da opção. Ex.: PETR4.
     */
    underlyingSymbol: string | null;

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
  export interface Option extends OptionsAPI.OptionSeries {
    /**
     * Um ponto de IV e gregas por pregão no intervalo pedido.
     */
    analytics: Array<Option.Analytics>;
  }

  export namespace Option {
    export interface Analytics {
      /**
       * Confiança do cálculo. `none` indica IV e gregas nulas, com o motivo em
       * `nullReason`.
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
       * Yield contínuo dos dividendos anunciados até a data do cálculo. `0` sem
       * dividendo anunciado. Não inclui estimativas.
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
       * Modelo de cálculo. Séries americanas usam árvore binomial
       * (`cox-ross-rubinstein`). Séries europeias usam `black-scholes-merton`.
       * `unsupported` quando o estilo da opção é desconhecido.
       */
      model: 'black-scholes-merton' | 'barone-adesi-whaley' | 'cox-ross-rubinstein' | 'unsupported';

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
       * Preço usado para calcular a IV. Aqui é sempre `close` ou `none`. Sem negócio no
       * dia, não há cálculo.
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
       * Preço do ativo subjacente usado no cálculo.
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
   * Ticker do ativo subjacente: ação, ETF, índice, `DOL` ou `WDO`.
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
   * Data de vencimento da série, no formato YYYY-MM-DD.
   */
  expirationDate: string;

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

  /**
   * Preço de exercício. Use quando o mesmo `symbol` aparece mais de uma vez no
   * vencimento.
   */
  strike?: number | null;
}

export declare namespace Analytics {
  export {
    type AnalyticsRetrieveResponse as AnalyticsRetrieveResponse,
    type AnalyticsHistoryResponse as AnalyticsHistoryResponse,
    type AnalyticsRetrieveParams as AnalyticsRetrieveParams,
    type AnalyticsHistoryParams as AnalyticsHistoryParams,
  };
}
