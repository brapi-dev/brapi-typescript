// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FuturesAPI from './futures';
import * as OptionsAPI from './options/options';
import {
  FutureOptionSpecs,
  OptionChainParams,
  OptionChainResponse,
  OptionExpirationsParams,
  OptionExpirationsResponse,
  OptionHistoricalParams,
  OptionHistoricalResponse,
  OptionStrikesParams,
  OptionStrikesResponse,
  Options,
} from './options/options';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Futures extends APIResource {
  options: OptionsAPI.Options = new OptionsAPI.Options(this._client);

  /**
   * Contratos futuros com vencimento, multiplicador, lote e ISIN, sem preço. Filtre
   * por ativo, segmento e contratos vencidos.
   *
   * Use para achar o código exato de um contrato, listar os vencimentos de um ativo
   * ou montar um seletor de contratos.
   *
   * Um ativo tem vários contratos ao mesmo tempo, um por vencimento. `WINJ26` e
   * `WINM26` são o mesmo mini Ibovespa em meses diferentes. Veja como ler o código
   * em [futuros](https://brapi.dev/docs/futuros).
   *
   * Por padrão, a lista traz só contratos com vencimento a partir de hoje. Plano
   * Pro. Sem token, aceita só `asset=WIN` ou `asset=WDO`.
   *
   * @example
   * ```ts
   * const futures = await client.v2.futures.list();
   * ```
   */
  list(
    query: FutureListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FutureListResponse> {
    return this._client.get('/api/v2/futures/list', { query, ...options });
  }

  /**
   * Série diária de um contrato futuro: máxima, mínima, fechamento, preço de ajuste,
   * taxa de ajuste em contratos de juros, variação e volume.
   *
   * Use para gráficos, backtests ou para estudar o ajuste diário de um vencimento.
   *
   * Sem `startDate`, a série começa 12 meses antes de hoje. Sem `endDate`, termina
   * hoje. O histórico cobre cerca de 1 ano. `open` vem sempre `null`, porque os
   * dados de fim de dia não trazem abertura.
   *
   * A série termina no vencimento do contrato. Para seguir um ativo por mais tempo,
   * junte contratos seguidos e trate o salto de preço na troca. Para vários
   * contratos, use a [cotação](https://brapi.dev/docs/futuros/cotacao) ou a
   * [curva de vencimentos](https://brapi.dev/docs/futuros/curva-de-vencimentos).
   *
   * Plano Pro. Sem token, aceita só `symbol` que começa com `WIN` ou `WDO`.
   *
   * @example
   * ```ts
   * const response = await client.v2.futures.historical({
   *   symbol: 'WINM26',
   * });
   * ```
   */
  historical(query: FutureHistoricalParams, options?: RequestOptions): APIPromise<FutureHistoricalResponse> {
    return this._client.get('/api/v2/futures/historical', { query, ...options });
  }

  /**
   * Dados do último pregão de até 20 contratos futuros: máxima, mínima, fechamento,
   * preço de ajuste, variação e volume.
   *
   * Use para mostrar o ajuste do dia, marcar posições a mercado ou montar um painel
   * de futuros.
   *
   * `settlement` é o preço de ajuste. A bolsa usa esse preço para acertar as
   * posições todo dia. `close` é o último negócio. Em contrato com pouca negociação,
   * `close`, `high` e `low` podem vir `null`, e `settlement` continua preenchido.
   *
   * Em contratos de juros, como DI1 e DAP (`quotationType=rate`), `close`, `high`,
   * `low` e `average` vêm em % a.a. `settlement` vem em reais, e a taxa do ajuste
   * fica em `settlementRate`.
   *
   * Os dados são de fim de dia. Código desconhecido fica fora de `quotes`. Plano
   * Pro. Sem token, aceita só `symbols` que começam com `WIN` ou `WDO`.
   *
   * @example
   * ```ts
   * const response = await client.v2.futures.quote({
   *   symbols: 'WINM26,BGIF27,DI1F27',
   * });
   * ```
   */
  quote(query: FutureQuoteParams, options?: RequestOptions): APIPromise<FutureQuoteResponse> {
    return this._client.get('/api/v2/futures/quote', { query, ...options });
  }

  /**
   * Dados fixos de até 20 contratos futuros, sem preço: vencimento, primeiro e
   * último pregão, multiplicador, lote, tipo de entrega, ISIN e código CFI.
   *
   * Use para calcular o valor financeiro de uma posição, conferir vencimentos ou
   * cadastrar contratos no seu sistema.
   *
   * `contractMultiplier` converte pontos em reais. Exemplos: `WIN` vale 0,2 por
   * ponto, `WDO` vale 10 e `BGI` vale 330. Para o preço do dia, use a
   * [cotação de futuros](https://brapi.dev/docs/futuros/cotacao).
   *
   * Plano Pro. Sem token, aceita só `symbols` que começam com `WIN` ou `WDO`.
   *
   * @example
   * ```ts
   * const response = await client.v2.futures.specs({
   *   symbols: 'WINM26,BGIF27,DI1F27',
   * });
   * ```
   */
  specs(query: FutureSpecsParams, options?: RequestOptions): APIPromise<FutureSpecsResponse> {
    return this._client.get('/api/v2/futures/specs', { query, ...options });
  }

  /**
   * Todos os contratos futuros de um ativo com vencimento a partir de hoje, do mais
   * próximo ao mais distante, cada um com os dados do último pregão.
   *
   * Use para montar a curva de juros do DI, ver a curva de preço de commodities ou
   * comparar vencimentos do mini Ibovespa.
   *
   * Em `DI1`, a taxa de cada prazo fica em `settlementRate`. Nos contratos cotados
   * em preço, use `settlement`. Com `includeExpired=true`, a resposta inclui
   * contratos vencidos.
   *
   * Ativos comuns: `DI1` (DI), `WIN` (mini Ibovespa), `WDO` (mini dólar), `BGI` (boi
   * gordo), `ICF` (café), `CCM` (milho) e `SJC` (soja).
   *
   * Plano Pro. Sem token, aceita só `asset=WIN` ou `asset=WDO`.
   *
   * @example
   * ```ts
   * const response = await client.v2.futures.termStructure({
   *   asset: 'BGI',
   * });
   * ```
   */
  termStructure(
    query: FutureTermStructureParams,
    options?: RequestOptions,
  ): APIPromise<FutureTermStructureResponse> {
    return this._client.get('/api/v2/futures/term-structure', { query, ...options });
  }
}

export interface FutureQuote {
  /**
   * Tamanho do lote, em contratos.
   */
  allocationRoundLot: number | null;

  /**
   * Nome do ativo em português.
   */
  assetDescription: string | null;

  /**
   * Preço médio do dia. Em % a.a. nos contratos de juros.
   */
  average: number | null;

  /**
   * Código CFI.
   */
  cficCode: string | null;

  /**
   * Último negócio do dia. Em % a.a. nos contratos de juros.
   */
  close: number | null;

  /**
   * Valor de um ponto, em reais. Ex.: `WIN` 0,2, `BGI` 330, `DI1` 1.
   */
  contractMultiplier: number | null;

  /**
   * Data do pregão, em Unix timestamp (segundos).
   */
  date: number;

  /**
   * Tipo de entrega: `Financial` ou `Physical`.
   */
  deliveryType: string | null;

  /**
   * Forma de cotação: `Price` ou `Rate`.
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
   * Data do primeiro pregão, no formato YYYY-MM-DD.
   */
  firstTradeDate: string | null;

  /**
   * Máxima do dia. Em % a.a. nos contratos de juros.
   */
  high: number | null;

  /**
   * Código ISIN.
   */
  isin: string | null;

  /**
   * Data do último pregão, no formato YYYY-MM-DD.
   */
  lastTradeDate: string | null;

  /**
   * Mínima do dia. Em % a.a. nos contratos de juros.
   */
  low: number | null;

  /**
   * Preço de abertura. Sempre `null`, porque os dados de fim de dia não trazem
   * abertura.
   */
  open: number | null;

  /**
   * Variação em relação ao pregão anterior, em %.
   */
  oscillationPct: number | null;

  /**
   * `rate` em contratos de juros, como DI1 e DAP, com preços em % a.a. `price` nos
   * demais.
   */
  quotationType: 'price' | 'rate';

  /**
   * Preço de referência oficial.
   */
  referencePrice: number | null;

  /**
   * `financial` para índices, juros e moedas. `agribusiness` para commodities.
   */
  segment: 'financial' | 'agribusiness';

  /**
   * Preço de ajuste oficial do dia. Nos contratos de juros, vem em reais, como preço
   * unitário.
   */
  settlement: number | null;

  /**
   * Taxa do ajuste, em % a.a. Só vem em contratos de juros.
   */
  settlementRate: number | null;

  /**
   * Código do contrato. Ex.: `WINM26`, `BGIF27`, `DI1F27`.
   */
  symbol: string;

  /**
   * Número de negócios.
   */
  trades: number | null;

  /**
   * Moeda de negociação. Quase sempre `BRL`.
   */
  tradingCurrency: string | null;

  /**
   * Código do ativo, sem mês e ano. Ex.: `WIN`, `BGI`, `DI1`.
   */
  underlyingAsset: string;

  /**
   * Contratos negociados.
   */
  volume: number | null;
}

export interface FutureSpecs {
  /**
   * Tamanho do lote, em contratos.
   */
  allocationRoundLot: number | null;

  /**
   * Nome do ativo em português.
   */
  assetDescription: string | null;

  /**
   * Código CFI.
   */
  cficCode: string | null;

  /**
   * Valor de um ponto, em reais. Ex.: `WIN` 0,2, `BGI` 330, `DI1` 1.
   */
  contractMultiplier: number | null;

  /**
   * Tipo de entrega: `Financial` ou `Physical`.
   */
  deliveryType: string | null;

  /**
   * Forma de cotação: `Price` ou `Rate`.
   */
  exerciseType: string | null;

  /**
   * Data de vencimento, no formato YYYY-MM-DD.
   */
  expirationDate: string;

  /**
   * Data do primeiro pregão, no formato YYYY-MM-DD.
   */
  firstTradeDate: string | null;

  /**
   * Código ISIN.
   */
  isin: string | null;

  /**
   * Data do último pregão, no formato YYYY-MM-DD.
   */
  lastTradeDate: string | null;

  /**
   * `rate` em contratos de juros, como DI1 e DAP, com preços em % a.a. `price` nos
   * demais.
   */
  quotationType: 'price' | 'rate';

  /**
   * `financial` para índices, juros e moedas. `agribusiness` para commodities.
   */
  segment: 'financial' | 'agribusiness';

  /**
   * Código do contrato. Ex.: `WINM26`, `BGIF27`, `DI1F27`.
   */
  symbol: string;

  /**
   * Moeda de negociação. Quase sempre `BRL`.
   */
  tradingCurrency: string | null;

  /**
   * Código do ativo, sem mês e ano. Ex.: `WIN`, `BGI`, `DI1`.
   */
  underlyingAsset: string;
}

export interface FutureListResponse {
  futures: Array<FutureSpecs>;

  pagination: FutureListResponse.Pagination;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FutureListResponse {
  export interface Pagination {
    limit: number;

    page: number;

    total: number;

    totalPages: number;
  }
}

export interface FutureHistoricalResponse {
  future: FutureHistoricalResponse.Future;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FutureHistoricalResponse {
  export interface Future extends FuturesAPI.FutureSpecs {
    /**
     * Um item por pregão no período pedido.
     */
    history: Array<Future.History>;
  }

  export namespace Future {
    export interface History {
      /**
       * Preço médio do dia. Em % a.a. nos contratos de juros.
       */
      average: number | null;

      /**
       * Último negócio do dia. Em % a.a. nos contratos de juros.
       */
      close: number | null;

      /**
       * Data do pregão, em Unix timestamp (segundos).
       */
      date: number;

      /**
       * Volume financeiro, em reais.
       */
      financialVolume: number | null;

      /**
       * Máxima do dia. Em % a.a. nos contratos de juros.
       */
      high: number | null;

      /**
       * Mínima do dia. Em % a.a. nos contratos de juros.
       */
      low: number | null;

      /**
       * Preço de abertura. Sempre `null`, porque os dados de fim de dia não trazem
       * abertura.
       */
      open: number | null;

      /**
       * Variação em relação ao pregão anterior, em %.
       */
      oscillationPct: number | null;

      /**
       * Preço de referência oficial.
       */
      referencePrice: number | null;

      /**
       * Preço de ajuste oficial do dia. Nos contratos de juros, vem em reais, como preço
       * unitário.
       */
      settlement: number | null;

      /**
       * Taxa do ajuste, em % a.a. Só vem em contratos de juros.
       */
      settlementRate: number | null;

      /**
       * Número de negócios.
       */
      trades: number | null;

      /**
       * Contratos negociados.
       */
      volume: number | null;
    }
  }
}

export interface FutureQuoteResponse {
  quotes: Array<FutureQuote>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface FutureSpecsResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  specs: Array<FutureSpecs>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface FutureTermStructureResponse {
  asset: string;

  contracts: Array<FutureQuote>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface FutureListParams {
  /**
   * Código do ativo. Ex.: `WIN`, `BGI`, `DI1`.
   */
  asset?: string;

  /**
   * `true` inclui contratos vencidos.
   */
  includeExpired?: 'true' | 'false';

  /**
   * Itens por página. Máximo: 100.
   */
  limit?: number;

  /**
   * Número da página, a partir de 1.
   */
  page?: number;

  /**
   * Segmento do contrato.
   */
  segment?: 'financial' | 'agribusiness';

  /**
   * Campo usado na ordenação.
   */
  sortBy?: 'symbol' | 'expirationDate' | 'underlyingAsset';

  /**
   * Direção da ordenação.
   */
  sortOrder?: 'asc' | 'desc';
}

export interface FutureHistoricalParams {
  /**
   * Código do contrato. Ex.: `WINM26`.
   */
  symbol: string;

  /**
   * Data final no formato YYYY-MM-DD. Padrão: hoje.
   */
  endDate?: string;

  /**
   * Ordem das datas. `desc` traz o pregão mais recente primeiro.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD. Padrão: 12 meses antes de hoje.
   */
  startDate?: string;
}

export interface FutureQuoteParams {
  /**
   * Contratos separados por vírgula, até 20. Ex.: WINM26,DI1F27.
   */
  symbols: string;
}

export interface FutureSpecsParams {
  /**
   * Contratos separados por vírgula, até 20. Ex.: WINM26,DI1F27.
   */
  symbols: string;
}

export interface FutureTermStructureParams {
  /**
   * Código do ativo. Ex.: `DI1`, `WIN`, `BGI`.
   */
  asset: string;

  /**
   * `true` inclui contratos vencidos.
   */
  includeExpired?: 'true' | 'false';
}

Futures.Options = Options;

export declare namespace Futures {
  export {
    type FutureQuote as FutureQuote,
    type FutureSpecs as FutureSpecs,
    type FutureListResponse as FutureListResponse,
    type FutureHistoricalResponse as FutureHistoricalResponse,
    type FutureQuoteResponse as FutureQuoteResponse,
    type FutureSpecsResponse as FutureSpecsResponse,
    type FutureTermStructureResponse as FutureTermStructureResponse,
    type FutureListParams as FutureListParams,
    type FutureHistoricalParams as FutureHistoricalParams,
    type FutureQuoteParams as FutureQuoteParams,
    type FutureSpecsParams as FutureSpecsParams,
    type FutureTermStructureParams as FutureTermStructureParams,
  };

  export {
    Options as Options,
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
}
