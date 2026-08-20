// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Obtenha cotações em tempo real e dados históricos de criptomoedas, disponíveis em diversas moedas de referência.
 */
export class Crypto extends APIResource {
  /**
   * Retorna cotações atualizadas de uma ou mais criptomoedas, com conversão para
   * diferentes moedas fiduciárias.
   *
   * ### Funcionalidades:
   *
   * - **Cotação Atual:** Preço, variação 24h, volume, market cap
   * - **Múltiplas Moedas:** Consulte várias criptos em uma requisição (separadas por
   *   vírgula)
   * - **Conversão de Moeda:** BRL (padrão), USD, EUR e outras
   * - **Dados Históricos:** OHLCV via parâmetros `range` e `interval`
   *
   * ### Autenticação:
   *
   * Bearer token ou query param `token`. Obtenha em brapi.dev/dashboard.
   *
   * ### Exemplos de Requisição:
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/crypto?coin=BTC&currency=BRL"
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/crypto?coin=BTC,ETH,SOL&currency=USD"
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/crypto?coin=BTC&currency=BRL&range=1mo&interval=1d"
   * ```
   *
   * ### Moedas de Conversão:
   *
   * BRL (Real), USD (Dólar), EUR (Euro), GBP (Libra) e outras
   *
   * ### Campos da Resposta:
   *
   * - `coin` - Símbolo da criptomoeda
   * - `coinName` - Nome completo
   * - `currency` - Moeda de cotação
   * - `regularMarketPrice` - Preço atual
   * - `regularMarketChange` - Variação em valor absoluto
   * - `regularMarketChangePercent` - Variação percentual (%)
   * - `regularMarketDayHigh` / `regularMarketDayLow` - Máxima/Mínima do dia
   * - `regularMarketVolume` - Volume negociado
   *
   * **Plano Mínimo:** Startup **Autenticação:** Necessária
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
   * Retorna a lista de criptomoedas disponíveis para consulta no endpoint
   * `/api/v2/crypto`.
   *
   * ### Criptomoedas Populares:
   *
   * - **BTC** - Bitcoin
   * - **ETH** - Ethereum
   * - **BNB** - Binance Coin
   * - **SOL** - Solana
   * - **ADA** - Cardano
   * - **XRP** - Ripple
   * - **DOGE** - Dogecoin
   * - **DOT** - Polkadot
   * - **MATIC** - Polygon
   * - **LTC** - Litecoin
   * - E centenas de outras...
   *
   * ### Uso:
   *
   * Use os símbolos retornados como valor do parâmetro `coin` no endpoint principal.
   *
   * ### Exemplos de Requisição:
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/crypto/available"
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/crypto/available?search=BTC"
   * ```
   *
   * **Plano Mínimo:** Startup **Autenticação:** Necessária
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
