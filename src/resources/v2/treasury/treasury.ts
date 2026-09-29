// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as IndicatorsAPI from './indicators';
import {
  IndicatorHistoryParams,
  IndicatorHistoryResponse,
  IndicatorRetrieveParams,
  IndicatorRetrieveResponse,
  Indicators,
} from './indicators';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Consulte dados de títulos públicos e outros instrumentos de renda fixa brasileira.
 */
export class Treasury extends APIResource {
  indicators: IndicatorsAPI.Indicators = new IndicatorsAPI.Indicators(this._client);

  /**
   * Títulos do Tesouro Direto da data-base mais recente, com taxa e preço
   * indicativos de compra e venda. Filtre por indexador, tipo de cupom ou nome.
   *
   * Use para achar o `symbol` de cada título, montar uma tabela de títulos ou
   * comparar taxas entre vencimentos.
   *
   * Cada item traz `rateInfo`, que diz como ler `buyRate` e `sellRate` para aquele
   * indexador.
   *
   * Plano Pro. Sem token, `search` precisa ser um destes códigos:
   * `tesouro-selic-01032031`, `tesouro-prefixado-com-juros-semestrais-01012037` ou
   * `tesouro-ipca-com-juros-semestrais-15082060`.
   *
   * @example
   * ```ts
   * const treasuries = await client.v2.treasury.list();
   * ```
   */
  list(
    query: TreasuryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TreasuryListResponse> {
    return this._client.get('/api/v2/treasury/list', { query, ...options });
  }
}

export interface TreasuryListItem {
  /**
   * Data da taxa e do preço, no formato YYYY-MM-DD.
   */
  baseDate: string | null;

  /**
   * Preço unitário base, em reais.
   */
  basePrice: number | null;

  /**
   * Nome do título no Tesouro Direto.
   */
  bondType: string;

  /**
   * Preço unitário indicativo de compra, em reais.
   */
  buyPrice: number | null;

  /**
   * Taxa indicativa de compra, em % a.a. O sentido muda por indexador. Veja
   * `rateInfo`.
   */
  buyRate: number | null;

  /**
   * `semestral` para títulos com juros semestrais, `zero` para os demais.
   */
  couponType: 'zero' | 'semestral';

  /**
   * Dias corridos da data-base até o vencimento.
   */
  durationDays: number | null;

  /**
   * Indexador do título. Renda+ e Educa+ usam `ipca`.
   */
  indexer: 'selic' | 'prefixado' | 'ipca' | 'igpm';

  /**
   * Data de vencimento, no formato YYYY-MM-DD.
   */
  maturityDate: string | null;

  /**
   * Como ler `buyRate` e `sellRate`. O sentido muda por indexador.
   */
  rateInfo: TreasuryListItem.RateInfo;

  /**
   * Preço unitário indicativo de venda, em reais.
   */
  sellPrice: number | null;

  /**
   * Taxa indicativa de venda, em % a.a. O sentido muda por indexador. Veja
   * `rateInfo`.
   */
  sellRate: number | null;

  /**
   * Código do título: nome e vencimento em DDMMAAAA.
   */
  symbol: string;
}

export namespace TreasuryListItem {
  /**
   * Como ler `buyRate` e `sellRate`. O sentido muda por indexador.
   */
  export interface RateInfo {
    /**
     * Texto que explica como ler `buyRate` e `sellRate` neste título.
     */
    description: string;

    /**
     * O que `buyRate` e `sellRate` medem.
     */
    rateType: 'spreadOverSelic' | 'nominalAnnualRate' | 'realAnnualRateOverIpca' | 'realAnnualRateOverIgpm';

    /**
     * Unidade de `buyRate` e `sellRate`.
     */
    rateUnit: string;
  }
}

export interface TreasuryListResponse {
  pagination: TreasuryListResponse.Pagination;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<TreasuryListItem>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace TreasuryListResponse {
  export interface Pagination {
    hasNextPage: boolean;

    limit: number;

    page: number;

    totalItems: number;

    totalPages: number;
  }
}

export interface TreasuryListParams {
  /**
   * Tipo de cupom do título.
   */
  couponType?: 'zero' | 'semestral';

  /**
   * Indexador do título.
   */
  indexer?: 'selic' | 'prefixado' | 'ipca' | 'igpm';

  /**
   * Itens por página.
   */
  limit?: number;

  /**
   * Número da página, a partir de 1.
   */
  page?: number;

  /**
   * Busca por parte do código ou do nome do título. Ex.: tesouro-selic-01032031.
   */
  search?: string;

  /**
   * Campo usado na ordenação.
   */
  sortBy?:
    | 'symbol'
    | 'bondType'
    | 'maturityDate'
    | 'durationDays'
    | 'baseDate'
    | 'buyRate'
    | 'sellRate'
    | 'buyPrice'
    | 'sellPrice'
    | 'basePrice';

  /**
   * Direção da ordenação.
   */
  sortOrder?: 'asc' | 'desc';
}

Treasury.Indicators = Indicators;

export declare namespace Treasury {
  export {
    type TreasuryListItem as TreasuryListItem,
    type TreasuryListResponse as TreasuryListResponse,
    type TreasuryListParams as TreasuryListParams,
  };

  export {
    Indicators as Indicators,
    type IndicatorRetrieveResponse as IndicatorRetrieveResponse,
    type IndicatorHistoryResponse as IndicatorHistoryResponse,
    type IndicatorRetrieveParams as IndicatorRetrieveParams,
    type IndicatorHistoryParams as IndicatorHistoryParams,
  };
}
