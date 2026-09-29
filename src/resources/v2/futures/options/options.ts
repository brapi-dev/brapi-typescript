// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
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
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';

export class Options extends APIResource {
  positions: PositionsAPI.Positions = new PositionsAPI.Positions(this._client);
  analytics: AnalyticsAPI.Analytics = new AnalyticsAPI.Analytics(this._client);

  /**
   * Retorna as calls e puts de um vencimento de opções sobre futuro, com dados do
   * contrato (`symbol`, `optionType`, `optionStyle`, `strike`, `contractMultiplier`)
   * e a cotação do pregão: OHLC, `referencePrice`, volume e contratos em aberto.
   *
   * Use para montar uma tela de opções por vencimento, comparar calls e puts por
   * strike e filtrar séries por faixa de strike.
   *
   * Todas as séries vêm do mesmo pregão: o último com dados até a data pedida,
   * informado em `date`. Séries sem registro nesse pregão não aparecem.
   *
   * Muitas séries não negociam todo dia. Sem negócio, `close` vem `null` e
   * `referencePrice` costuma vir preenchido.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=BGI`.
   *
   * @example
   * ```ts
   * const response = await client.v2.futures.options.chain({
   *   expirationDate: '2027-08-31',
   *   underlying: 'BGI',
   * });
   * ```
   */
  chain(query: OptionChainParams, options?: RequestOptions): APIPromise<OptionChainResponse> {
    return this._client.get('/api/v2/futures/options/chain', { query, ...options });
  }

  /**
   * Retorna as datas de vencimento de opções sobre um contrato futuro, como boi
   * gordo (`BGI`), café arábica (`ICF`), milho (`CCM`) e soja (`SJC`). Por padrão,
   * só vencimentos futuros.
   *
   * Use para montar um seletor de vencimento, listar vencimentos passados em um
   * backtest e escolher a data antes de consultar a
   * [cadeia de opções sobre futuros](https://brapi.dev/docs/futuros/opcoes/series).
   *
   * Passe `includeExpired=true` para incluir vencimentos passados. O vencimento da
   * opção pode ser diferente do vencimento do futuro. Não calcule uma data a partir
   * da outra.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=BGI`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v2.futures.options.expirations({
   *     underlying: 'BGI',
   *   });
   * ```
   */
  expirations(
    query: OptionExpirationsParams,
    options?: RequestOptions,
  ): APIPromise<OptionExpirationsResponse> {
    return this._client.get('/api/v2/futures/options/expirations', { query, ...options });
  }

  /**
   * Retorna o histórico diário de uma opção sobre futuro, identificada por `symbol`:
   * dados do contrato e, por pregão, OHLC, `referencePrice`, `oscillationPct`,
   * negócios e volume.
   *
   * Use para montar gráficos de prêmio, fazer backtests e analisar a liquidez de uma
   * série.
   *
   * Encontre a série na
   * [cadeia de opções sobre futuros](https://brapi.dev/docs/futuros/opcoes/series).
   * Séries longe do preço do futuro quase não negociam, e o histórico pode ter
   * poucos pregões.
   *
   * Disponível no plano Pro. Sem token, aceita só `symbol` com prefixo `BGI`.
   *
   * @example
   * ```ts
   * const response = await client.v2.futures.options.historical(
   *   { symbol: 'BGIM26C028000' },
   * );
   * ```
   */
  historical(query: OptionHistoricalParams, options?: RequestOptions): APIPromise<OptionHistoricalResponse> {
    return this._client.get('/api/v2/futures/options/historical', { query, ...options });
  }

  /**
   * Retorna os preços de exercício das séries de opções sobre futuro de um
   * vencimento, em ordem crescente. Filtre por `call` ou `put` com `side`.
   *
   * Use para montar um seletor de strike sem baixar a cadeia inteira.
   *
   * Este passo é opcional: a
   * [cadeia de opções sobre futuros](https://brapi.dev/docs/futuros/opcoes/series)
   * também aceita `minStrike` e `maxStrike`.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=BGI`.
   *
   * @example
   * ```ts
   * const response = await client.v2.futures.options.strikes({
   *   expirationDate: '2027-08-31',
   *   underlying: 'BGI',
   * });
   * ```
   */
  strikes(query: OptionStrikesParams, options?: RequestOptions): APIPromise<OptionStrikesResponse> {
    return this._client.get('/api/v2/futures/options/strikes', { query, ...options });
  }
}

export interface FutureOptionSpecs {
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
   * Multiplicador do contrato, herdado do futuro. Ex.: 330 arrobas no boi gordo.
   */
  contractMultiplier: number | null;

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
   * Código ISIN da série de opção.
   */
  isin: string | null;

  /**
   * Data do último pregão da série, no formato YYYY-MM-DD.
   */
  lastTradeDate: string | null;

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
   * Código do ativo do futuro. Ex.: `BGI`.
   */
  underlyingAsset: string;

  /**
   * Contrato futuro de base, quando informado.
   */
  underlyingFuture: string | null;
}

export interface OptionChainResponse {
  date: string;

  expirationDate: string;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  series: Array<OptionChainResponse.Series>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  underlying: string;
}

export namespace OptionChainResponse {
  export interface Series {
    /**
     * Lote padrão de negociação.
     */
    allocationRoundLot: number | null;

    /**
     * `true` quando a opção é exercida automaticamente no vencimento.
     */
    automaticExercise: boolean | null;

    /**
     * Preço médio.
     */
    average: number | null;

    /**
     * Código CFI.
     */
    cficCode: string | null;

    /**
     * Preço de fechamento.
     */
    close: number | null;

    /**
     * Multiplicador do contrato, herdado do futuro. Ex.: 330 arrobas no boi gordo.
     */
    contractMultiplier: number | null;

    /**
     * Data do pregão, em timestamp Unix (segundos).
     */
    date: number;

    /**
     * Tipo de exercício.
     */
    exerciseType: string | null;

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
    firstTradeDate: string | null;

    /**
     * Preço máximo.
     */
    high: number | null;

    /**
     * Código ISIN da série de opção.
     */
    isin: string | null;

    /**
     * Data do último pregão da série, no formato YYYY-MM-DD.
     */
    lastTradeDate: string | null;

    /**
     * Preço mínimo.
     */
    low: number | null;

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
     * no vencimento.
     */
    optionStyle: 'american' | 'european' | null;

    /**
     * `call` (opção de compra) ou `put` (opção de venda).
     */
    optionType: 'call' | 'put';

    /**
     * Variação percentual em relação ao pregão anterior.
     */
    oscillationPct: number | null;

    /**
     * `true` se o prêmio é pago à vista, `false` se é diferido.
     */
    premiumUpfront: boolean | null;

    /**
     * Preço de referência do pregão. Costuma vir preenchido mesmo sem negócio.
     */
    referencePrice: number | null;

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
     * Número de negócios.
     */
    trades: number | null;

    /**
     * Código do ativo do futuro. Ex.: `BGI`.
     */
    underlyingAsset: string;

    /**
     * Contrato futuro de base, quando informado.
     */
    underlyingFuture: string | null;

    /**
     * Número de contratos negociados.
     */
    volume: number | null;
  }
}

export interface OptionExpirationsResponse {
  expirations: Array<string>;

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

export interface OptionHistoricalResponse {
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
  export interface Option extends OptionsAPI.FutureOptionSpecs {
    history: Array<Option.History>;
  }

  export namespace Option {
    export interface History {
      /**
       * Preço médio.
       */
      average: number | null;

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
       * Variação percentual em relação ao pregão anterior.
       */
      oscillationPct: number | null;

      /**
       * Preço de referência do pregão. Costuma vir preenchido mesmo sem negócio.
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
  expirationDate: string;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  side: 'call' | 'put' | null;

  strikes: Array<number>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  underlying: string;
}

export interface OptionChainParams {
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
   * Código do ativo do futuro. Ex.: `BGI`, `ICF`.
   */
  underlying: string;

  /**
   * `true` inclui vencimentos passados. Padrão: `false`, só vencimentos futuros.
   */
  includeExpired?: 'true' | 'false';
}

export interface OptionHistoricalParams {
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

export interface OptionStrikesParams {
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
   * Filtra por `call` ou `put`. Sem o filtro, retorna os dois.
   */
  side?: 'call' | 'put';
}

Options.Positions = Positions;
Options.Analytics = Analytics;

export declare namespace Options {
  export {
    type FutureOptionSpecs as FutureOptionSpecs,
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
