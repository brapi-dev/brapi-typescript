// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as OptionsAPI from './options';
import * as AnalyticsAPI from './analytics';
import {
  Analytics,
  AnalyticsHistoryParams,
  AnalyticsHistoryResponse,
  AnalyticsRetrieveParams,
  AnalyticsRetrieveResponse,
} from './analytics';
import * as PositionsAPI from './positions';
import {
  PositionHistoryParams,
  PositionHistoryResponse,
  PositionRetrieveParams,
  PositionRetrieveResponse,
  Positions,
} from './positions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Consulte contratos, cadeias EOD negociadas e histórico de opções.
 */
export class Options extends APIResource {
  positions: PositionsAPI.Positions = new PositionsAPI.Positions(this._client);
  analytics: AnalyticsAPI.Analytics = new AnalyticsAPI.Analytics(this._client);

  /**
   * Retorna as séries de opções de um vencimento, com dados do contrato (`symbol`,
   * `side`, `strike`, `optionStyle`) e a cotação do último pregão até `date`: OHLC,
   * bid, ask, volume e contratos em aberto.
   *
   * Use para montar uma tela de opções por vencimento, comparar calls e puts por
   * strike e filtrar séries por faixa de strike.
   *
   * A lista traz só séries com cotação nos 10 dias até `date`. Cada série traz a
   * cotação do seu último pregão nessa janela, que pode ser anterior a `date`.
   * Confira o campo `date` de cada série antes de usar o preço como atual.
   *
   * Nas séries de `DOL` e `WDO`, `referencePrice` pode vir preenchido com `close`,
   * `high` e `low` nulos, porque muitas séries não negociam no dia.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=PETR4`.
   *
   * @example
   * ```ts
   * const response = await client.v2.options.chain({
   *   expirationDate: '2026-12-18',
   *   underlying: 'PETR4',
   * });
   * ```
   */
  chain(query: OptionChainParams, options?: RequestOptions): APIPromise<OptionChainResponse> {
    return this._client.get('/api/v2/options/chain', { query, ...options });
  }

  /**
   * Retorna as datas de vencimento de opções de um ativo subjacente: ação, ETF,
   * índice, `DOL` ou `WDO`. Por padrão, só vencimentos futuros.
   *
   * Use para montar um seletor de vencimento, listar vencimentos passados em um
   * backtest e escolher a data antes de consultar a
   * [cadeia de opções](https://brapi.dev/docs/opcoes/series).
   *
   * Passe `includeExpired=true` para incluir vencimentos passados.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=PETR4`.
   *
   * @example
   * ```ts
   * const response = await client.v2.options.expirations({
   *   underlying: 'PETR4',
   * });
   * ```
   */
  expirations(
    query: OptionExpirationsParams,
    options?: RequestOptions,
  ): APIPromise<OptionExpirationsResponse> {
    return this._client.get('/api/v2/options/expirations', { query, ...options });
  }

  /**
   * Retorna o histórico diário de uma série de opção, identificada por `symbol` e
   * `expirationDate`: OHLC, bid, ask, negócios e volume por pregão.
   *
   * Use para montar gráficos de prêmio, fazer backtests e analisar a liquidez de uma
   * série.
   *
   * Se o mesmo `symbol` aparece duas vezes no vencimento, passe também `strike`.
   * Encontre a série na [cadeia de opções](https://brapi.dev/docs/opcoes/series).
   *
   * Séries fora do dinheiro passam dias sem negócio. Um pregão sem negócio não
   * aparece no histórico.
   *
   * Disponível no plano Pro. Sem token, aceita só `symbol` com prefixo `PETR`.
   *
   * @example
   * ```ts
   * const response = await client.v2.options.historical({
   *   expirationDate: '2026-12-18',
   *   symbol: 'PETRF783',
   * });
   * ```
   */
  historical(query: OptionHistoricalParams, options?: RequestOptions): APIPromise<OptionHistoricalResponse> {
    return this._client.get('/api/v2/options/historical', { query, ...options });
  }

  /**
   * Retorna os preços de exercício das séries negociadas de um vencimento, em ordem
   * crescente. Filtre por `call` ou `put` com `side`.
   *
   * Use para montar um seletor de strike sem baixar a cadeia inteira.
   *
   * Este passo é opcional: a
   * [cadeia de opções](https://brapi.dev/docs/opcoes/series) também aceita
   * `minStrike` e `maxStrike`.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=PETR4`.
   *
   * @example
   * ```ts
   * const response = await client.v2.options.strikes({
   *   expirationDate: '2026-12-18',
   *   underlying: 'PETR4',
   * });
   * ```
   */
  strikes(query: OptionStrikesParams, options?: RequestOptions): APIPromise<OptionStrikesResponse> {
    return this._client.get('/api/v2/options/strikes', { query, ...options });
  }
}

export interface OptionSeries {
  /**
   * Lote padrão de negociação. Em geral, 100 nas opções sobre ações.
   */
  allocationRoundLot: number | null;

  /**
   * Data de vencimento, no formato YYYY-MM-DD.
   */
  expirationDate: string;

  /**
   * Data do primeiro pregão da série, no formato YYYY-MM-DD.
   */
  firstTradeDate: string;

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
   * `american` permite exercício até o vencimento. `european` permite exercício só
   * no vencimento. Nulo quando o cadastro da série não informa o estilo.
   */
  optionStyle: 'american' | 'european' | null;

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
   * Ativo subjacente da opção. Ex.: PETR4.
   */
  underlyingSymbol: string | null;
}

export interface OptionChainResponse {
  /**
   * Último pregão com dados até a data pedida, no formato YYYY-MM-DD.
   */
  date: string;

  /**
   * Vencimento consultado, no formato YYYY-MM-DD.
   */
  expirationDate: string;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Séries do vencimento. Cada uma traz a cotação do seu último pregão até `date`.
   */
  series: Array<OptionChainResponse.Series>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  /**
   * Sempre `true`: a lista traz só séries com cotação nos 10 dias até `date`.
   */
  tradedOnly: true;

  /**
   * Ativo subjacente consultado, em maiúsculas.
   */
  underlying: string;
}

export namespace OptionChainResponse {
  export interface Series {
    /**
     * Lote padrão de negociação. Em geral, 100 nas opções sobre ações.
     */
    allocationRoundLot: number | null;

    /**
     * Melhor oferta de venda no fechamento.
     */
    ask: number | null;

    /**
     * Preço médio.
     */
    average: number | null;

    /**
     * Melhor oferta de compra no fechamento.
     */
    bid: number | null;

    /**
     * Preço de fechamento.
     */
    close: number | null;

    /**
     * Data do pregão, em timestamp Unix (segundos).
     */
    date: number;

    /**
     * Data de vencimento, no formato YYYY-MM-DD.
     */
    expirationDate: string;

    /**
     * Volume financeiro, em reais.
     */
    financialVolume: number | null;

    /**
     * Data do primeiro pregão da série, no formato YYYY-MM-DD.
     */
    firstTradeDate: string;

    /**
     * Preço máximo.
     */
    high: number | null;

    /**
     * Data do último pregão da série, no formato YYYY-MM-DD.
     */
    lastTradeDate: string;

    /**
     * Preço mínimo.
     */
    low: number | null;

    /**
     * Mercado da opção: `equity` para ação ou ETF, `index` para índice, `currency`
     * para DOL e WDO.
     */
    market: 'equity' | 'index' | 'currency';

    /**
     * Preço de abertura.
     */
    open: number | null;

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
     * `american` permite exercício até o vencimento. `european` permite exercício só
     * no vencimento. Nulo quando o cadastro da série não informa o estilo.
     */
    optionStyle: 'american' | 'european' | null;

    /**
     * Preço de referência do pregão.
     */
    referencePrice: number | null;

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
     * Número de negócios.
     */
    trades: number | null;

    /**
     * Ativo subjacente da opção. Ex.: PETR4.
     */
    underlyingSymbol: string | null;

    /**
     * Número de contratos negociados.
     */
    volume: number | null;
  }
}

export interface OptionExpirationsResponse {
  /**
   * Datas de vencimento em ordem crescente, no formato YYYY-MM-DD.
   */
  expirations: Array<string>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  /**
   * Sempre `true`: a lista vem das séries negociadas.
   */
  tradedOnly: true;

  /**
   * Ativo subjacente consultado, em maiúsculas.
   */
  underlying: string;
}

export interface OptionHistoricalResponse {
  /**
   * Dados da série e `history`, com um ponto por pregão no intervalo pedido.
   */
  option: OptionHistoricalResponse.Option;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace OptionHistoricalResponse {
  /**
   * Dados da série e `history`, com um ponto por pregão no intervalo pedido.
   */
  export interface Option extends OptionsAPI.OptionSeries {
    /**
     * Um ponto por pregão no intervalo pedido.
     */
    history: Array<Option.History>;
  }

  export namespace Option {
    export interface History {
      /**
       * Melhor oferta de venda no fechamento.
       */
      ask: number | null;

      /**
       * Preço médio.
       */
      average: number | null;

      /**
       * Melhor oferta de compra no fechamento.
       */
      bid: number | null;

      /**
       * Preço de fechamento.
       */
      close: number | null;

      /**
       * Data do pregão, em timestamp Unix (segundos).
       */
      date: number;

      /**
       * Volume financeiro, em reais.
       */
      financialVolume: number | null;

      /**
       * Preço máximo.
       */
      high: number | null;

      /**
       * Preço mínimo.
       */
      low: number | null;

      /**
       * Preço de abertura.
       */
      open: number | null;

      /**
       * Preço de referência do pregão.
       */
      referencePrice: number | null;

      /**
       * Número de negócios.
       */
      trades: number | null;

      /**
       * Número de contratos negociados.
       */
      volume: number | null;
    }
  }
}

export interface OptionStrikesResponse {
  /**
   * Vencimento consultado, no formato YYYY-MM-DD.
   */
  expirationDate: string;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Lado filtrado: `call`, `put` ou `null` sem filtro.
   */
  side: 'call' | 'put' | null;

  /**
   * Preços de exercício em ordem crescente.
   */
  strikes: Array<number>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  /**
   * Sempre `true`: os strikes vêm das séries negociadas.
   */
  tradedOnly: true;

  /**
   * Ativo subjacente consultado, em maiúsculas.
   */
  underlying: string;
}

export interface OptionChainParams {
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

export interface OptionExpirationsParams {
  /**
   * Ticker do ativo subjacente: ação, ETF, índice, `DOL` ou `WDO`.
   */
  underlying: string;

  /**
   * `true` inclui vencimentos passados. Padrão: `false`, só vencimentos futuros.
   */
  includeExpired?: 'true' | 'false';
}

export interface OptionHistoricalParams {
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

export interface OptionStrikesParams {
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
   * Filtra por `call` ou `put`. Sem o filtro, retorna os dois.
   */
  side?: 'call' | 'put';
}

Options.Positions = Positions;
Options.Analytics = Analytics;

export declare namespace Options {
  export {
    type OptionSeries as OptionSeries,
    type OptionChainResponse as OptionChainResponse,
    type OptionExpirationsResponse as OptionExpirationsResponse,
    type OptionHistoricalResponse as OptionHistoricalResponse,
    type OptionStrikesResponse as OptionStrikesResponse,
    type OptionChainParams as OptionChainParams,
    type OptionExpirationsParams as OptionExpirationsParams,
    type OptionHistoricalParams as OptionHistoricalParams,
    type OptionStrikesParams as OptionStrikesParams,
  };

  export {
    Positions as Positions,
    type PositionRetrieveResponse as PositionRetrieveResponse,
    type PositionHistoryResponse as PositionHistoryResponse,
    type PositionRetrieveParams as PositionRetrieveParams,
    type PositionHistoryParams as PositionHistoryParams,
  };

  export {
    Analytics as Analytics,
    type AnalyticsRetrieveResponse as AnalyticsRetrieveResponse,
    type AnalyticsHistoryResponse as AnalyticsHistoryResponse,
    type AnalyticsRetrieveParams as AnalyticsRetrieveParams,
    type AnalyticsHistoryParams as AnalyticsHistoryParams,
  };
}
