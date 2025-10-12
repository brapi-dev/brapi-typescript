// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Currency extends APIResource {
  /**
   * Obtenha cotações atualizadas para um ou mais pares de moedas fiduciárias (ex:
   * USD-BRL, EUR-USD).
   *
   * ### Funcionalidades:
   *
   * - **Cotação Múltipla:** Consulte vários pares de moedas em uma única requisição
   *   usando o parâmetro `currency`.
   * - **Dados Retornados:** Inclui nome do par, preços de compra (bid) e venda
   *   (ask), variação, máximas e mínimas, e timestamp da atualização.
   *
   * ### Parâmetros:
   *
   * - **`currency` (Obrigatório):** Uma lista de pares de moedas separados por
   *   vírgula, no formato `MOEDA_ORIGEM-MOEDA_DESTINO` (ex: `USD-BRL`, `EUR-USD`).
   *   Consulte os pares disponíveis em
   *   [`/api/v2/currency/available`](#/Moedas/getAvailableCurrencies).
   * - **`token` (Obrigatório):** Seu token de autenticação.
   *
   * ### Autenticação:
   *
   * Requer token de autenticação válido via `token` (query) ou `Authorization`
   * (header).
   */
  retrieve(query: CurrencyRetrieveParams, options?: RequestOptions): APIPromise<CurrencyRetrieveResponse> {
    return this._client.get('/api/v2/currency', { query, ...options });
  }

  /**
   * Obtenha a lista completa de todas as moedas fiduciárias suportadas pela API,
   * geralmente utilizadas no parâmetro `currency` de outros endpoints (como o de
   * criptomoedas) ou para futuras funcionalidades de conversão.
   *
   * ### Funcionalidade:
   *
   * - Retorna um array `currencies` com os nomes das moedas.
   * - Pode ser filtrado usando o parâmetro `search`.
   *
   * ### Autenticação:
   *
   * Requer token de autenticação via `token` (query) ou `Authorization` (header).
   *
   * ### Exemplo de Requisição:
   *
   * **Listar todas as moedas disponíveis:**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/currency/available?token=SEU_TOKEN"
   * ```
   *
   * **Buscar moedas cujo nome contenha 'Euro':**
   *
   * ```bash
   * curl -X GET "https://brapi.dev/api/v2/currency/available?search=Euro&token=SEU_TOKEN"
   * ```
   *
   * ### Resposta:
   *
   * A resposta é um objeto JSON com a chave `currencies`, contendo um array de
   * objetos. Cada objeto possui uma chave `currency` com o nome completo da moeda
   * (ex: `"Dólar Americano/Real Brasileiro"`). **Nota:** O formato do nome pode
   * indicar um par de moedas, dependendo do contexto interno da API.
   */
  listAvailable(
    query: CurrencyListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CurrencyListAvailableResponse> {
    return this._client.get('/api/v2/currency/available', { query, ...options });
  }
}

/**
 * Estrutura da **resposta principal** do endpoint `GET /api/v2/currency`.
 */
export interface CurrencyRetrieveResponse {
  /**
   * Array contendo os objetos `CurrencyQuote`, um para cada par de moeda válido
   * solicitado no parâmetro `currency`.
   */
  currency: Array<CurrencyRetrieveResponse.Currency>;
}

export namespace CurrencyRetrieveResponse {
  /**
   * Contém os dados detalhados da cotação de um **par de moedas fiduciárias
   * específico**, retornado como um elemento do array `currency` no endpoint
   * `/api/v2/currency`.
   */
  export interface Currency {
    /**
     * **Preço de Venda (Ask):** Preço atual pelo qual o mercado está disposto a vender
     * a moeda de origem (`fromCurrency`) recebendo a moeda de destino (`toCurrency`).
     * Formato String.
     */
    askPrice: string;

    /**
     * **Preço de Compra (Bid):** Preço atual pelo qual o mercado está disposto a
     * comprar a moeda de origem (`fromCurrency`) pagando com a moeda de destino
     * (`toCurrency`). Formato String.
     */
    bidPrice: string;

    /**
     * **Variação Absoluta (Bid):** Mudança absoluta no preço de compra (bid) desde o
     * último fechamento ou período de referência. Formato String.
     */
    bidVariation: string;

    /**
     * **Moeda de Origem:** Sigla da moeda base do par (ex: `USD` em `USD-BRL`).
     */
    fromCurrency: string;

    /**
     * **Máxima:** Preço mais alto atingido pelo par no período recente (geralmente
     * diário). Formato String.
     */
    high: string;

    /**
     * **Mínima:** Preço mais baixo atingido pelo par no período recente (geralmente
     * diário). Formato String.
     */
    low: string;

    /**
     * **Nome do Par:** Nome descritivo do par de moedas (ex:
     * `Dólar Americano/Real Brasileiro`).
     */
    name: string;

    /**
     * **Variação Percentual:** Mudança percentual no preço do par desde o último
     * fechamento ou período de referência. Formato String.
     */
    percentageChange: string;

    /**
     * **Moeda de Destino:** Sigla da moeda de cotação do par (ex: `BRL` em `USD-BRL`).
     */
    toCurrency: string;

    /**
     * **Data da Atualização:** Data e hora da última atualização da cotação, formatada
     * de forma legível (`YYYY-MM-DD HH:MM:SS`).
     */
    updatedAtDate: string;

    /**
     * **Timestamp da Atualização:** Data e hora da última atualização da cotação,
     * representada como um **timestamp UNIX** (string contendo o número de segundos
     * desde 1970-01-01 UTC).
     */
    updatedAtTimestamp: string;
  }
}

/**
 * Resposta do endpoint que lista todas as moedas fiduciárias disponíveis.
 */
export interface CurrencyListAvailableResponse {
  /**
   * Lista de objetos, cada um contendo o nome de uma moeda fiduciária ou par
   * suportado pela API.
   */
  currencies?: Array<CurrencyListAvailableResponse.Currency>;
}

export namespace CurrencyListAvailableResponse {
  export interface Currency {
    /**
     * Nome da moeda ou par de moedas suportado (ex: `Dólar Americano/Real Brasileiro`,
     * `Euro/Real Brasileiro`). A sigla pode ser extraída deste nome ou consultada em
     * documentação adicional.
     */
    currency?: string;
  }
}

export interface CurrencyRetrieveParams {
  /**
   * **Obrigatório.** Uma lista de um ou mais pares de moedas a serem consultados,
   * separados por vírgula (`,`).
   *
   * - **Formato:** `MOEDA_ORIGEM-MOEDA_DESTINO` (ex: `USD-BRL`).
   * - **Disponibilidade:** Consulte os pares válidos usando o endpoint
   *   [`/api/v2/currency/available`](#/Moedas/getAvailableCurrencies).
   * - **Exemplo:** `USD-BRL,EUR-BRL,BTC-BRL`
   */
  currency: string;

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
}

export interface CurrencyListAvailableParams {
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
   * **Opcional.** Termo para filtrar a lista pelo nome da moeda (correspondência
   * parcial, case-insensitive).
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
