// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Descubra, filtre e valide tickers B3 disponíveis na brapi. Use como camada de identidade antes dos endpoints de dados de mercado.
 */
export class Tickers extends APIResource {
  /**
   * Lista de tickers brasileiros com nome, tipo, setor, logo e um resumo da cotação:
   * ações, FIIs, ETFs, BDRs e units. Os índices vêm em `indexes`.
   *
   * Use para busca, autocomplete, validação de tickers e screeners.
   *
   * `search` busca por parte do ticker, do nome da empresa ou de um ticker antigo. O
   * filtro `type` aceita `stock`, `fund` e `bdr`. `facets` lista os valores aceitos
   * nos filtros.
   *
   * A lista não tem opções, futuros, Tesouro Direto, criptomoedas, câmbio nem
   * indicadores econômicos. Esses dados têm endpoints próprios.
   *
   * Não exige token. Para cotação completa, use a
   * [cotação de ações](https://brapi.dev/docs/acoes/cotacao).
   *
   * @example
   * ```ts
   * const tickers = await client.v2.tickers.list();
   * ```
   */
  list(
    query: TickerListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TickerListResponse> {
    return this._client.get('/api/v2/tickers', { query, ...options });
  }

  /**
   * Mostra quais dados a brapi tem para cada ticker e quais endpoints usar em
   * seguida: cotação, histórico, dividendos, fundamentos ou dados de FII.
   *
   * Use antes de montar uma integração, para saber quais endpoints servem para cada
   * ativo.
   *
   * Envie até 20 tickers em `symbols`. Um ticker antigo é trocado pelo atual e vem
   * com `status` igual a `renamed`. Um ticker desconhecido não gera erro. Ele vem
   * com `status` igual a `unknown` e links de busca. Um ticker de opção vem com
   * `wrong_endpoint` e links para os endpoints de opções.
   *
   * Este endpoint não traz dados de mercado. Não exige token.
   *
   * @example
   * ```ts
   * const response = await client.v2.tickers.coverage({
   *   symbols: 'PETR4,MXRF11,VVAR3',
   * });
   * ```
   */
  coverage(query: TickerCoverageParams, options?: RequestOptions): APIPromise<TickerCoverageResponse> {
    return this._client.get('/api/v2/tickers/coverage', { query, ...options });
  }

  /**
   * Mudanças de ticker, com o ticker antigo, o novo, o atual e a data efetiva.
   *
   * Use para explicar por que um ticker antigo leva a outro e para corrigir séries
   * salvas com o ticker antigo.
   *
   * Se um ativo mudou de ticker mais de uma vez, `canonicalSymbol` traz o último.
   * `startDate` e `endDate` filtram pela data efetiva. A lista vem da data mais
   * recente para a mais antiga.
   *
   * Não exige token. Para trocar uma lista de tickers pelos atuais, use
   * [resolver ticker antigo](https://brapi.dev/docs/tickers/resolver).
   *
   * @example
   * ```ts
   * const response = await client.v2.tickers.renames();
   * ```
   */
  renames(
    query: TickerRenamesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TickerRenamesResponse> {
    return this._client.get('/api/v2/tickers/renames', { query, ...options });
  }

  /**
   * Troca tickers antigos pelo ticker atual. Um ticker sem renome conhecido volta
   * igual.
   *
   * Use antes de consultar dados de mercado quando os tickers vêm de usuários,
   * planilhas antigas ou carteiras importadas.
   *
   * Envie até 20 tickers em `symbols`. A resposta segue a ordem enviada, sem
   * repetidos. `status` é `renamed` quando o ticker mudou e `active` quando não há
   * renome conhecido.
   *
   * Este endpoint não confirma se o ticker existe. Para isso, use a
   * [cobertura por ticker](https://brapi.dev/docs/tickers/cobertura).
   *
   * Não exige token.
   *
   * @example
   * ```ts
   * const response = await client.v2.tickers.resolve({
   *   symbols: 'VVAR3,PETR4',
   * });
   * ```
   */
  resolve(query: TickerResolveParams, options?: RequestOptions): APIPromise<TickerResolveResponse> {
    return this._client.get('/api/v2/tickers/resolve', { query, ...options });
  }
}

export interface TickerListResponse {
  facets: TickerListResponse.Facets;

  indexes: Array<TickerListResponse.Index>;

  pagination: TickerListResponse.Pagination;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<TickerListResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace TickerListResponse {
  export interface Facets {
    /**
     * Valores aceitos em `type`.
     */
    assetTypes: Array<string>;

    /**
     * Valores aceitos em `sector`.
     */
    sectors: Array<string>;

    /**
     * Valores aceitos em `subsector`.
     */
    subsectors: Array<string>;

    /**
     * Valores aceitos em `subType`.
     */
    subTypes: Array<string>;
  }

  export interface Index {
    assetType: 'index';

    exchange: 'B3';

    name: string;

    symbol: string;
  }

  export interface Pagination {
    hasNextPage: boolean;

    limit: number;

    page: number;

    totalItems: number;

    totalPages: number;
  }

  export interface Result {
    /**
     * Tipo do ativo.
     */
    assetType: 'stock' | 'fund' | 'bdr' | null;

    /**
     * Moeda.
     */
    currency: 'BRL';

    /**
     * Bolsa.
     */
    exchange: 'B3';

    /**
     * `true` quando o ativo está em negociação.
     */
    isActive: boolean;

    /**
     * URL do logo.
     */
    logoUrl: string | null;

    /**
     * Nome longo. Pode ser nulo.
     */
    longName: string | null;

    /**
     * Nome da empresa ou do fundo.
     */
    name: string;

    quote: Result.Quote;

    /**
     * Setor. Pode ser nulo.
     */
    sector: string | null;

    /**
     * Subsetor. Pode ser nulo.
     */
    subsector: string | null;

    /**
     * Subtipo do ativo: stock, unit, fii, etf, fi-infra, fi-agro, fip, fidc ou bdr.
     */
    subType: 'stock' | 'unit' | 'fii' | 'etf' | 'fi-infra' | 'fi-agro' | 'fip' | 'fidc' | 'bdr' | null;

    /**
     * Ticker do ativo.
     */
    symbol: string;
  }

  export namespace Result {
    export interface Quote {
      /**
       * Variação no dia, em porcentagem.
       */
      changePercent: number | null;

      /**
       * Último preço.
       */
      lastPrice: number | null;

      /**
       * Valor de mercado, em reais. Pode ser nulo.
       */
      marketCap: number | null;

      /**
       * Volume negociado no dia.
       */
      volume: number | null;
    }
  }
}

export interface TickerCoverageResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<TickerCoverageResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace TickerCoverageResponse {
  export interface Result {
    /**
     * Tipo do ativo. Pode ser nulo.
     */
    assetType: string | null;

    availableData: Result.AvailableData;

    /**
     * `true` quando o ticker enviado foi trocado pelo ticker atual.
     */
    changed: boolean;

    /**
     * Endpoints para consultar os dados do ticker.
     */
    recommendedEndpoints: { [key: string]: string };

    /**
     * Ticker enviado na requisição.
     */
    requestedSymbol: string;

    /**
     * `available`: o ticker tem dados. `renamed`: o ticker mudou e tem dados.
     * `unknown`: o ticker não foi encontrado. `wrong_endpoint`: o ticker é de uma
     * opção.
     */
    status: 'available' | 'renamed' | 'unknown' | 'wrong_endpoint';

    /**
     * Subtipo do ativo. Pode ser nulo.
     */
    subType: string | null;

    /**
     * Ticker atual usado na verificação.
     */
    symbol: string;
  }

  export namespace Result {
    export interface AvailableData {
      fiiDividends: boolean;

      fiiIndicators: boolean;

      fiiPortfolio: boolean;

      fiiProperties: boolean;

      fiiReports: boolean;

      financialStatements: boolean;

      historical: boolean;

      profile: boolean;

      quote: boolean;

      statistics: boolean;

      stockDividends: boolean;

      ticker: boolean;
    }
  }
}

export interface TickerRenamesResponse {
  count: number;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<TickerRenamesResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace TickerRenamesResponse {
  export interface Result {
    /**
     * Ticker atual. Se o ativo mudou de ticker mais de uma vez, é o último.
     */
    canonicalSymbol: string;

    /**
     * Data efetiva do renome no formato YYYY-MM-DD.
     */
    effectiveDate: string;

    /**
     * Ticker novo divulgado no evento.
     */
    newSymbol: string;

    /**
     * Ticker antigo.
     */
    oldSymbol: string;
  }
}

export interface TickerResolveResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<TickerResolveResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace TickerResolveResponse {
  export interface Result {
    /**
     * `true` quando o ticker enviado foi trocado pelo ticker atual.
     */
    changed: boolean;

    /**
     * Data efetiva do renome. Nulo quando não há renome.
     */
    effectiveDate: string | null;

    /**
     * Ticker enviado na requisição.
     */
    requestedSymbol: string;

    /**
     * `renamed` quando o ticker enviado mudou. `active` quando não há renome
     * conhecido.
     */
    status: 'active' | 'renamed';

    /**
     * Ticker atual. Use este nas próximas consultas.
     */
    symbol: string;
  }
}

export interface TickerListParams {
  /**
   * Itens por página. Máximo: 2000.
   */
  limit?: number;

  /**
   * Número da página. Começa em 1.
   */
  page?: number;

  /**
   * Parte do ticker, do nome da empresa ou de um ticker antigo.
   */
  search?: string;

  /**
   * Setor.
   */
  sector?: string;

  /**
   * Campo de ordenação.
   */
  sortBy?: 'symbol' | 'name' | 'close' | 'change' | 'volume' | 'marketCap';

  /**
   * Ordem.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Subsetor.
   */
  subsector?: string;

  /**
   * Subtipo do ativo: stock, unit, fii, etf, fi-infra, fi-agro, fip, fidc ou bdr.
   */
  subType?: 'stock' | 'unit' | 'fii' | 'etf' | 'fi-infra' | 'fi-agro' | 'fip' | 'fidc' | 'bdr';

  /**
   * Tipo do ativo. Índices não entram neste filtro.
   */
  type?: 'stock' | 'fund' | 'bdr';
}

export interface TickerCoverageParams {
  /**
   * Tickers separados por vírgula, até 20.
   */
  symbols: string;
}

export interface TickerRenamesParams {
  /**
   * Data efetiva final no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Parte do ticker antigo, do novo ou do atual.
   */
  search?: string;

  /**
   * Data efetiva inicial no formato YYYY-MM-DD.
   */
  startDate?: string;

  /**
   * Tickers separados por vírgula, até 20. Traz renomes em que algum deles é o
   * ticker antigo, o novo ou o atual.
   */
  symbols?: string;
}

export interface TickerResolveParams {
  /**
   * Tickers separados por vírgula, até 20.
   */
  symbols: string;
}

export declare namespace Tickers {
  export {
    type TickerListResponse as TickerListResponse,
    type TickerCoverageResponse as TickerCoverageResponse,
    type TickerRenamesResponse as TickerRenamesResponse,
    type TickerResolveResponse as TickerResolveResponse,
    type TickerListParams as TickerListParams,
    type TickerCoverageParams as TickerCoverageParams,
    type TickerRenamesParams as TickerRenamesParams,
    type TickerResolveParams as TickerResolveParams,
  };
}
