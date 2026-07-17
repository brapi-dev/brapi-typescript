// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Monitore taxas de câmbio entre moedas fiduciárias de todo o mundo, com atualizações frequentes e dados históricos.
 */
export class Currency extends APIResource {
  /**
   * Retorna cotações atualizadas de pares de moedas, com preço de compra/venda,
   * variação e extremos do dia.
   *
   * ### Funcionalidades:
   *
   * - **Cotação Atual:** Preço de compra (bid), venda (ask), máxima, mínima,
   *   variação
   * - **Múltiplos Pares:** Consulte vários em uma requisição (separados por vírgula)
   * - **Formato:** `ORIGEM-DESTINO` (ex: `USD-BRL`)
   *
   * ### Autenticação:
   *
   * Bearer token ou query param `token`. Obtenha em brapi.dev/dashboard.
   *
   * ### Exemplos de Requisição:
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/currency?currency=USD-BRL"
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/currency?currency=USD-BRL,EUR-BRL,GBP-BRL"
   * ```
   *
   * ### Pares de Moedas Populares:
   *
   * - `USD-BRL` — Dólar Americano / Real
   * - `EUR-BRL` — Euro / Real
   * - `GBP-BRL` — Libra Esterlina / Real
   * - `EUR-USD` — Euro / Dólar
   *
   * ### Campos da Resposta:
   *
   * - `fromCurrency` / `toCurrency` — Par de moedas
   * - `name` — Nome do par
   * - `bidPrice` — Preço de compra
   * - `askPrice` — Preço de venda
   * - `high` / `low` — Máxima/Mínima do dia
   * - `bidVariation` — Variação do preço de compra
   * - `percentageChange` — Variação percentual (%)
   *
   * ### Fonte dos Dados:
   *
   * Banco Central do Brasil (PTAX)
   *
   * **Plano Mínimo:** Startup **Autenticação:** Necessária
   *
   * @example
   * ```ts
   * const currency = await client.v2.currency.retrieve();
   * ```
   */
  retrieve(
    query: CurrencyRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CurrencyRetrieveResponse> {
    return this._client.get('/api/v2/currency', { query, ...options });
  }

  /**
   * Retorna a lista de pares de moedas disponíveis para consulta no endpoint
   * `/api/v2/currency`.
   *
   * ### Formato:
   *
   * ORIGEM-DESTINO, onde ORIGEM é o código da moeda de origem e DESTINO a moeda de
   * destino
   *
   * ### Pares Disponíveis:
   *
   * - **Moedas Fiduciárias:** USD, EUR, GBP, JPY, CHF, CAD, AUD, DKK, NOK e SEK
   *   contra BRL
   * - **Cross Rates:** pares entre as moedas PTAX suportadas, como EUR-USD e GBP-USD
   *
   * ### Exemplos de Requisição:
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/currency/available"
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/v2/currency/available?search=USD"
   * ```
   *
   * **Plano Mínimo:** Startup **Autenticação:** Necessária
   *
   * @example
   * ```ts
   * const response = await client.v2.currency.listAvailable();
   * ```
   */
  listAvailable(
    query: CurrencyListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CurrencyListAvailableResponse> {
    return this._client.get('/api/v2/currency/available', { query, ...options });
  }
}

export interface CurrencyRetrieveResponse {
  currency: Array<CurrencyRetrieveResponse.Currency>;

  /**
   * Data e hora da requisição em formato ISO 8601
   */
  requestedAt: string;

  /**
   * Tempo de processamento em milissegundos
   */
  took: number;
}

export namespace CurrencyRetrieveResponse {
  export interface Currency {
    askPrice: string;

    bidPrice: string;

    bidVariation: string;

    fromCurrency: string;

    high: string;

    low: string;

    name: string;

    percentageChange: string;

    toCurrency: string;

    updatedAtDate: string;

    updatedAtTimestamp: string;
  }
}

export interface CurrencyListAvailableResponse {
  currencies: Array<CurrencyListAvailableResponse.Currency>;
}

export namespace CurrencyListAvailableResponse {
  export interface Currency {
    currency: string;

    name: string;
  }
}

export interface CurrencyRetrieveParams {
  /**
   * Par(es) de moedas separados por vírgula (ex: USD-BRL,EUR-BRL)
   */
  currency?: string;
}

export interface CurrencyListAvailableParams {
  /**
   * Filtrar pares de moedas por nome ou descrição
   */
  search?: string;
}

export declare namespace Currency {
  export {
    type CurrencyRetrieveResponse as CurrencyRetrieveResponse,
    type CurrencyListAvailableResponse as CurrencyListAvailableResponse,
    type CurrencyRetrieveParams as CurrencyRetrieveParams,
    type CurrencyListAvailableParams as CurrencyListAvailableParams,
  };
}
