// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Monitore taxas de câmbio entre moedas fiduciárias de todo o mundo, com atualizações frequentes e dados históricos.
 */
export class Currency extends APIResource {
  /**
   * Cotação atual de pares de moedas, com preço de compra, preço de venda, máxima,
   * mínima e variação do dia. Os pares cobertos pelo Banco Central usam a PTAX.
   *
   * Use para converter valores, mostrar o dólar do dia e atualizar planilhas.
   *
   * Informe os pares em `currency` no formato `ORIGEM-DESTINO`, como
   * `USD-BRL,EUR-BRL`. Os números vêm como texto.
   *
   * A diferença entre `bidPrice` e `askPrice` é o spread de referência. Bancos e
   * casas de câmbio cobram um spread maior.
   *
   * Veja os pares em [listar pares](https://brapi.dev/docs/moedas/available) e a
   * série diária em [histórico de câmbio](https://brapi.dev/docs/moedas/historico).
   * Planos Startup e Pro.
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
   * Lista os pares de moedas que a
   * [cotação de câmbio](https://brapi.dev/docs/moedas) aceita, no formato
   * `ORIGEM-DESTINO`, com o nome de cada par.
   *
   * Use para montar seletores de moeda e validar pares antes da chamada.
   *
   * Filtre com `search`. Planos Startup e Pro.
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
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
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
   * Pares no formato ORIGEM-DESTINO, separados por vírgula. Ex.: USD-BRL,EUR-BRL.
   */
  currency?: string;
}

export interface CurrencyListAvailableParams {
  /**
   * Texto buscado no par e no nome das moedas.
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
