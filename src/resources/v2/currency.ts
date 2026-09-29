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
   * Série diária de câmbio pela PTAX de fechamento do Banco Central. Cobre USD, EUR,
   * GBP, JPY, CHF, CAD, AUD, DKK, NOK e SEK contra o real e entre si.
   *
   * Use para backtests, conversão de valores em datas passadas e gráficos de câmbio.
   *
   * Há três tipos de par:
   *
   * - Direto, como `USD-BRL`: planos Startup e Pro.
   * - Inverso, como `BRL-USD`: calculado como `1 / USD-BRL`. Só no plano Pro.
   * - Cruzado, como `EUR-USD`: calculado como `EUR-BRL / USD-BRL` nas datas em que
   *   as duas séries têm valor. Só no plano Pro.
   *
   * Peça até 20 pares por chamada. Sem datas, a janela é dos últimos 12 meses. A
   * PTAX sai uma vez por dia útil, então não há pontos em fins de semana e feriados.
   *
   * Um par não aceito ou fora do plano gera um item em `errors` e não derruba os
   * outros pares. Para cripto, use a
   * [cotação de criptomoedas](https://brapi.dev/docs/criptomoedas).
   *
   * @example
   * ```ts
   * const response = await client.v2.currency.historical({
   *   currency: 'USD-BRL,EUR-BRL',
   * });
   * ```
   */
  historical(
    query: CurrencyHistoricalParams,
    options?: RequestOptions,
  ): APIPromise<CurrencyHistoricalResponse> {
    return this._client.get('/api/v2/currency/historical', { query, ...options });
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

export interface CurrencyHistoricalResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<CurrencyHistoricalResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  errors?: Array<CurrencyHistoricalResponse.Error>;
}

export namespace CurrencyHistoricalResponse {
  export interface Result {
    fromCurrency: string;

    observations: Array<Result.Observation>;

    pair: string;

    toCurrency: string;
  }

  export namespace Result {
    export interface Observation {
      date: string;

      value: number;
    }
  }

  export interface Error {
    code: string;

    message: string;

    pair: string;

    details?: { [key: string]: unknown };
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

export interface CurrencyHistoricalParams {
  /**
   * Pares no formato ORIGEM-DESTINO, separados por vírgula, até 20. Ex.:
   * USD-BRL,EUR-BRL.
   */
  currency: string;

  /**
   * Data final no formato YYYY-MM-DD. Padrão: hoje.
   */
  endDate?: string;

  /**
   * Máximo de pontos por par. Padrão: 365.
   */
  limit?: number;

  /**
   * Ordem por data. Padrão: desc.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD. Padrão: 12 meses atrás.
   */
  startDate?: string;
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
    type CurrencyHistoricalResponse as CurrencyHistoricalResponse,
    type CurrencyListAvailableResponse as CurrencyListAvailableResponse,
    type CurrencyRetrieveParams as CurrencyRetrieveParams,
    type CurrencyHistoricalParams as CurrencyHistoricalParams,
    type CurrencyListAvailableParams as CurrencyListAvailableParams,
  };
}
