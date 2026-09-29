// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FundsAPI from './funds';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Descubra e consulte fundos brasileiros listados e estruturados, incluindo FIIs, FIAGROs, FI-Infra/FIFs, FIDCs e FIPs.
 */
export class Fip extends APIResource {
  /**
   * Relatórios trimestrais e quadrimestrais de FIP na CVM: patrimônio, capital
   * comprometido e integralizado, cotas, classe e composição de investidores.
   *
   * Use para acompanhar o capital e os investidores de um FIP.
   *
   * Escolha o documento com `reportType`. Informe `cnpjs`, ou `symbols` quando o
   * fundo tem ticker. FIP não tem cota diária.
   *
   * `sortBy` aceita `referenceDate`, `cnpj` e `netEquity`. O padrão é
   * `referenceDate`.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.fip.reports();
   * ```
   */
  reports(
    query: FipReportsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FipReportsResponse> {
    return this._client.get('/api/v2/funds/fip/reports', { query, ...options });
  }
}

export interface FipReportsResponse {
  pagination: FundsAPI.FundPaginationMeta;

  reports: Array<FipReportsResponse.Report>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FipReportsResponse {
  export interface Report {
    capital: Report.Capital | null;

    cnpj: string;

    investedInOtherFips: number | null;

    investorComposition: Report.InvestorComposition | null;

    isInvestmentEntity: boolean | null;

    name: string | null;

    netEquity: number | null;

    quotaClass: Report.QuotaClass | null;

    quotas: Report.Quotas | null;

    referenceDate: string;

    reportType: 'trimestral' | 'quadrimestral';

    symbol: string | null;

    targetAudience: string | null;
  }

  export namespace Report {
    export interface Capital {
      committed: number | null;

      paidIn: number | null;

      subscribed: number | null;
    }

    export interface InvestorComposition {
      byType: InvestorComposition.ByType;

      totalInvestors: number | null;

      totalSubscribedQuotaPercent: number | null;
    }

    export namespace InvestorComposition {
      export interface ByType {
        brokersAndDistributors?: ByType.BrokersAndDistributors;

        capitalizationAndLeasingCompanies?: ByType.CapitalizationAndLeasingCompanies;

        closedPensionFunds?: ByType.ClosedPensionFunds;

        commercialBanks?: ByType.CommercialBanks;

        financialCompanies?: ByType.FinancialCompanies;

        fundDistributors?: ByType.FundDistributors;

        individuals?: ByType.Individuals;

        insuranceCompanies?: ByType.InsuranceCompanies;

        investmentFunds?: ByType.InvestmentFunds;

        nonFinancialCompanies?: ByType.NonFinancialCompanies;

        nonResidents?: ByType.NonResidents;

        openPensionFunds?: ByType.OpenPensionFunds;

        otherInvestors?: ByType.OtherInvestors;

        publicPensionFunds?: ByType.PublicPensionFunds;

        realEstateFunds?: ByType.RealEstateFunds;
      }

      export namespace ByType {
        export interface BrokersAndDistributors {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface CapitalizationAndLeasingCompanies {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface ClosedPensionFunds {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface CommercialBanks {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface FinancialCompanies {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface FundDistributors {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface Individuals {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface InsuranceCompanies {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface InvestmentFunds {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface NonFinancialCompanies {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface NonResidents {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface OpenPensionFunds {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface OtherInvestors {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface PublicPensionFunds {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }

        export interface RealEstateFunds {
          investors: number | null;

          subscribedQuotaPercent: number | null;
        }
      }
    }

    export interface QuotaClass {
      fundType: string | null;

      hasDistinctEconomicRights: boolean | null;

      hasSpecialPoliticalRights: boolean | null;

      investors: number | null;

      name: string | null;

      paidInQuotas: number | null;

      quotaValue: number | null;

      subscribedQuotas: number | null;
    }

    export interface Quotas {
      paidIn: number | null;

      subscribed: number | null;
    }
  }
}

export interface FipReportsParams {
  /**
   * CNPJs separados por vírgula, até 20, com ou sem pontuação.
   */
  cnpjs?: string;

  /**
   * Data final no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Itens por página.
   */
  limit?: number;

  /**
   * Número da página, a partir de 1.
   */
  page?: number;

  /**
   * Tipo de relatório.
   */
  reportType?: 'trimestral' | 'quadrimestral';

  /**
   * Campo usado na ordenação.
   */
  sortBy?: string;

  /**
   * Ordem crescente (`asc`) ou decrescente (`desc`).
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD.
   */
  startDate?: string;

  /**
   * Tickers separados por vírgula, até 20. Ex.: JURO11,XPCA11.
   */
  symbols?: string;
}

export declare namespace Fip {
  export { type FipReportsResponse as FipReportsResponse, type FipReportsParams as FipReportsParams };
}
