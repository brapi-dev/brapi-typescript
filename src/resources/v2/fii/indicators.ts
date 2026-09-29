// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Acesse dados completos de FIIs: cotações, indicadores fundamentalistas (P/VP, DY), relatórios gerenciais e histórico de proventos.
 */
export class Indicators extends APIResource {
  /**
   * Indicadores mais recentes de um ou mais FIIs: preço, valor patrimonial por cota,
   * P/VP, dividend yield de 1 e 12 meses, retorno mensal, cotistas, cotas emitidas,
   * patrimônio líquido, ativo total, segmento e dados do administrador.
   *
   * Use para comparar FIIs, mostrar o P/VP e o yield de uma cota, ou montar a ficha
   * de um fundo.
   *
   * `priceToNav` abaixo de 1 indica que a cota negocia abaixo do valor patrimonial.
   *
   * Para a série mensal, use o
   * [histórico de indicadores](https://brapi.dev/docs/fiis/indicadores-historico).
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const indicator = await client.v2.fii.indicators.retrieve({
   *   symbols: 'HGLG11,MXRF11',
   * });
   * ```
   */
  retrieve(query: IndicatorRetrieveParams, options?: RequestOptions): APIPromise<IndicatorRetrieveResponse> {
    return this._client.get('/api/v2/fii/indicators', { query, ...options });
  }

  /**
   * Série mensal dos [indicadores de FIIs](https://brapi.dev/docs/fiis/indicadores):
   * um ponto por mês, com `referenceDate` no último dia do mês. O histórico começa
   * em setembro de 2016.
   *
   * Use para gráficos de P/VP e dividend yield, e para comparar um fundo com o
   * próprio passado.
   *
   * Sem `startDate` e `endDate`, retorna os últimos 12 meses. `sortBy` aceita
   * `referenceDate` (padrão), `symbol`, `price`, `navPerShare`, `priceToNav`,
   * `dividendYield12m`, `dividendYield1m`, `monthlyReturn` e `totalInvestors`.
   *
   * Plano Pro. Sem token, aceita só `symbols` com MXRF11 e HGLG11.
   *
   * @example
   * ```ts
   * const response = await client.v2.fii.indicators.history({
   *   symbols: 'HGLG11,MXRF11',
   * });
   * ```
   */
  history(query: IndicatorHistoryParams, options?: RequestOptions): APIPromise<IndicatorHistoryResponse> {
    return this._client.get('/api/v2/fii/indicators/history', { query, ...options });
  }
}

export interface IndicatorRetrieveResponse {
  fiis: Array<IndicatorRetrieveResponse.Fii>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace IndicatorRetrieveResponse {
  export interface Fii {
    administratorAddress: string | null;

    administratorAddressComplement: string | null;

    administratorAddressNumber: string | null;

    administratorCity: string | null;

    administratorCnpj: string | null;

    administratorDistrict: string | null;

    administratorEmail: string | null;

    administratorName: string | null;

    administratorPhone1: string | null;

    administratorPhone2: string | null;

    administratorPhone3: string | null;

    administratorState: string | null;

    administratorWebsite: string | null;

    administratorZipCode: string | null;

    asOfDate: string | null;

    cnpj: string | null;

    dividendYield12m: number | null;

    dividendYield1m: number | null;

    equity: number | null;

    mandate: string | null;

    monthlyReturn: number | null;

    name: string | null;

    navPerShare: number | null;

    price: number | null;

    priceToNav: number | null;

    segmentoAtuacao: string | null;

    segmentType: string | null;

    sharesOutstanding: number | null;

    symbol: string;

    tipoGestao: string | null;

    totalAssets: number | null;

    totalInvestors: number | null;
  }
}

export interface IndicatorHistoryResponse {
  history: Array<IndicatorHistoryResponse.History>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace IndicatorHistoryResponse {
  export interface History {
    dividendYield12m: number | null;

    dividendYield1m: number | null;

    equity: number | null;

    monthlyReturn: number | null;

    navPerShare: number | null;

    price: number | null;

    priceToNav: number | null;

    referenceDate: string;

    segmentType: string | null;

    sharesOutstanding: number | null;

    symbol: string;

    totalAssets: number | null;

    totalInvestors: number | null;
  }
}

export interface IndicatorRetrieveParams {
  /**
   * Tickers de FIIs separados por vírgula, até 20. Ex.: HGLG11,MXRF11.
   */
  symbols: string;
}

export interface IndicatorHistoryParams {
  /**
   * Tickers de FIIs separados por vírgula, até 20. Ex.: HGLG11,MXRF11.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Campo de ordenação.
   */
  sortBy?: string;

  /**
   * Direção da ordenação.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD.
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
