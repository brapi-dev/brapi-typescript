// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Obtenha cotações em tempo real e dados históricos de criptomoedas, disponíveis em diversas moedas de referência.
 */
export class Crypto extends APIResource {
  /**
   * Cotação de uma ou mais criptomoedas, com preço, variação, máxima, mínima e
   * volume de 24 horas. O preço vem na moeda de `currency`, com BRL como padrão.
   *
   * Use para mostrar preços de cripto, montar carteiras e gerar gráficos.
   *
   * Peça várias moedas em `coin`, como `coin=BTC,ETH,SOL`. Para o histórico, passe
   * `range` ou `interval`, como `range=1mo&interval=1d`. A resposta traz os pontos
   * em `historicalDataPrice` e o período aplicado em `usedRange` e `usedInterval`.
   * Intervalos curtos limitam o período.
   *
   * Cripto negocia 24 horas por dia. A variação é uma janela móvel de 24 horas.
   * `marketCap` vem sempre como 0.
   *
   * Veja as siglas em
   * [listar criptomoedas](https://brapi.dev/docs/criptomoedas/available). Planos
   * Startup e Pro. Os períodos e intervalos aceitos dependem do plano.
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
   * Lista as siglas de criptomoedas que a
   * [cotação de criptomoedas](https://brapi.dev/docs/criptomoedas) aceita.
   *
   * Use para montar seletores e validar siglas antes da chamada.
   *
   * `coins` é uma lista de siglas. Passe cada sigla no parâmetro `coin` da cotação.
   * Filtre com `search`. Planos Startup e Pro.
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
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
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
   * Siglas das criptomoedas, separadas por vírgula. Ex.: BTC,ETH.
   */
  coin?: string;

  /**
   * Moeda da cotação, como BRL, USD ou EUR. Padrão: BRL.
   */
  currency?: string;

  /**
   * Intervalo entre os pontos do histórico, como 1h ou 1d. Padrão: 1d.
   */
  interval?: string;

  /**
   * Período do histórico, como 5d, 1mo ou 1y. Padrão: 1mo quando há histórico.
   */
  range?: string;
}

export interface CryptoListAvailableParams {
  /**
   * Texto buscado na sigla da criptomoeda.
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
