// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Inflation extends APIResource {
  /**
   * Obtenha dados históricos sobre índices de inflação para um país específico.
   *
   * ### Funcionalidades:
   *
   * - **Seleção de País:** Especifique o país desejado com o parâmetro `country`
   *   (padrão: `brazil`).
   * - **Filtragem por Período:** Defina um intervalo de datas com `start` e `end`
   *   (formato DD/MM/YYYY).
   * - **Inclusão de Histórico:** O parâmetro `historical` (booleano) parece
   *   controlar a inclusão de dados históricos (verificar comportamento exato, pode
   *   ser redundante com `start`/`end`).
   * - **Ordenação:** Ordene os resultados por data (`date`) ou valor (`value`)
   *   usando `sortBy` e `sortOrder`.
   *
   * ### Autenticação:
   *
   * Requer token de autenticação via `token` (query) ou `Authorization` (header).
   *
   * ### Exemplo de Requisição:
   *
   * **Buscar dados de inflação do Brasil para o ano de 2022, ordenados por valor
   * ascendente:**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/inflation?country=brazil&start=01/01/2022&end=31/12/2022&sortBy=value&sortOrder=asc&token=SEU_TOKEN"
   * ```
   *
   * **Buscar os dados mais recentes de inflação (sem período definido, ordenação
   * padrão):**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/inflation?country=brazil&token=SEU_TOKEN"
   * ```
   *
   * ### Resposta:
   *
   * A resposta contém um array `inflation`, onde cada objeto representa um ponto de
   * dado de inflação com sua `date` (DD/MM/YYYY), `value` (o índice de inflação como
   * string) e `epochDate` (timestamp UNIX).
   */
  retrieve(
    query: InflationRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InflationRetrieveResponse> {
    return this._client.get('/api/v2/inflation', { query, ...options });
  }

  /**
   * Obtenha a lista completa de todos os países para os quais a API Brapi possui
   * dados de inflação disponíveis para consulta no endpoint `/api/v2/inflation`.
   *
   * ### Funcionalidade:
   *
   * - Retorna um array `countries` com os nomes dos países (em minúsculas).
   * - Pode ser filtrado usando o parâmetro `search`.
   *
   * ### Autenticação:
   *
   * Requer token de autenticação via `token` (query) ou `Authorization` (header).
   *
   * ### Exemplo de Requisição:
   *
   * **Listar todos os países com dados de inflação:**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/inflation/available?token=SEU_TOKEN"
   * ```
   *
   * **Buscar países cujo nome contenha 'arg':**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/inflation/available?search=arg&token=SEU_TOKEN"
   * ```
   *
   * ### Resposta:
   *
   * A resposta é um objeto JSON com a chave `countries`, contendo um array de
   * strings com os nomes dos países (ex: `["brazil", "argentina", "usa"]`).
   */
  listAvailable(
    query: InflationListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InflationListAvailableResponse> {
    return this._client.get('/api/v2/inflation/available', { query, ...options });
  }
}

/**
 * Resposta principal do endpoint `/api/v2/inflation`.
 */
export interface InflationRetrieveResponse {
  /**
   * Array contendo os registros históricos de inflação para o país e período
   * solicitados.
   */
  inflation?: Array<InflationRetrieveResponse.Inflation>;
}

export namespace InflationRetrieveResponse {
  /**
   * Representa um ponto de dado histórico de inflação para um país.
   */
  export interface Inflation {
    /**
     * Data da medição da inflação, no formato `DD/MM/YYYY`.
     */
    date?: string;

    /**
     * Timestamp UNIX (número de segundos desde 1970-01-01 UTC) correspondente à
     * `date`.
     */
    epochDate?: number;

    /**
     * Valor do índice de inflação para a data especificada (formato string, pode
     * conter `%` ou ser apenas numérico).
     */
    value?: string;
  }
}

/**
 * Resposta do endpoint que lista os países com dados de inflação disponíveis.
 */
export interface InflationListAvailableResponse {
  /**
   * Lista de nomes de países (em minúsculas) para os quais há dados de inflação
   * disponíveis (ex: `brazil`, `usa`, `argentina`).
   */
  countries?: Array<string>;
}

export interface InflationRetrieveParams {
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
   * **Opcional.** Nome do país para o qual buscar os dados de inflação. Use nomes em
   * minúsculas. O padrão é `brazil`. Consulte `/api/v2/inflation/available` para a
   * lista de países suportados.
   */
  country?: string;

  /**
   * **Opcional.** Data final do período desejado para os dados históricos, no
   * formato `DD/MM/YYYY`. Requerido se `start` for especificado.
   */
  end?: string;

  /**
   * **Opcional.** Booleano (`true` ou `false`). Define se dados históricos devem ser
   * incluídos. O comportamento exato em conjunto com `start`/`end` deve ser
   * verificado. Padrão: `false`.
   */
  historical?: boolean;

  /**
   * **Opcional.** Campo pelo qual os resultados da inflação serão ordenados.
   */
  sortBy?: 'date' | 'value';

  /**
   * **Opcional.** Direção da ordenação: `asc` (ascendente) ou `desc` (descendente).
   * Padrão: `desc`. Requer que `sortBy` seja especificado.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * **Opcional.** Data de início do período desejado para os dados históricos, no
   * formato `DD/MM/YYYY`. Requerido se `end` for especificado.
   */
  start?: string;
}

export interface InflationListAvailableParams {
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
   * **Opcional.** Termo para filtrar a lista pelo nome do país (correspondência
   * parcial, case-insensitive). Se omitido, retorna todos os países.
   */
  search?: string;
}

export declare namespace Inflation {
  export {
    type InflationRetrieveResponse as InflationRetrieveResponse,
    type InflationListAvailableResponse as InflationListAvailableResponse,
    type InflationRetrieveParams as InflationRetrieveParams,
    type InflationListAvailableParams as InflationListAvailableParams,
  };
}
