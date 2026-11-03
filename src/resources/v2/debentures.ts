// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Consulte dados de títulos públicos e outros instrumentos de renda fixa brasileira.
 */
export class Debentures extends APIResource {
  /**
   * Lista as debêntures registradas, com emissora, indexador, taxa, vencimento e
   * valor nominal atualizado. Os dados vêm do registro público de debêntures e são
   * atualizados uma vez por dia.
   *
   * Sem filtros, traz só as debêntures em circulação (`status` = `active`). Use
   * `cnpjs` para ver as debêntures de uma empresa, inclusive empresas sem ações
   * listadas.
   *
   * Todos os planos.
   *
   * @example
   * ```ts
   * const debentures = await client.v2.debentures.list();
   * ```
   */
  list(
    query: DebentureListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DebentureListResponse> {
    return this._client.get('/api/v2/debentures/list', { query, ...options });
  }

  /**
   * Características completas de cada debênture: os campos da listagem, mais
   * registro na CVM, resgate antecipado, pagamento de juros, amortização,
   * quantidades e agentes da emissão. Os dados vêm do registro público de debêntures
   * e são atualizados uma vez por dia.
   *
   * Todos os planos.
   *
   * @example
   * ```ts
   * const response = await client.v2.debentures.profile({
   *   symbols: 'TIMS12',
   * });
   * ```
   */
  profile(query: DebentureProfileParams, options?: RequestOptions): APIPromise<DebentureProfileResponse> {
    return this._client.get('/api/v2/debentures/profile', { query, ...options });
  }
}

export interface Debenture {
  /**
   * Garantia: Quirografária, Real, Subordinada ou Flutuante, como no registro.
   */
  guarantee: string | null;

  /**
   * Debênture incentivada (Lei 12.431), com benefício de imposto de renda.
   */
  incentivized: boolean | null;

  /**
   * Indexador: `di`, `ipca`, `pre` (prefixado), `igp-m`, `inpc`, `tr`, `usd`, `eur`
   * ou `none`.
   */
  index: string | null;

  /**
   * Percentual do indexador. Ex.: 110 para 110% do DI.
   */
  indexPercent: number | null;

  /**
   * Taxa de juros em % ao ano, além do indexador. Ex.: IPCA + 3,9182%.
   */
  interestRate: number | null;

  isin: string | null;

  issueDate: string | null;

  /**
   * Número da emissão da empresa.
   */
  issueNumber: string | null;

  /**
   * CNPJ da empresa emissora.
   */
  issuerCnpj: string;

  issuerName: string;

  /**
   * Data de vencimento, já com prorrogações.
   */
  maturityDate: string | null;

  /**
   * Valor nominal unitário atualizado, em reais, já descontadas as amortizações.
   */
  nominalValue: number | null;

  /**
   * Valor nominal unitário na emissão, em reais.
   */
  nominalValueAtIssue: number | null;

  /**
   * Data do valor nominal atualizado.
   */
  nominalValueDate: string | null;

  quantityIssued: number | null;

  /**
   * Quantidade em circulação no mercado.
   */
  quantityOutstanding: number | null;

  /**
   * Data de saída de circulação.
   */
  removedDate: string | null;

  /**
   * Motivo da saída: `matured` (vencimento), `accelerated` (vencimento antecipado),
   * `early-redemption` (resgate antecipado), `cancelled` (cancelamento), `converted`
   * (conversão em ações) ou `other`.
   */
  removedReason: 'matured' | 'accelerated' | 'early-redemption' | 'cancelled' | 'converted' | 'other' | null;

  /**
   * Série. `UNI` quando a emissão tem série única.
   */
  series: string | null;

  /**
   * `active` quando a debênture está em circulação e não venceu. `inactive` nos
   * demais casos.
   */
  status: 'active' | 'inactive';

  /**
   * Código da debênture.
   */
  symbol: string;
}

export interface DebentureProfile extends Debenture {
  agents: DebentureProfile.Agents;

  /**
   * Amortização. Campos nulos quando o valor é pago no vencimento.
   */
  amortization: DebentureProfile.Amortization;

  /**
   * Registro da oferta na CVM, ou o tipo de dispensa de registro.
   */
  cvmRegistration: string | null;

  /**
   * Data do registro na CVM.
   */
  cvmRegistrationDate: string | null;

  /**
   * A escritura permite resgate antecipado pela empresa.
   */
  earlyRedemptionAllowed: boolean | null;

  /**
   * Pagamento de juros.
   */
  interest: DebentureProfile.Interest;

  /**
   * Data de início da rentabilidade.
   */
  profitabilityStartDate: string | null;

  /**
   * Quantidade cancelada.
   */
  quantityCancelled: number | null;

  /**
   * Quantidade na tesouraria da empresa.
   */
  quantityInTreasury: number | null;

  /**
   * Quantidade resgatada.
   */
  quantityRedeemed: number | null;
}

export namespace DebentureProfile {
  export interface Agents {
    /**
     * Instituição depositária.
     */
    depositary: string | null;

    /**
     * Coordenador líder.
     */
    leadUnderwriter: string | null;

    /**
     * Banco mandatário.
     */
    paymentAgent: string | null;

    /**
     * Agente fiduciário.
     */
    trustee: string | null;
  }

  /**
   * Amortização. Campos nulos quando o valor é pago no vencimento.
   */
  export interface Amortization {
    /**
     * Intervalo entre os pagamentos.
     */
    every: number | null;

    /**
     * Forma de amortização, como no registro.
     */
    method: string | null;

    /**
     * Percentual amortizado em cada pagamento.
     */
    percent: number | null;

    /**
     * Unidade do intervalo.
     */
    unit: 'month' | 'day' | null;
  }

  /**
   * Pagamento de juros.
   */
  export interface Interest {
    /**
     * Base de dias por ano: 252 (dias úteis), 360 ou 365.
     */
    dayCount: number | null;

    /**
     * Intervalo entre os pagamentos.
     */
    every: number | null;

    /**
     * Unidade do intervalo.
     */
    unit: 'month' | 'day' | null;
  }
}

export interface DebentureListResponse {
  pagination: DebentureListResponse.Pagination;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<Debenture>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace DebentureListResponse {
  export interface Pagination {
    hasMore: boolean;

    limit: number;

    page: number;

    total: number;
  }
}

export interface DebentureProfileResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<DebentureProfile>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface DebentureListParams {
  /**
   * CNPJs das empresas emissoras separados por vírgula, com ou sem pontuação. Máximo
   * de 20.
   */
  cnpjs?: string;

  /**
   * `true` traz só debêntures incentivadas (Lei 12.431), com benefício de imposto de
   * renda.
   */
  incentivized?: 'true' | 'false';

  /**
   * Indexador. Para mais de um, separe por vírgula. `pre` é prefixado, `none` é sem
   * indexador.
   */
  index?: 'di' | 'ipca' | 'pre' | 'igp-m' | 'inpc' | 'tr' | 'usd' | 'eur' | 'none';

  /**
   * Máximo de debêntures por página.
   */
  limit?: number;

  /**
   * Vencimento a partir desta data.
   */
  maturityFrom?: string;

  /**
   * Vencimento até esta data.
   */
  maturityTo?: string;

  /**
   * Página.
   */
  page?: number;

  /**
   * Campo de ordenação.
   */
  sortBy?: 'symbol' | 'maturityDate' | 'issueDate';

  /**
   * Ordem crescente (`asc`) ou decrescente (`desc`).
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * `active` (em circulação) ou `inactive` (vencida, resgatada ou cancelada).
   * Padrão: `active`, ou as duas quando `symbols` é informado.
   */
  status?: 'active' | 'inactive';

  /**
   * Códigos das debêntures separados por vírgula. Máximo de 20.
   */
  symbols?: string;
}

export interface DebentureProfileParams {
  /**
   * Códigos das debêntures separados por vírgula. Máximo de 20.
   */
  symbols: string;
}

export declare namespace Debentures {
  export {
    type Debenture as Debenture,
    type DebentureProfile as DebentureProfile,
    type DebentureListResponse as DebentureListResponse,
    type DebentureProfileResponse as DebentureProfileResponse,
    type DebentureListParams as DebentureListParams,
    type DebentureProfileParams as DebentureProfileParams,
  };
}
