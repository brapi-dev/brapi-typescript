// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Descubra e consulte fundos brasileiros listados e estruturados, incluindo FIIs, FIAGROs, FI-Infra/FIFs, FIDCs e FIPs.
 */
export class Crowding extends APIResource {
  /**
   * Quanto dinheiro todos os fundos têm em cada empresa em um mês, e o saldo do mês:
   * quanto compraram menos quanto venderam. Os dados vêm da carteira mensal que os
   * fundos entregam à CVM.
   *
   * Use para ver as empresas onde os fundos mais concentram dinheiro, as que mais
   * compraram ou venderam no mês e o saldo de cada setor.
   *
   * Cada empresa junta as classes de ações, as units e os BDRs e ADRs dela. `value`
   * conta cada posição uma vez: as posições dos próprios fundos (`directValue`) e a
   * parte dos fundos do exterior, como os ETFs por trás dos BDRs de ETF, que os
   * fundos brasileiros têm (`foreignFundsValue`). Um fundo de fundos não soma de
   * novo o dinheiro dos fundos que ele tem.
   *
   * Os fundos entregam a carteira ao longo de semanas. Um fundo que ainda não
   * entregou a carteira do mês entra com a carteira do mês anterior
   * (`lateFilersValue`), porque a falta de um arquivo não é dinheiro que saiu. Sem
   * essa parte, `value` é o mesmo total de `summary.totalValue` em
   * `/api/v2/funds/holders` com `scope=all` e `issuer=true`.
   *
   * O saldo (`flowValue`) segue as regras de `change` em `/api/v2/funds/holders`: a
   * diferença de quantidade, ajustada por desdobramentos, grupamentos e
   * bonificações, vezes o preço do mês. Uma posição nova conta como compra e uma
   * posição zerada como venda. Um fundo que ainda não entregou a carteira do mês não
   * conta como venda. Um fundo sem carteira no mês anterior, ou com ações em
   * posições confidenciais em um dos dois meses, fica fora do saldo. Quando um
   * evento muda a quantidade de ações sem fator conhecido, `flowValue` vem `null`.
   *
   * `sectors` traz o dinheiro e o saldo de cada setor: `boughtValue` soma as
   * empresas com saldo de compra, `soldValue` as com saldo de venda.
   *
   * `summary` traz a concentração: a parte do dinheiro nas 5 e nas 10 maiores
   * empresas e o número efetivo de empresas. Posições confidenciais não entram em
   * nenhum total; `summary.confidentialEquityValue` mostra quanto dinheiro em ações
   * fica de fora.
   *
   * Só entram meses que a maioria dos fundos já entregou. A CVM publica a carteira
   * cerca de 10 dias depois do fim do mês.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const crowding = await client.v2.funds.crowding.retrieve();
   * ```
   */
  retrieve(
    query: CrowdingRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CrowdingRetrieveResponse> {
    return this._client.get('/api/v2/funds/crowding', { query, ...options });
  }

  /**
   * Para cada mês: quanto dinheiro todos os fundos têm em ações, a parte nas 5 e nas
   * 10 maiores empresas, o número efetivo de empresas e o saldo do mês. Os valores
   * seguem as regras de `/api/v2/funds/crowding`.
   *
   * Use para ver se o dinheiro dos fundos se concentra em poucas empresas ou se
   * espalha.
   *
   * `confidentialEquityValue` traz as ações em posições confidenciais, que não
   * entram nos totais.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.crowding.history();
   * ```
   */
  history(
    query: CrowdingHistoryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CrowdingHistoryResponse> {
    return this._client.get('/api/v2/funds/crowding/history', { query, ...options });
  }
}

export interface CrowdingRetrieveResponse {
  /**
   * Meses disponíveis, do mais recente ao mais antigo.
   */
  availableDates: Array<string>;

  companies: Array<CrowdingRetrieveResponse.Company>;

  pagination: CrowdingRetrieveResponse.Pagination;

  /**
   * Mês com que o saldo compara. `null` no primeiro mês.
   */
  previousReferenceDate: string | null;

  /**
   * Fim do mês das carteiras.
   */
  referenceDate: string | null;

  region: 'all' | 'brazil' | 'foreign';

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  sectors: Array<CrowdingRetrieveResponse.Sector>;

  summary: CrowdingRetrieveResponse.Summary | null;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace CrowdingRetrieveResponse {
  export interface Company {
    /**
     * Fundos com posição direta ou por meio de outros fundos.
     */
    allFundsCount: number;

    /**
     * Tickers da empresa na B3: ações, units e BDRs.
     */
    b3Symbols: Array<string>;

    /**
     * Fundos que compraram no mês.
     */
    buyersCount: number | null;

    /**
     * CNPJ, para uma empresa da B3.
     */
    cnpj: string | null;

    /**
     * País da empresa (ISO 3166-1 alfa-2).
     */
    country: string | null;

    /**
     * Posições dos próprios fundos: ações, units, BDRs e ações no exterior.
     */
    directValue: number;

    /**
     * Compras menos vendas dos fundos no mês, em reais, ao preço do mês. `null` quando
     * um evento muda a quantidade de ações sem fator conhecido.
     */
    flowValue: number | null;

    /**
     * A parte dos fundos do exterior (ETFs, BDRs de ETF) que os fundos brasileiros
     * têm.
     */
    foreignFundsValue: number;

    /**
     * Fundos com posição direta.
     */
    fundsCount: number;

    /**
     * A parte de `directValue` dos fundos que ainda não entregaram a carteira do mês:
     * a posição da carteira do mês anterior.
     */
    lateFilersValue: number;

    name: string | null;

    rank: number;

    /**
     * Setor, como na cotação do ticker.
     */
    sector: string | null;

    /**
     * Fundos que venderam no mês, inclusive os que zeraram a posição.
     */
    sellersCount: number | null;

    /**
     * Ticker na B3 com mais dinheiro dos fundos. Para uma empresa do exterior sem BDR,
     * o ticker no exterior.
     */
    symbol: string | null;

    /**
     * Dinheiro dos fundos na empresa, em reais: `directValue` + `foreignFundsValue`.
     * Cada posição conta uma vez.
     */
    value: number;

    /**
     * Parte de `summary.totalValue`, em %.
     */
    weightPercent: number | null;
  }

  export interface Pagination {
    hasNextPage: boolean;

    limit: number;

    page: number;

    totalItems: number;

    totalPages: number;
  }

  export interface Sector {
    /**
     * Soma do saldo das empresas do setor que os fundos compraram no mês.
     */
    boughtValue: number;

    companiesCount: number;

    /**
     * Saldo do setor no mês.
     */
    flowValue: number;

    sector: string;

    /**
     * Soma do saldo das empresas do setor que os fundos venderam no mês (negativo).
     */
    soldValue: number;

    /**
     * Dinheiro dos fundos no setor, em reais.
     */
    value: number;

    weightPercent: number | null;
  }

  export interface Summary {
    /**
     * Empresas com saldo de compra no mês.
     */
    boughtCompaniesCount: number | null;

    companiesCount: number;

    /**
     * Ações e BDRs em posições confidenciais de todos os fundos, em reais. Elas não
     * entram nos totais.
     */
    confidentialEquityValue: number;

    /**
     * Número efetivo de empresas: 1 dividido pela soma dos quadrados das partes. Dez
     * empresas do mesmo tamanho dão 10.
     */
    effectiveCompanies: number | null;

    /**
     * Saldo do mês de todas as empresas.
     */
    flowValue: number | null;

    /**
     * Fundos com carteira no mês.
     */
    fundsCount: number;

    /**
     * A parte de `totalValue` que vem da carteira do mês anterior dos fundos que ainda
     * não entregaram a do mês.
     */
    lateFilersValue: number;

    /**
     * Fundos com carteira no mês anterior que ainda não entregaram a do mês.
     */
    lateFundsCount: number;

    /**
     * Empresas com saldo de venda no mês.
     */
    soldCompaniesCount: number | null;

    /**
     * Parte do dinheiro nas 10 maiores empresas, em %.
     */
    top10WeightPercent: number | null;

    /**
     * Parte do dinheiro nas 5 maiores empresas, em %.
     */
    top5WeightPercent: number | null;

    /**
     * Dinheiro dos fundos em todas as empresas.
     */
    totalValue: number;
  }
}

export interface CrowdingHistoryResponse {
  months: Array<CrowdingHistoryResponse.Month>;

  region: 'all' | 'brazil' | 'foreign';

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace CrowdingHistoryResponse {
  export interface Month {
    companiesCount: number;

    /**
     * Ações e BDRs em posições confidenciais, que não entram.
     */
    confidentialEquityValue: number;

    effectiveCompanies: number | null;

    /**
     * Saldo do mês. `null` no primeiro mês.
     */
    flowValue: number | null;

    /**
     * Fundos com carteira no mês.
     */
    fundsCount: number;

    referenceDate: string;

    top10WeightPercent: number | null;

    top5WeightPercent: number | null;

    /**
     * Dinheiro dos fundos em todas as empresas.
     */
    totalValue: number;
  }
}

export interface CrowdingRetrieveParams {
  /**
   * Empresas por página. Padrão 20, máximo 500.
   */
  limit?: number;

  /**
   * Página, a partir de 1.
   */
  page?: number;

  /**
   * Data no formato YYYY-MM-DD. Traz o mês mais recente até esta data. Sem ela, traz
   * o mês mais recente que a maioria dos fundos já entregou.
   */
  referenceDate?: string;

  /**
   * `all` (padrão): todas as empresas. `brazil`: empresas da B3. `foreign`: empresas
   * do exterior, por BDRs, ações no exterior e fundos do exterior.
   */
  region?: 'all' | 'brazil' | 'foreign';

  /**
   * `value` (padrão): dinheiro dos fundos. `flow`: saldo do mês (com
   * `sortOrder=asc`, as maiores vendas). `funds`: número de fundos com posição
   * direta.
   */
  sortBy?: 'value' | 'flow' | 'funds';

  /**
   * Ordem: `desc` (padrão) ou `asc`.
   */
  sortOrder?: 'asc' | 'desc';
}

export interface CrowdingHistoryParams {
  /**
   * `all` (padrão): todas as empresas. `brazil`: empresas da B3. `foreign`: empresas
   * do exterior, por BDRs, ações no exterior e fundos do exterior.
   */
  region?: 'all' | 'brazil' | 'foreign';
}

export declare namespace Crowding {
  export {
    type CrowdingRetrieveResponse as CrowdingRetrieveResponse,
    type CrowdingHistoryResponse as CrowdingHistoryResponse,
    type CrowdingRetrieveParams as CrowdingRetrieveParams,
    type CrowdingHistoryParams as CrowdingHistoryParams,
  };
}
