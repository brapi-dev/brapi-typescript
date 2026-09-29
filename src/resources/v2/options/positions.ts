// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as OptionsAPI from './options';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Consulte contratos, cadeias EOD negociadas e histórico de opções.
 */
export class Positions extends APIResource {
  /**
   * Retorna os contratos em aberto de cada série de um vencimento, com a divisão
   * entre posição coberta, descoberta e bloqueada.
   *
   * Use para ver onde se concentram as posições por strike, comparar calls e puts e
   * acompanhar a variação diária de contratos em aberto.
   *
   * Use `openInterest` como número de contratos em aberto. Nas opções sobre ações,
   * ele vem de `totalPositionQuantity`, porque `reportedOpenInterest` vem vazio.
   * Volume e contratos em aberto medem coisas diferentes: uma série pode ficar sem
   * negócio e ter muitos contratos em aberto.
   *
   * Os contratos em aberto são apurados uma vez por pregão. Sem apuração na data
   * pedida, a resposta traz a anterior. Confira `openInterestDate` antes de comparar
   * com o preço do dia.
   *
   * Aceita os mesmos filtros da
   * [cadeia de opções](https://brapi.dev/docs/opcoes/series): `side`, `minStrike` e
   * `maxStrike`.
   *
   * Disponível no plano Pro. Sem token, aceita só `underlying=PETR4`.
   *
   * @example
   * ```ts
   * const position = await client.v2.options.positions.retrieve(
   *   { expirationDate: '2026-12-18', underlying: 'PETR4' },
   * );
   * ```
   */
  retrieve(query: PositionRetrieveParams, options?: RequestOptions): APIPromise<PositionRetrieveResponse> {
    return this._client.get('/api/v2/options/positions', { query, ...options });
  }

  /**
   * Retorna o histórico diário de contratos em aberto de uma série de opção,
   * identificada por `symbol` e `expirationDate`.
   *
   * Use para ver a montagem e a desmontagem de posições ao longo do tempo e comparar
   * contratos em aberto com o preço.
   *
   * Cada item é uma apuração diária. Pregão sem apuração não aparece. Se o mesmo
   * `symbol` aparece duas vezes no vencimento, passe também `strike`.
   *
   * Disponível no plano Pro. Sem token, aceita só `symbol` com prefixo `PETR`.
   *
   * @example
   * ```ts
   * const response = await client.v2.options.positions.history({
   *   expirationDate: '2026-12-18',
   *   symbol: 'PETRF783',
   * });
   * ```
   */
  history(query: PositionHistoryParams, options?: RequestOptions): APIPromise<PositionHistoryResponse> {
    return this._client.get('/api/v2/options/positions/history', { query, ...options });
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
     * Lote padrão de negociação. Em geral, 100 nas opções sobre ações.
     */
    allocationRoundLot: number | null;

    /**
     * Código raiz do ativo objeto, sem o dígito da classe. Ex.: PETR.
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
     * Número de distribuição do ativo objeto.
     */
    distributionId: string | null;

    /**
     * Código de vencimento da apuração. Vem vazio nas opções sobre ações.
     */
    expirationCode: string | null;

    /**
     * Data de vencimento, no formato YYYY-MM-DD.
     */
    expirationDate: string;

    /**
     * Data do primeiro pregão da série, no formato YYYY-MM-DD.
     */
    firstTradeDate: string;

    /**
     * Preço a termo. Preenchido só em alguns segmentos.
     */
    forwardPrice: number | null;

    /**
     * Código ISIN da série de opção, não do ativo objeto.
     */
    isin: string | null;

    /**
     * Data do último pregão da série, no formato YYYY-MM-DD.
     */
    lastTradeDate: string;

    /**
     * Quantidade doadora em empréstimo de ativos.
     */
    lenderQuantity: number | null;

    /**
     * Mercado da opção: `equity` para ação ou ETF, `index` para índice, `currency`
     * para DOL e WDO.
     */
    market: 'equity' | 'index' | 'currency';

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
     * Data da apuração, no formato YYYY-MM-DD.
     */
    reportDate: string;

    /**
     * Contratos em aberto na apuração do pregão. Vem vazio nas opções sobre ações. Use
     * `openInterest`.
     */
    reportedOpenInterest: number | null;

    /**
     * Variação de contratos em aberto na apuração do pregão. Vem vazia nas opções
     * sobre ações. Use `openInterestChange`.
     */
    reportedOpenInterestChange: number | null;

    /**
     * Segmento da apuração. Ex.: EQUITY CALL.
     */
    segment: string;

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
     * Total de contratos em posição. É a origem de `openInterest` nas opções sobre
     * ações.
     */
    totalPositionQuantity: number | null;

    /**
     * Contratos em posição descoberta.
     */
    uncoveredQuantity: number | null;

    /**
     * Ativo subjacente da opção. Ex.: PETR4.
     */
    underlyingSymbol: string | null;
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
  export interface Option extends OptionsAPI.OptionSeries {
    positions: Array<Option.Position>;
  }

  export namespace Option {
    export interface Position {
      /**
       * Código raiz do ativo objeto, sem o dígito da classe. Ex.: PETR.
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
       * Número de distribuição do ativo objeto.
       */
      distributionId: string | null;

      /**
       * Código de vencimento da apuração. Vem vazio nas opções sobre ações.
       */
      expirationCode: string | null;

      /**
       * Preço a termo. Preenchido só em alguns segmentos.
       */
      forwardPrice: number | null;

      /**
       * Código ISIN da série de opção, não do ativo objeto.
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
       * Contratos em aberto na apuração do pregão. Vem vazio nas opções sobre ações. Use
       * `openInterest`.
       */
      reportedOpenInterest: number | null;

      /**
       * Variação de contratos em aberto na apuração do pregão. Vem vazia nas opções
       * sobre ações. Use `openInterestChange`.
       */
      reportedOpenInterestChange: number | null;

      /**
       * Segmento da apuração. Ex.: EQUITY CALL.
       */
      segment: string;

      /**
       * Total de contratos em posição. É a origem de `openInterest` nas opções sobre
       * ações.
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

export interface PositionHistoryParams {
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

export declare namespace Positions {
  export {
    type PositionRetrieveResponse as PositionRetrieveResponse,
    type PositionHistoryResponse as PositionHistoryResponse,
    type PositionRetrieveParams as PositionRetrieveParams,
    type PositionHistoryParams as PositionHistoryParams,
  };
}
