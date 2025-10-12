// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class PrimeRate extends APIResource {
  /**
   * Obtenha informações atualizadas sobre a taxa básica de juros (SELIC) de um país
   * por um período determinado.
   *
   * ### Funcionalidades:
   *
   * - **Seleção por País:** Especifique o país desejado usando o parâmetro `country`
   *   (padrão: brazil).
   * - **Período Customizado:** Defina datas de início e fim com `start` e `end` para
   *   consultar um intervalo específico.
   * - **Ordenação:** Ordene os resultados por data ou valor com os parâmetros
   *   `sortBy` e `sortOrder`.
   * - **Dados Históricos:** Solicite o histórico completo ou apenas o valor mais
   *   recente com o parâmetro `historical`.
   *
   * ### Autenticação:
   *
   * Requer token de autenticação via `token` (query) ou `Authorization` (header).
   *
   * ### Exemplo de Requisição:
   *
   * **Taxa de juros do Brasil entre dezembro/2021 e janeiro/2022:**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/prime-rate?country=brazil&start=01/12/2021&end=01/01/2022&sortBy=date&sortOrder=desc&token=SEU_TOKEN"
   * ```
   */
  retrieve(
    query: PrimeRateRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PrimeRateRetrieveResponse> {
    return this._client.get('/api/v2/prime-rate', { query, ...options });
  }

  /**
   * Liste todos os países disponíveis com dados de taxa básica de juros (SELIC) na
   * API brapi. Este endpoint facilita a descoberta de quais países possuem dados
   * disponíveis para consulta através do endpoint principal `/api/v2/prime-rate`.
   *
   * ### Funcionalidades:
   *
   * - **Busca Filtrada:** Utilize o parâmetro `search` para filtrar países por nome
   *   ou parte do nome.
   * - **Ideal para Autocomplete:** Perfeito para implementar campos de busca com
   *   autocompletar em interfaces de usuário.
   *
   * ### Autenticação:
   *
   * Requer token de autenticação via `token` (query) ou `Authorization` (header).
   *
   * ### Exemplo de Requisição:
   *
   * **Listar países que contenham "BR" no nome:**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/prime-rate/available?search=BR&token=SEU_TOKEN"
   * ```
   */
  listAvailable(
    query: PrimeRateListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PrimeRateListAvailableResponse> {
    return this._client.get('/api/v2/prime-rate/available', { query, ...options });
  }
}

/**
 * Resposta principal do endpoint `/api/v2/prime-rate`.
 */
export interface PrimeRateRetrieveResponse {
  /**
   * Array contendo os registros históricos de taxa básica de juros (SELIC) para o
   * país e período solicitados.
   */
  'prime-rate'?: Array<PrimeRateRetrieveResponse.PrimeRate>;
}

export namespace PrimeRateRetrieveResponse {
  /**
   * Representa um registro individual de taxa básica de juros (SELIC) para uma data
   * específica.
   */
  export interface PrimeRate {
    /**
     * Data do registro no formato DD/MM/YYYY.
     */
    date?: string;

    /**
     * Timestamp em milissegundos (formato epoch) correspondente à data do registro.
     */
    epochDate?: number;

    /**
     * Valor da taxa básica de juros (SELIC) para a data correspondente.
     */
    value?: string;
  }
}

/**
 * Resposta do endpoint `/api/v2/prime-rate/available` que lista os países
 * disponíveis para consulta de taxa básica de juros (SELIC).
 */
export interface PrimeRateListAvailableResponse {
  /**
   * Lista de países com dados de taxa básica de juros (SELIC) disponíveis para
   * consulta.
   */
  countries?: Array<string>;
}

export interface PrimeRateRetrieveParams {
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
   * **Opcional.** O país do qual você deseja obter informações sobre a taxa básica
   * de juros. Por padrão, o país é definido como brazil. Você pode consultar a lista
   * de países disponíveis através do endpoint `/api/v2/prime-rate/available`.
   */
  country?: string;

  /**
   * **Opcional.** Data final do período para busca no formato DD/MM/YYYY. Por padrão
   * é a data atual. Útil quando `historical=true` para restringir o período da série
   * histórica.
   */
  end?: string;

  /**
   * **Opcional.** Define se os dados históricos serão retornados. Se definido como
   * `true`, retorna a série histórica completa. Se `false` (padrão) ou omitido,
   * retorna apenas o valor mais recente.
   */
  historical?: boolean;

  /**
   * **Opcional.** Campo pelo qual os resultados serão ordenados. Por padrão, ordena
   * por `date` (data).
   */
  sortBy?: 'date' | 'value';

  /**
   * **Opcional.** Define se a ordenação será crescente (`asc`) ou decrescente
   * (`desc`). Por padrão, é `desc` (decrescente).
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * **Opcional.** Data inicial do período para busca no formato DD/MM/YYYY. Útil
   * quando `historical=true` para restringir o período da série histórica.
   */
  start?: string;
}

export interface PrimeRateListAvailableParams {
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
   * **Opcional.** Termo para filtrar a lista de países por nome. Retorna países
   * cujos nomes contenham o termo especificado (case insensitive).
   */
  search?: string;
}

export declare namespace PrimeRate {
  export {
    type PrimeRateRetrieveResponse as PrimeRateRetrieveResponse,
    type PrimeRateListAvailableResponse as PrimeRateListAvailableResponse,
    type PrimeRateRetrieveParams as PrimeRateRetrieveParams,
    type PrimeRateListAvailableParams as PrimeRateListAvailableParams,
  };
}
