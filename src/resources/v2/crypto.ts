// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Crypto extends APIResource {
  /**
   * Obtenha cotações atualizadas e dados históricos para uma ou mais criptomoedas.
   *
   * ### Funcionalidades:
   *
   * - **Cotação Múltipla:** Consulte várias criptomoedas em uma única requisição
   *   usando o parâmetro `coin`.
   * - **Moeda de Referência:** Especifique a moeda fiduciária para a cotação com
   *   `currency` (padrão: BRL).
   * - **Dados Históricos:** Solicite séries históricas usando `range` e `interval`
   *   (similar ao endpoint de ações).
   *
   * ### Autenticação:
   *
   * Requer token de autenticação via `token` (query) ou `Authorization` (header).
   *
   * ### Exemplo de Requisição:
   *
   * **Cotação de Bitcoin (BTC) e Ethereum (ETH) em Dólar Americano (USD):**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/crypto?coin=BTC,ETH&currency=USD&token=SEU_TOKEN"
   * ```
   *
   * **Cotação de Cardano (ADA) em Real (BRL) com histórico do último mês (intervalo
   * diário):**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/crypto?coin=ADA&currency=BRL&range=1mo&interval=1d&token=SEU_TOKEN"
   * ```
   *
   * ### Resposta:
   *
   * A resposta contém um array `coins`, onde cada objeto representa uma criptomoeda
   * solicitada, incluindo sua cotação atual, dados de mercado e, opcionalmente, a
   * série histórica (`historicalDataPrice`).
   */
  retrieve(query: CryptoRetrieveParams, options?: RequestOptions): APIPromise<CryptoRetrieveResponse> {
    return this._client.get('/api/v2/crypto', { query, ...options });
  }

  /**
   * Obtenha a lista completa de todas as siglas (tickers) de criptomoedas que a API
   * Brapi suporta para consulta no endpoint `/api/v2/crypto`.
   *
   * ### Funcionalidade:
   *
   * - Retorna um array `coins` com as siglas.
   * - Pode ser filtrado usando o parâmetro `search`.
   *
   * ### Autenticação:
   *
   * Requer token de autenticação via `token` (query) ou `Authorization` (header).
   *
   * ### Exemplo de Requisição:
   *
   * **Listar todas as criptomoedas disponíveis:**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/crypto/available?token=SEU_TOKEN"
   * ```
   *
   * **Buscar criptomoedas cujo ticker contenha 'DOGE':**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/crypto/available?search=DOGE&token=SEU_TOKEN"
   * ```
   *
   * ### Resposta:
   *
   * A resposta é um objeto JSON com a chave `coins`, contendo um array de strings
   * com as siglas das criptomoedas (ex: `["BTC", "ETH", "LTC", "XRP"]`).
   */
  listAvailable(
    query: CryptoListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CryptoListAvailableResponse> {
    return this._client.get('/api/v2/crypto/available', { query, ...options });
  }
}

/**
 * Resposta principal do endpoint `/api/v2/crypto`.
 */
export interface CryptoRetrieveResponse {
  /**
   * Array contendo os resultados detalhados para cada criptomoeda solicitada.
   */
  coins?: Array<CryptoRetrieveResponse.Coin>;
}

export namespace CryptoRetrieveResponse {
  /**
   * Contém os dados detalhados de uma criptomoeda específica retornada pelo endpoint
   * `/api/v2/crypto`.
   */
  export interface Coin {
    /**
     * Sigla (ticker) da criptomoeda (ex: `BTC`, `ETH`).
     */
    coin?: string;

    /**
     * URL da imagem do logo da criptomoeda.
     */
    coinImageUrl?: string;

    /**
     * Nome completo da criptomoeda (ex: `Bitcoin`, `Ethereum`).
     */
    coinName?: string;

    /**
     * Sigla da moeda fiduciária na qual os preços estão cotados (ex: `BRL`, `USD`).
     */
    currency?: string;

    /**
     * Taxa de câmbio da `currency` em relação ao USD (Dólar Americano).
     * `1 USD = X currency`.
     */
    currencyRateFromUSD?: number;

    /**
     * Array contendo a série histórica de preços, retornado se `range` ou `interval`
     * forem especificados.
     */
    historicalDataPrice?: Array<Coin.HistoricalDataPrice> | null;

    /**
     * Capitalização de mercado da criptomoeda na `currency` especificada.
     */
    marketCap?: number;

    /**
     * Variação absoluta do preço nas últimas 24 horas (ou período relevante).
     */
    regularMarketChange?: number;

    /**
     * Variação percentual do preço nas últimas 24 horas (ou período relevante).
     */
    regularMarketChangePercent?: number;

    /**
     * Preço máximo nas últimas 24 horas (ou período relevante).
     */
    regularMarketDayHigh?: number;

    /**
     * Preço mínimo nas últimas 24 horas (ou período relevante).
     */
    regularMarketDayLow?: number;

    /**
     * String formatada mostrando o intervalo de preço das últimas 24h (Mínimo -
     * Máximo).
     */
    regularMarketDayRange?: string;

    /**
     * Preço atual da criptomoeda na `currency` especificada.
     */
    regularMarketPrice?: number;

    /**
     * Timestamp da última atualização da cotação. Formato ISO 8601.
     */
    regularMarketTime?: string;

    /**
     * Volume negociado nas últimas 24 horas (na `currency` especificada).
     */
    regularMarketVolume?: number;

    /**
     * O intervalo (`interval`) efetivamente utilizado para os dados históricos, se
     * solicitado.
     */
    usedInterval?: string | null;

    /**
     * O período (`range`) efetivamente utilizado para os dados históricos, se
     * solicitado.
     */
    usedRange?: string | null;

    /**
     * Lista dos valores válidos para o parâmetro `interval` nesta criptomoeda.
     */
    validIntervals?: Array<string>;

    /**
     * Lista dos valores válidos para o parâmetro `range` nesta criptomoeda.
     */
    validRanges?: Array<string>;
  }

  export namespace Coin {
    /**
     * Representa um ponto na série histórica de preços de uma criptomoeda.
     */
    export interface HistoricalDataPrice {
      /**
       * Preço de fechamento ajustado (geralmente igual ao `close` para cripto).
       */
      adjustedClose?: number;

      /**
       * Preço de fechamento da criptomoeda no intervalo.
       */
      close?: number;

      /**
       * Data do ponto de dados, representada como um timestamp UNIX.
       */
      date?: number;

      /**
       * Preço máximo atingido no intervalo.
       */
      high?: number;

      /**
       * Preço mínimo atingido no intervalo.
       */
      low?: number;

      /**
       * Preço de abertura da criptomoeda no intervalo.
       */
      open?: number;

      /**
       * Volume negociado no intervalo (na criptomoeda ou na moeda de referência,
       * verificar contexto).
       */
      volume?: number;
    }
  }
}

/**
 * Resposta do endpoint que lista todas as criptomoedas disponíveis.
 */
export interface CryptoListAvailableResponse {
  /**
   * Lista de siglas (tickers) das criptomoedas disponíveis (ex: `BTC`, `ETH`,
   * `LTC`).
   */
  coins?: Array<string>;
}

export interface CryptoRetrieveParams {
  /**
   * **Obrigatório.** Uma ou mais siglas (tickers) de criptomoedas que você deseja
   * consultar. Separe múltiplas siglas por vírgula (`,`).
   *
   * - **Exemplos:** `BTC`, `ETH,ADA`, `SOL`.
   */
  coin: string;

  /**
   * **Obrigatório caso não esteja adicionado como header "Authorization".** Seu
   * token de autenticação pessoal da API Brapi.
   *
   * **Formas de Envio:**
   *
   * 1.  **Query Parameter:** Adicione `?token=SEU_TOKEN` ao final da URL.
   * 2.  **HTTP Header:** Inclua o header `Authorization: Bearer SEU_TOKEN` na sua
   *     requisição.
   *
   * Ambos os métodos são aceitos, mas pelo menos um deles deve ser utilizado.
   * Obtenha seu token em [brapi.dev/dashboard](https://brapi.dev/dashboard).
   */
  token?: string;

  /**
   * **Opcional.** A sigla da moeda fiduciária na qual a cotação da(s) criptomoeda(s)
   * deve ser retornada. Se omitido, o padrão é `BRL` (Real Brasileiro).
   */
  currency?: string;

  /**
   * **Opcional.** Define a granularidade (intervalo) dos dados históricos de preço
   * (`historicalDataPrice`). Requer que `range` também seja especificado. Funciona
   * de forma análoga ao endpoint de ações.
   *
   * - Valores: `1m`, `2m`, `5m`, `15m`, `30m`, `60m`, `90m`, `1h`, `1d`, `5d`,
   *   `1wk`, `1mo`, `3mo`.
   */
  interval?: '1m' | '2m' | '5m' | '15m' | '30m' | '60m' | '90m' | '1h' | '1d' | '5d' | '1wk' | '1mo' | '3mo';

  /**
   * **Opcional.** Define o período para os dados históricos de preço
   * (`historicalDataPrice`). Funciona de forma análoga ao endpoint de ações. Se
   * omitido, apenas a cotação mais recente é retornada (a menos que `interval` seja
   * usado).
   *
   * - Valores: `1d`, `5d`, `1mo`, `3mo`, `6mo`, `1y`, `2y`, `5y`, `10y`, `ytd`,
   *   `max`.
   */
  range?: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max';
}

export interface CryptoListAvailableParams {
  /**
   * **Obrigatório caso não esteja adicionado como header "Authorization".** Seu
   * token de autenticação pessoal da API Brapi.
   *
   * **Formas de Envio:**
   *
   * 1.  **Query Parameter:** Adicione `?token=SEU_TOKEN` ao final da URL.
   * 2.  **HTTP Header:** Inclua o header `Authorization: Bearer SEU_TOKEN` na sua
   *     requisição.
   *
   * Ambos os métodos são aceitos, mas pelo menos um deles deve ser utilizado.
   * Obtenha seu token em [brapi.dev/dashboard](https://brapi.dev/dashboard).
   */
  token?: string;

  /**
   * **Opcional.** Termo para filtrar a lista de siglas de criptomoedas
   * (correspondência parcial, case-insensitive). Se omitido, retorna todas as
   * siglas.
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
