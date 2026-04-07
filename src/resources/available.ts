// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Ferramentas auxiliares para descobrir ativos disponíveis e verificar a saúde da API.
 */
export class Available extends APIResource {
  /**
   * Retorna a lista completa de **ações e índices** disponíveis para consulta na API
   * brapi.
   *
   * ### Funcionalidades
   *
   * - **Ações da B3:** Todas as ações, FIIs, BDRs e ETFs negociados na bolsa
   *   brasileira
   * - **Índices:** Principais índices do mercado brasileiro (Ibovespa, IBrX, IFIX,
   *   etc.)
   * - **Filtro por Nome:** Use `search` para filtrar por código ou nome do ativo
   *
   * ### Características
   *
   * - **Sem Autenticação:** Este endpoint é **público** e não requer token
   * - **Cache:** Dados cacheados por 15 minutos
   * - **Atualização automática:** Conforme novos ativos são listados na B3
   *
   * ### Exemplos de Uso
   *
   * ```bash
   * # Listar todos os ativos
   * curl "https://brapi.dev/api/available"
   *
   * # Buscar por código de ticker
   * curl "https://brapi.dev/api/available?search=PETR"
   *
   * # Buscar por nome da empresa
   * curl "https://brapi.dev/api/available?search=banco"
   * ```
   *
   * ### Índices Disponíveis
   *
   * - `^BVSP` — Ibovespa (Índice Bovespa)
   * - `^IBX50` — IBrX 50
   * - `^IBX100` — IBrX 100
   * - `^IDIV` — Índice Dividendos
   * - `^SMLL` — Índice Small Cap
   * - `^IFIX` — Índice de Fundos Imobiliários
   * - `^IFNC` — Índice Financeiro
   * - `^ICON` — Índice de Consumo
   * - `^IEEX` — Índice de Energia Elétrica
   * - `^IMOB` — Índice Imobiliário
   *
   * ### Campos da Resposta
   *
   * - `stocks` — Array com códigos das ações (ex: ["PETR4", "VALE3", "ITUB4", ...])
   * - `indexes` — Array com códigos dos índices (ex: ["^BVSP", "^IFIX", ...])
   *
   * ### Como Usar
   *
   * Use os códigos retornados como parâmetro no endpoint `/api/quote/{tickers}` para
   * obter cotações detalhadas.
   *
   * **Fonte:** B3 (Bolsa de Valores do Brasil)
   *
   * **Plano Mínimo:** Gratuito **Autenticação:** Não necessária (Público)
   *
   * @example
   * ```ts
   * const availables = await client.available.list();
   * ```
   */
  list(
    query: AvailableListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AvailableListResponse> {
    return this._client.get('/api/available', { query, ...options });
  }
}

export interface AvailableListResponse {
  /**
   * Lista de índices disponíveis
   */
  indexes: Array<string>;

  /**
   * Lista de códigos de ações disponíveis
   */
  stocks: Array<string>;
}

export interface AvailableListParams {
  /**
   * Filtrar ações e índices por nome ou código
   */
  search?: string;
}

export declare namespace Available {
  export {
    type AvailableListResponse as AvailableListResponse,
    type AvailableListParams as AvailableListParams,
  };
}
