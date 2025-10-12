// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Available extends APIResource {
  /**
   * Obtenha uma lista completa de todos os tickers (identificadores) de ativos
   * financeiros (ações, FIIs, BDRs, ETFs, índices) que a API Brapi tem dados
   * disponíveis para consulta no endpoint `/api/quote/{tickers}`.
   *
   * ### Funcionalidade:
   *
   * - Retorna arrays separados para `indexes` (índices) e `stocks` (outros ativos).
   * - Pode ser filtrado usando o parâmetro `search` para encontrar tickers
   *   específicos.
   *
   * ### Autenticação:
   *
   * Requer token de autenticação via `token` (query) ou `Authorization` (header).
   *
   * ### Exemplo de Requisição:
   *
   * **Listar todos os tickers disponíveis:**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/available?token=SEU_TOKEN"
   * ```
   *
   * **Buscar tickers que contenham 'BBDC':**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/available?search=BBDC&token=SEU_TOKEN"
   * ```
   *
   * ### Resposta:
   *
   * A resposta é um objeto JSON com duas chaves:
   *
   * - `indexes`: Array de strings contendo os tickers dos índices disponíveis (ex:
   *   `["^BVSP", "^IFIX"]`).
   * - `stocks`: Array de strings contendo os tickers das ações, FIIs, BDRs e ETFs
   *   disponíveis (ex: `["PETR4", "VALE3", "ITSA4", "MXRF11"]`).
   */
  list(
    query: AvailableListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AvailableListResponse> {
    return this._client.get('/api/available', { query, ...options });
  }
}

/**
 * Resposta do endpoint que lista todos os tickers disponíveis.
 */
export interface AvailableListResponse {
  /**
   * Lista de tickers de **índices** disponíveis (ex: `^BVSP`, `^IFIX`).
   */
  indexes: Array<string>;

  /**
   * Lista de tickers de **ações, FIIs, BDRs e ETFs** disponíveis (ex: `PETR4`,
   * `VALE3`, `MXRF11`).
   */
  stocks: Array<string>;
}

export interface AvailableListParams {
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
   * **Opcional.** Termo para filtrar a lista de tickers (correspondência parcial,
   * case-insensitive). Se omitido, retorna todos os tickers.
   */
  search?: string;
}

export declare namespace Available {
  export {
    type AvailableListResponse as AvailableListResponse,
    type AvailableListParams as AvailableListParams,
  };
}
