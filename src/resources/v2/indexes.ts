// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Descubra e consulte fundos brasileiros listados e estruturados, incluindo FIIs, FIAGROs, FI-Infra/FIFs, FIDCs e FIPs.
 */
export class Indexes extends APIResource {
  /**
   * Índices com composição em `/api/v2/indexes/composition`, cada um com o ETF que o
   * replica e o mês da carteira mais recente.
   *
   * A bolsa não licencia a carteira oficial dos índices. A composição é a carteira
   * do maior ETF que replica o índice, da carteira mensal que o ETF entrega à CVM.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const indexes = await client.v2.indexes.list();
   * ```
   */
  list(
    query: IndexListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IndexListResponse> {
    return this._client.get('/api/v2/indexes/list', { query, ...options });
  }

  /**
   * Ativos de um índice e o peso de cada um, com o resumo por país e setor.
   *
   * A bolsa não licencia a carteira oficial dos índices. A composição é a carteira
   * do maior ETF que replica o índice, da carteira mensal que o ETF entrega à CVM.
   * Por isso, `approximated` é sempre `true` e `trackingFund` mostra o ETF.
   *
   * Os pesos são da parte investida do ETF: sem caixa, valores a receber e a pagar,
   * compromissadas e derivativos, e somam 100. Quando o ETF tem cotas de um ETF do
   * exterior, a resposta mostra os ativos desse ETF, pelos relatórios públicos do
   * fundo no exterior (SEC).
   *
   * Sem `referenceDate`, a resposta traz o mês mais recente. Com ela, traz o mês
   * mais recente até essa data. Mostre `referenceDate` junto do dado: a CVM publica
   * a carteira com meses de atraso.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.indexes.composition({
   *   symbols: 'IBOV',
   * });
   * ```
   */
  composition(query: IndexCompositionParams, options?: RequestOptions): APIPromise<IndexCompositionResponse> {
    return this._client.get('/api/v2/indexes/composition', { query, ...options });
  }
}

export interface IndexListResponse {
  indexes: Array<IndexListResponse.Index>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace IndexListResponse {
  export interface Index {
    name: string;

    /**
     * Mês da carteira mais recente do ETF.
     */
    referenceDate: string | null;

    symbol: string;

    trackingFund: Index.TrackingFund;
  }

  export namespace Index {
    export interface TrackingFund {
      name: string | null;

      symbol: string;
    }
  }
}

export interface IndexCompositionResponse {
  indexes: Array<IndexCompositionResponse.Index>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace IndexCompositionResponse {
  export interface Index {
    /**
     * Sempre `true`: a composição é a carteira do ETF que segue o índice, não a
     * carteira oficial.
     */
    approximated: true;

    holdings: Array<Index.Holding>;

    holdingsCount: number;

    name: string;

    pagination: Index.Pagination;

    /**
     * Fim do mês da carteira do ETF.
     */
    referenceDate: string;

    summary: Index.Summary;

    symbol: string;

    trackingFund: Index.TrackingFund;
  }

  export namespace Index {
    export interface Holding {
      /**
       * Classe do ativo: `equity` (ações), `bdr`, `fund` (cotas de fundos),
       * `governmentBond` (títulos públicos), `repo` (compromissadas), `privateCredit`
       * (crédito privado), `bankSecurity` (títulos de bancos), `foreign` (exterior),
       * `derivative`, `cash` (caixa), `receivable` (valores a receber), `payable`
       * (valores a pagar), `commodity` (ouro, prata), `crypto` (criptoativos) ou
       * `other`.
       */
      assetClass:
        | 'equity'
        | 'bdr'
        | 'fund'
        | 'governmentBond'
        | 'repo'
        | 'privateCredit'
        | 'bankSecurity'
        | 'foreign'
        | 'derivative'
        | 'cash'
        | 'receivable'
        | 'payable'
        | 'commodity'
        | 'crypto'
        | 'other';

      country: string | null;

      isin: string | null;

      name: string | null;

      rank: number;

      sector: string | null;

      symbol: string | null;

      /**
       * Peso na parte investida do ETF, em % (4.52 = 4,52%).
       */
      weightPercent: number;
    }

    export interface Pagination {
      hasNextPage: boolean;

      limit: number;

      page: number;

      totalItems: number;

      totalPages: number;
    }

    export interface Summary {
      countries: Array<Summary.Country>;

      /**
       * Parte do peso em ações e BDRs que tem setor, em %. `null` sem ações.
       */
      sectorCoveragePercent: number | null;

      sectors: Array<Summary.Sector>;
    }

    export namespace Summary {
      export interface Country {
        /**
         * Código ISO do país.
         */
        country: string;

        countryName: string | null;

        /**
         * Peso no patrimônio, em %.
         */
        weightPercent: number;
      }

      export interface Sector {
        sector: string;

        /**
         * Peso no patrimônio, em %.
         */
        weightPercent: number;
      }
    }

    export interface TrackingFund {
      cnpj: string;

      name: string | null;

      symbol: string;
    }
  }
}

export interface IndexListParams {
  /**
   * Busca por parte da sigla ou do nome do índice, ou do ticker do ETF. Ex.: ibov.
   */
  search?: string;
}

export interface IndexCompositionParams {
  /**
   * Índices separados por vírgula, até 20. Veja os aceitos em
   * `/api/v2/indexes/list`. Ex.: IBOV,SMLL.
   */
  symbols: string;

  /**
   * Ativos por índice e por página. Padrão 10, máximo 500.
   */
  limit?: number;

  /**
   * Página, a partir de 1.
   */
  page?: number;

  /**
   * Data no formato YYYY-MM-DD. Traz o mês mais recente até esta data. Sem ela, traz
   * o mês mais recente.
   */
  referenceDate?: string;
}

export declare namespace Indexes {
  export {
    type IndexListResponse as IndexListResponse,
    type IndexCompositionResponse as IndexCompositionResponse,
    type IndexListParams as IndexListParams,
    type IndexCompositionParams as IndexCompositionParams,
  };
}
