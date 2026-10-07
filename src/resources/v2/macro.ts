// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MacroAPI from './macro';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Acompanhe os principais indicadores macroeconômicos do Brasil, incluindo inflação (IPCA, IGP-M), Taxa Selic, agregados monetários e atividade.
 */
export class Macro extends APIResource {
  /**
   * Histórico de indicadores macroeconômicos do Brasil, como Selic, CDI, IPCA,
   * IGP-M, agregados monetários, atividade, emprego e setor externo. Cada série tem
   * um código, como `selic` ou `ipca`, que a resposta mostra no campo `slug`.
   *
   * Use para gráficos de juros e inflação, modelos de renda fixa e análise de
   * cenário.
   *
   * Peça até 20 séries por chamada em `symbols`, como `symbols=selic,ipca`. Sem
   * datas, a janela é dos últimos 12 meses. `limit` corta os pontos de cada série e
   * tem padrão 20. Com o padrão, uma série diária não cobre os 12 meses. Aumente
   * `limit` para ver a janela toda.
   *
   * As séries têm frequências diferentes: a Selic e o CDI são diários, o IPCA e o
   * PIB mensal são mensais. Leia `series.frequency` antes de juntar duas séries.
   *
   * Um nome alternativo no lugar do código, como `igp-m` para `igpm`, funciona e
   * gera um aviso em `warnings`. Um código desconhecido gera um item em `errors` e
   * não derruba as outras séries. Pares de câmbio ficam no
   * [histórico de câmbio](https://brapi.dev/docs/moedas/historico).
   *
   * Veja os códigos em [listar séries](https://brapi.dev/docs/macro/available).
   * Planos Startup e Pro.
   *
   * @example
   * ```ts
   * const macro = await client.v2.macro.retrieve({
   *   symbols: 'selic,ipca',
   * });
   * ```
   */
  retrieve(query: MacroRetrieveParams, options?: RequestOptions): APIPromise<MacroRetrieveResponse> {
    return this._client.get('/api/v2/macro', { query, ...options });
  }

  /**
   * O valor mais recente de cada série macroeconômica pedida em `symbols`. Sem
   * `symbols`, devolve todas as séries.
   *
   * Use para painéis com Selic, CDI e IPCA atuais sem baixar o histórico.
   *
   * A data de cada valor segue a frequência da série. O IPCA mais recente pode ser
   * de um mês atrás e a Selic de ontem. `latest` é nulo quando a série não tem
   * dados.
   *
   * Planos Startup e Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.macro.latest();
   * ```
   */
  latest(
    query: MacroLatestParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MacroLatestResponse> {
    return this._client.get('/api/v2/macro/latest', { query, ...options });
  }

  /**
   * Lista as séries macroeconômicas com código (campo `slug`), nome, descrição,
   * unidade, frequência, categoria e data de início do histórico.
   *
   * Use para achar o código antes de chamar as
   * [séries macroeconômicas](https://brapi.dev/docs/macro) ou o
   * [último valor](https://brapi.dev/docs/macro/latest).
   *
   * `q` e `category` funcionam juntos. Endpoint público, sem token.
   *
   * @example
   * ```ts
   * const response = await client.v2.macro.listAvailable();
   * ```
   */
  listAvailable(
    query: MacroListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MacroListAvailableResponse> {
    return this._client.get('/api/v2/macro/available', { query, ...options });
  }
}

export interface MacroSeriesAliasWarning {
  /**
   * Código oficial da série. Use este valor em integrações.
   */
  canonicalSlug: string;

  message: string;

  /**
   * Nome alternativo enviado em `symbols`.
   */
  provided: string;
}

export interface MacroSeriesError {
  code: string;

  message: string;

  /**
   * Código enviado em `symbols`.
   */
  slug: string;
}

export interface MacroSeriesObservation {
  date: string;

  value: number;
}

export interface MacroSeriesPublic {
  category: string;

  description: string;

  frequency: string;

  name: string;

  /**
   * Código da série. Use este valor em `symbols`.
   */
  slug: string;

  startDate: string;

  unit: string;
}

export interface MacroRetrieveResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<MacroRetrieveResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  errors?: Array<MacroSeriesError>;

  warnings?: Array<MacroSeriesAliasWarning>;
}

export namespace MacroRetrieveResponse {
  export interface Result {
    observations: Array<MacroAPI.MacroSeriesObservation>;

    series: MacroAPI.MacroSeriesPublic;
  }
}

export interface MacroLatestResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<MacroLatestResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  errors?: Array<MacroSeriesError>;

  warnings?: Array<MacroSeriesAliasWarning>;
}

export namespace MacroLatestResponse {
  export interface Result {
    latest: MacroAPI.MacroSeriesObservation | null;

    series: MacroAPI.MacroSeriesPublic;
  }
}

export interface MacroListAvailableResponse {
  /**
   * Todas as categorias. Os filtros não mudam esta lista.
   */
  categories: Array<string>;

  /**
   * Número de séries em `results`, depois dos filtros.
   */
  count: number;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Séries encontradas. Com `q`, a ordem é por relevância: código, nome alternativo,
   * nome e descrição.
   */
  results: Array<MacroSeriesPublic>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface MacroRetrieveParams {
  /**
   * Códigos das séries separados por vírgula, até 20. Códigos por categoria:
   * interestRate: `selic`, `selicovernight`, `cdi`, `tr`; inflation: `ipca`,
   * `ipca12m`, `inpc`, `igpm`, `igpdi`; activity: `ibcbr`, `pibmensal`; labor:
   * `desemprego`; monetary: `m1`, `m4`; external: `reservas`.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD. Padrão: hoje.
   */
  endDate?: string;

  /**
   * Máximo de observações por série. Padrão: 20. Não há teto.
   */
  limit?: number;

  /**
   * Ordem por data.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD. Padrão: 12 meses atrás.
   */
  startDate?: string;
}

export interface MacroLatestParams {
  /**
   * Códigos das séries separados por vírgula, até 20. Sem valor, devolve todas as
   * séries. Códigos: selic, selicovernight, cdi, tr, ipca, ipca12m, inpc, igpm,
   * igpdi, ibcbr, pibmensal, desemprego, m1, m4, reservas.
   */
  symbols?: string;
}

export interface MacroListAvailableParams {
  /**
   * Categoria da série: `interestRate`, `inflation`, `monetary`, `activity`,
   * `labor`, `external`.
   */
  category?: string;

  /**
   * Texto buscado no código, nome alternativo, nome e descrição. Ignora maiúsculas e
   * aceita parte da palavra.
   */
  q?: string;
}

export declare namespace Macro {
  export {
    type MacroSeriesAliasWarning as MacroSeriesAliasWarning,
    type MacroSeriesError as MacroSeriesError,
    type MacroSeriesObservation as MacroSeriesObservation,
    type MacroSeriesPublic as MacroSeriesPublic,
    type MacroRetrieveResponse as MacroRetrieveResponse,
    type MacroLatestResponse as MacroLatestResponse,
    type MacroListAvailableResponse as MacroListAvailableResponse,
    type MacroRetrieveParams as MacroRetrieveParams,
    type MacroLatestParams as MacroLatestParams,
    type MacroListAvailableParams as MacroListAvailableParams,
  };
}
