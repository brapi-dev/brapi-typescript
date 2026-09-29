// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as OptionsAPI from './options';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';

export class Positions extends APIResource {
  /**
   * Retorna os contratos em aberto de cada série de opções sobre futuro de um
   * vencimento.
   *
   * Use para ver onde se concentram as posições por strike, comparar calls e puts e
   * acompanhar a variação diária de contratos em aberto.
   *
   * Use `openInterest` como número de contratos em aberto. Aqui ele repete
   * `reportedOpenInterest`. Os campos de posição coberta, descoberta, bloqueada e de
   * empréstimo vêm vazios na maior parte dos segmentos de futuros. Volume e
   * contratos em aberto medem coisas diferentes: uma série pode ficar sem negócio e
   * ter muitos contratos em aberto.
   *
   * Os contratos em aberto são apurados uma vez por pregão. Sem apuração na data
   * pedida, a resposta traz a anterior. Confira `openInterestDate` antes de comparar
   * com o preço do dia.
   *
   * Aceita os mesmos filtros da
   * [cadeia de opções sobre futuros](https://brapi.dev/docs/futuros/opcoes/series):
   * `side`, `minStrike` e `maxStrike`.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=BGI`.
   *
   * @example
   * ```ts
   * const position =
   *   await client.v2.futures.options.positions.retrieve({
   *     expirationDate: '2027-08-31',
   *     underlying: 'BGI',
   *   });
   * ```
   */
  retrieve(query: PositionRetrieveParams, options?: RequestOptions): APIPromise<PositionRetrieveResponse> {
    return this._client.get('/api/v2/futures/options/positions', { query, ...options });
  }

  /**
   * Retorna o histórico diário de contratos em aberto de uma opção sobre futuro,
   * identificada por `symbol`.
   *
   * Use para ver a montagem e a desmontagem de posições ao longo do tempo e comparar
   * contratos em aberto com o preço.
   *
   * Cada item é uma apuração diária. Pregão sem apuração não aparece.
   *
   * Disponível no plano Pro. Sem token, aceita só `symbol` com prefixo `BGI`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v2.futures.options.positions.history({
   *     symbol: 'BGIM26C028000',
   *   });
   * ```
   */
  history(query: PositionHistoryParams, options?: RequestOptions): APIPromise<PositionHistoryResponse> {
    return this._client.get('/api/v2/futures/options/positions/history', { query, ...options });
  }
}

export interface PositionRetrieveResponse {
  date: string;

  expirationDate: string;

  positions: Array<PositionRetrieveResponse.Position>;

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

export namespace PositionRetrieveResponse {
  export interface Position {
    /**
     * Lote padrão de negociação.
     */
    allocationRoundLot: number | null;

    /**
     * Código raiz do ativo objeto. Ex.: BGI.
     */
    asset: string | null;

    /**
     * `true` quando a opção é exercida automaticamente no vencimento.
     */
    automaticExercise: boolean | null;

    /**
     * Contratos em posição bloqueada.
     */
    blockedQuantity: number | null;

    /**
     * Quantidade tomadora em empréstimo de ativos.
     */
    borrowerQuantity: number | null;

    /**
     * Código CFI.
     */
    cficCode: string | null;

    /**
     * Multiplicador do contrato, herdado do futuro. Ex.: 330 arrobas no boi gordo.
     */
    contractMultiplier: number | null;

    /**
     * Contratos em posição coberta.
     */
    coveredQuantity: number | null;

    /**
     * Quantidade corrente. Preenchida só em alguns segmentos.
     */
    currentQuantity: number | null;

    /**
     * Número de distribuição do ativo objeto. Vem vazio nas opções sobre futuros.
     */
    distributionId: string | null;

    /**
     * Tipo de exercício.
     */
    exerciseType: string | null;

    /**
     * Código de vencimento da apuração. Ex.: VVNK.
     */
    expirationCode: string | null;

    /**
     * Data de vencimento, no formato YYYY-MM-DD.
     */
    expirationDate: string;

    /**
     * Data do primeiro pregão da série, no formato YYYY-MM-DD.
     */
    firstTradeDate: string | null;

    /**
     * Preço a termo. Preenchido só em alguns segmentos.
     */
    forwardPrice: number | null;

    /**
     * Código ISIN da série de opção, não do contrato futuro.
     */
    isin: string | null;

    /**
     * Data do último pregão da série, no formato YYYY-MM-DD.
     */
    lastTradeDate: string | null;

    /**
     * Quantidade doadora em empréstimo de ativos.
     */
    lenderQuantity: number | null;

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
     * `true` se o prêmio é pago à vista, `false` se é diferido.
     */
    premiumUpfront: boolean | null;

    /**
     * Data da apuração, no formato YYYY-MM-DD.
     */
    reportDate: string;

    /**
     * Contratos em aberto na apuração do pregão. É a origem de `openInterest`.
     */
    reportedOpenInterest: number | null;

    /**
     * Variação de contratos em aberto na apuração do pregão. É a origem de
     * `openInterestChange`.
     */
    reportedOpenInterestChange: number | null;

    /**
     * Segmento da apuração. Ex.: AGRIBUSINESS. É diferente do campo `segment` do
     * contrato.
     */
    reportSegment: string;

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
     * Total de contratos em posição. Vem vazio na maior parte dos segmentos de
     * futuros.
     */
    totalPositionQuantity: number | null;

    /**
     * Contratos em posição descoberta.
     */
    uncoveredQuantity: number | null;

    /**
     * Código do ativo do futuro. Ex.: `BGI`.
     */
    underlyingAsset: string;

    /**
     * Contrato futuro de base, quando informado.
     */
    underlyingFuture: string | null;
  }
}

export interface PositionHistoryResponse {
  option: PositionHistoryResponse.Option;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace PositionHistoryResponse {
  export interface Option extends OptionsAPI.FutureOptionSpecs {
    positions: Array<Option.Position>;
  }

  export namespace Option {
    export interface Position {
      /**
       * Código raiz do ativo objeto. Ex.: BGI.
       */
      asset: string | null;

      /**
       * Contratos em posição bloqueada.
       */
      blockedQuantity: number | null;

      /**
       * Quantidade tomadora em empréstimo de ativos.
       */
      borrowerQuantity: number | null;

      /**
       * Contratos em posição coberta.
       */
      coveredQuantity: number | null;

      /**
       * Quantidade corrente. Preenchida só em alguns segmentos.
       */
      currentQuantity: number | null;

      /**
       * Número de distribuição do ativo objeto. Vem vazio nas opções sobre futuros.
       */
      distributionId: string | null;

      /**
       * Código de vencimento da apuração. Ex.: VVNK.
       */
      expirationCode: string | null;

      /**
       * Preço a termo. Preenchido só em alguns segmentos.
       */
      forwardPrice: number | null;

      /**
       * Código ISIN da série de opção, não do contrato futuro.
       */
      isin: string | null;

      /**
       * Quantidade doadora em empréstimo de ativos.
       */
      lenderQuantity: number | null;

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
       * Data da apuração, no formato YYYY-MM-DD.
       */
      reportDate: string;

      /**
       * Contratos em aberto na apuração do pregão. É a origem de `openInterest`.
       */
      reportedOpenInterest: number | null;

      /**
       * Variação de contratos em aberto na apuração do pregão. É a origem de
       * `openInterestChange`.
       */
      reportedOpenInterestChange: number | null;

      /**
       * Segmento da apuração. Ex.: AGRIBUSINESS. É diferente do campo `segment` do
       * contrato.
       */
      reportSegment: string;

      /**
       * Total de contratos em posição. Vem vazio na maior parte dos segmentos de
       * futuros.
       */
      totalPositionQuantity: number | null;

      /**
       * Contratos em posição descoberta.
       */
      uncoveredQuantity: number | null;
    }
  }
}

export interface PositionRetrieveParams {
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

export interface PositionHistoryParams {
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

export declare namespace Positions {
  export {
    type PositionRetrieveResponse as PositionRetrieveResponse,
    type PositionHistoryResponse as PositionHistoryResponse,
    type PositionRetrieveParams as PositionRetrieveParams,
    type PositionHistoryParams as PositionHistoryParams,
  };
}
