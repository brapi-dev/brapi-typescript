// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Ferramentas auxiliares para descobrir ativos disponíveis e verificar a saúde da API.
 */
export class Dictionary extends APIResource {
  /**
   * Lista os campos da API com nome em português, descrição, fórmula de cálculo,
   * tipo, unidade, categoria e os endpoints onde cada campo aparece.
   *
   * Use para gerar rótulos e tooltips, formatar valores pela unidade e entender um
   * campo antes de usar.
   *
   * `category` filtra por área, como `fii`, `treasury` ou `balance-sheet`. `search`
   * busca em chave, nome, descrição, categoria e endpoints. Os dois funcionam
   * juntos. Endpoint público, sem token.
   *
   * @example
   * ```ts
   * const dictionary = await client.v2.dictionary.retrieve();
   * ```
   */
  retrieve(
    query: DictionaryRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DictionaryRetrieveResponse> {
    return this._client.get('/api/v2/dictionary', { query, ...options });
  }
}

export interface DictionaryRetrieveResponse {
  fields: Array<DictionaryRetrieveResponse.Field>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace DictionaryRetrieveResponse {
  export interface Field {
    calculation: string | null;

    category: string;

    description: string;

    endpoints: Array<string>;

    key: string;

    label: string;

    type: 'number' | 'string' | 'boolean' | 'date' | 'object' | 'array';

    unit: string | null;
  }
}

export interface DictionaryRetrieveParams {
  /**
   * Categoria exata do campo. Ex.: fii, treasury, quote, balance-sheet.
   */
  category?: string;

  /**
   * Texto buscado em key, label, description, category e endpoints. Ignora
   * maiúsculas.
   */
  search?: string;
}

export declare namespace Dictionary {
  export {
    type DictionaryRetrieveResponse as DictionaryRetrieveResponse,
    type DictionaryRetrieveParams as DictionaryRetrieveParams,
  };
}
