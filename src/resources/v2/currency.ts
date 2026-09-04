// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Monitore taxas de câmbio entre moedas fiduciárias de todo o mundo, com atualizações frequentes e dados históricos.
 */
export class Currency extends APIResource {
  /**
   * Cotação de pares de moedas, no formato `ORIGEM-DESTINO`, como `USD-BRL`.
   *
   * Cada par traz preço de compra (`bid`), de venda (`ask`), máxima, mínima e
   * variação do dia.
   *
   * Peça vários pares na mesma chamada em `currency=USD-BRL,EUR-BRL,GBP-BRL`.
   *
   * A diferença entre `bid` e `ask` é o spread. Casas de câmbio e bancos cobram
   * spread bem maior que esse, então não use o número como preço de balcão.
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
   * Os pares que `/api/v2/currency` aceita, no formato `ORIGEM-DESTINO`.
   *
   * A cobertura inclui USD, EUR, GBP, JPY, CHF, CAD, AUD, DKK, NOK e SEK contra o
   * real, mais os cruzamentos entre as moedas PTAX, como `EUR-USD` e `GBP-USD`.
   *
   * Filtre com `search`.
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
