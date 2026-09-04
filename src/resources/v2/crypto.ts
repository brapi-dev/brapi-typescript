// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Obtenha cotações em tempo real e dados históricos de criptomoedas, disponíveis em diversas moedas de referência.
 */
export class Crypto extends APIResource {
  /**
   * Cotação de uma ou mais criptomoedas, convertida para a moeda que você escolher.
   *
   * Cada moeda traz preço, variação de 24 horas, volume e market cap. O padrão é
   * `currency=BRL`, e você pode pedir `USD`, `EUR` e outras.
   *
   * Peça várias de uma vez em `coin=BTC,ETH,SOL`. Para série histórica, passe
   * `range` e `interval`.
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" \
   *   "https://brapi.dev/api/v2/crypto?coin=BTC,ETH&currency=BRL"
   * ```
   *
   * Cripto negocia 24 horas por dia. A variação de 24 horas é uma janela móvel, não
   * o fechamento de um pregão.
   *
   * @example
   * ```ts
   * const crypto = await client.v2.crypto.retrieve();
   * ```
   */
  retrieve(
    query: CryptoRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CryptoRetrieveResponse> {
    return this._client.get('/api/v2/crypto', { query, ...options });
  }

  /**
   * As criptomoedas que `/api/v2/crypto` aceita, com centenas de símbolos.
   *
   * Use `search` para filtrar. O valor do campo `coin` de cada item é o que você
   * passa no parâmetro `coin` do endpoint principal.
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" \
   *   "https://brapi.dev/api/v2/crypto/available?search=BTC"
   * ```
   *
   * @example
   * ```ts
   * const response = await client.v2.crypto.listAvailable();
   * ```
   */
  listAvailable(
    query: CryptoListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CryptoListAvailableResponse> {
    return this._client.get('/api/v2/crypto/available', { query, ...options });
  }
}

export interface CryptoRetrieveResponse {
  coins: Array<CryptoRetrieveResponse.Coin>;

  /**
   * Data e hora da requisição em formato ISO 8601
   */
  requestedAt: string;

  /**
   * Tempo de processamento em milissegundos
   */
  took: number;
}

export namespace CryptoRetrieveResponse {
  export interface Coin {
    coin: string;

    coinName: string;

    currency: string;

    currencyRateFromUSD: number;

    marketCap: number;

    regularMarketChange: number;

    regularMarketChangePercent: number;

    regularMarketDayHigh: number;

    regularMarketDayLow: number;

    regularMarketDayRange: string;

    regularMarketPrice: number;

    regularMarketTime: string;

    regularMarketVolume: number;

    coinImageUrl?: string;

    historicalDataPrice?: Array<Coin.HistoricalDataPrice>;

    usedInterval?: string;

    usedRange?: string;

    validIntervals?: Array<string>;

    validRanges?: Array<string>;
  }

  export namespace Coin {
    export interface HistoricalDataPrice {
      adjustedClose: number | null;

      close: number | null;

      date: number;

      high: number | null;

      low: number | null;

      open: number | null;

      volume: number | null;
    }
  }
}

export interface CryptoListAvailableResponse {
  coins: Array<string>;
}

export interface CryptoRetrieveParams {
  /**
   * Sigla(s) das criptomoedas separadas por vírgula
   */
  coin?: string;

  /**
   * Moeda para cotação (padrão: BRL)
   */
  currency?: string;

  /**
   * Intervalo dos dados históricos
   */
  interval?: string;

  /**
   * Período para dados históricos
   */
  range?: string;
}

export interface CryptoListAvailableParams {
  /**
   * Filtrar criptomoedas por símbolo
   */
  search?: string;
}

export declare namespace Crypto {
  export {
    type CryptoRetrieveResponse as CryptoRetrieveResponse,
    type CryptoListAvailableResponse as CryptoListAvailableResponse,
    type CryptoRetrieveParams as CryptoRetrieveParams,
    type CryptoListAvailableParams as CryptoListAvailableParams,
  };
}
