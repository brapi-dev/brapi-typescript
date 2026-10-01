// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FundsAPI from './funds';
import * as FiagroAPI from './fiagro';
import {
  Fiagro,
  FiagroPortfolioParams,
  FiagroPortfolioResponse,
  FiagroReportsParams,
  FiagroReportsResponse,
} from './fiagro';
import * as FidcAPI from './fidc';
import {
  Fidc,
  FidcPortfolioParams,
  FidcPortfolioResponse,
  FidcReportsParams,
  FidcReportsResponse,
} from './fidc';
import * as FipAPI from './fip';
import { Fip, FipReportsParams, FipReportsResponse } from './fip';
import * as NavAPI from './nav';
import { Nav, NavHistoryParams, NavHistoryResponse } from './nav';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Descubra e consulte fundos brasileiros listados e estruturados, incluindo FIIs, FIAGROs, FI-Infra/FIFs, FIDCs e FIPs.
 */
export class Funds extends APIResource {
  nav: NavAPI.Nav = new NavAPI.Nav(this._client);
  fiagro: FiagroAPI.Fiagro = new FiagroAPI.Fiagro(this._client);
  fidc: FidcAPI.Fidc = new FidcAPI.Fidc(this._client);
  fip: FipAPI.Fip = new FipAPI.Fip(this._client);

  /**
   * Lista fundos brasileiros com dados disponíveis: FII, FIAGRO, FI-Infra, FIF,
   * FIDC, FIP e outros. Cada item traz ticker, CNPJ, tipo, classificações,
   * administrador, gestor e os últimos indicadores disponíveis.
   *
   * A lista ainda não inclui ETFs. Consulte suas cotações e preços históricos nos
   * endpoints de ações. A presença no catálogo de tickers não garante indicadores de
   * fundos.
   *
   * Confira a data em `updatedAt`. Os indicadores não têm a mesma frequência das
   * cotações.
   *
   * Use para descobrir o tipo de um fundo, achar um CNPJ ou filtrar fundos por tipo.
   *
   * Busque por `symbols`, `cnpjs` ou `search`. O `search` procura no ticker, no
   * nome, na razão social, no ISIN e no CNPJ.
   *
   * Os tipos `fiinfra` e `fiagro` equivalem a `fi-infra` e `fi-agro` no catálogo de
   * tickers.
   *
   * Nem todo ticker terminado em 11 é FII. `JURO11` é FI-Infra e não responde nos
   * [endpoints de FIIs](https://brapi.dev/docs/fiis).
   *
   * `sortBy` aceita `symbol`, `name`, `assetType`, `price`, `navPerShare`,
   * `priceToNav`, `totalInvestors` e `updatedAt`. O padrão é `updatedAt`.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const funds = await client.v2.funds.list();
   * ```
   */
  list(
    query: FundListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FundListResponse> {
    return this._client.get('/api/v2/funds/list', { query, ...options });
  }

  /**
   * Dividendos e rendimentos de FIAGRO, FI-Infra, FIF, FIDC e FIP listados. Cada
   * evento traz data de declaração, data-com (`lastDatePrior`), data ex quando
   * existe, data de pagamento, valor por cota e rótulo.
   *
   * Use para calcular renda, montar calendários de pagamento e comparar rendimentos.
   *
   * Os filtros `startDate` e `endDate` usam `paymentDate`. Sem `symbols` e `cnpjs`,
   * a resposta traz todos os fundos.
   *
   * FIIs ficam em [dividendos de FIIs](https://brapi.dev/docs/fiis/dividendos). Um
   * ticker de FII neste endpoint retorna erro 400.
   *
   * O histórico começa no primeiro evento verificável de cada fundo. Não há data
   * inicial única. As fontes são documentos da CVM e comunicados de administradores
   * e gestores. Eventos de tickers antigos continuam depois de um renome. A brapi
   * não estima datas de pagamento. A revisão é mensal.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.dividends();
   * ```
   */
  dividends(
    query: FundDividendsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FundDividendsResponse> {
    return this._client.get('/api/v2/funds/dividends', { query, ...options });
  }

  /**
   * Indicadores mais recentes de um ou mais fundos: preço de mercado, valor
   * patrimonial por cota (`navPerShare`), a razão entre os dois, patrimônio, ativos
   * e número de cotistas.
   *
   * Use para comparar preço e valor patrimonial, medir ágio ou deságio e ver o
   * tamanho do fundo.
   *
   * Informe `symbols` ou `cnpjs`. Se você não tem o identificador, use a
   * [lista de fundos](https://brapi.dev/docs/fundos/listagem).
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.indicators();
   * ```
   */
  indicators(
    query: FundIndicatorsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FundIndicatorsResponse> {
    return this._client.get('/api/v2/funds/indicators', { query, ...options });
  }

  /**
   * Carteira de fundos FI e FIF, do arquivo CDA da CVM. As posições vêm agrupadas em
   * títulos públicos, cotas de fundos, crédito privado, ativos listados, recebíveis
   * e valores a pagar.
   *
   * Use para ver onde o fundo investe e qual o peso de cada grupo de ativos.
   *
   * Informe `symbols` ou `cnpjs`. Sem `referenceDate`, a resposta traz a carteira
   * mais recente.
   *
   * Filtre os grupos com `include`: `publicBonds`, `fundHoldings`, `creditAssets`,
   * `listedSecurities`, `receivables` e `payables`.
   *
   * Posições confidenciais aparecem só no total, em `confidentialSummary`.
   *
   * A CVM publica o CDA com meses de atraso. Mostre `referenceDate` junto do dado.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.portfolio();
   * ```
   */
  portfolio(
    query: FundPortfolioParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FundPortfolioResponse> {
    return this._client.get('/api/v2/funds/portfolio', { query, ...options });
  }

  /**
   * Perfil mensal de fundos FI e FIF, conforme a CVM: distribuição de cotistas,
   * medidas de risco, liquidez, concentração e exposição a crédito privado.
   *
   * Use para ver se o fundo é de varejo ou institucional e quanto do patrimônio está
   * em ativos de baixa liquidez.
   *
   * Informe `symbols` ou `cnpjs`. Sem filtro de data, a resposta traz o perfil mais
   * recente de cada fundo.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.profile();
   * ```
   */
  profile(
    query: FundProfileParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FundProfileResponse> {
    return this._client.get('/api/v2/funds/profile', { query, ...options });
  }
}

export interface FundHolding {
  assetName: string | null;

  assetType: string | null;

  bucket: string;

  confidential: boolean;

  costValue: number | null;

  details: FundHolding.Details | null;

  isin: string | null;

  issuerCnpj: string | null;

  issuerName: string | null;

  marketValue: number | null;

  maturityDate: string | null;

  quantity: number | null;

  selicCode: string | null;
}

export namespace FundHolding {
  export interface Details {
    applicationType?: string;

    assetCode?: string;

    confidentialUntil?: string;

    fundClassType?: string;

    issueDate?: string;

    issuerType?: string;

    negotiationType?: string;

    purchasedQuantity?: number;

    purchaseValue?: number;

    relatedIssuer?: boolean;

    saleValue?: number;

    soldQuantity?: number;

    subclassId?: string;
  }
}

export interface FundPaginationMeta {
  hasNextPage: boolean;

  limit: number;

  page: number;

  totalItems: number;

  totalPages: number;
}

export interface FundListResponse {
  funds: Array<FundListResponse.Fund>;

  pagination: FundPaginationMeta;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FundListResponse {
  export interface Fund {
    administratorCnpj: string | null;

    administratorName: string | null;

    anbimaClassification: string | null;

    assetType: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other';

    b3Classification: string | null;

    cnpj: string;

    cvmClassification: string | null;

    cvmClassType: string | null;

    equity: number | null;

    formattedCnpj: string | null;

    isin: string | null;

    legalName: string | null;

    managerCnpj: string | null;

    managerName: string | null;

    name: string | null;

    navPerShare: number | null;

    price: number | null;

    priceToNav: number | null;

    status: string | null;

    symbol: string | null;

    totalAssets: number | null;

    totalInvestors: number | null;

    updatedAt: string | null;
  }
}

export interface FundDividendsResponse {
  dividends: Array<FundDividendsResponse.Dividend>;

  pagination: FundPaginationMeta;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FundDividendsResponse {
  export interface Dividend {
    assetType: 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'other';

    cnpj: string;

    declaredDate: string;

    exDate: string | null;

    isinCode: string | null;

    label: string;

    lastDatePrior: string;

    paymentDate: string;

    rate: number;

    symbol: string;
  }
}

export interface FundIndicatorsResponse {
  funds: Array<FundIndicatorsResponse.Fund>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FundIndicatorsResponse {
  export interface Fund {
    asOfDate: string | null;

    assetType: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other';

    cnpj: string;

    dailyApplications: number | null;

    dailyRedemptions: number | null;

    dividendYieldMonthly: number | null;

    equity: number | null;

    monthlyReturn: number | null;

    name: string | null;

    navPerShare: number | null;

    patrimonialMonthlyReturn: number | null;

    price: number | null;

    priceToNav: number | null;

    sharesOutstanding: number | null;

    symbol: string | null;

    totalAssets: number | null;

    totalInvestors: number | null;
  }
}

export interface FundPortfolioResponse {
  funds: Array<FundPortfolioResponse.Fund>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FundPortfolioResponse {
  export interface Fund {
    cnpj: string;

    confidentialSummary: { [key: string]: unknown } | null;

    creditAssets: Array<FundsAPI.FundHolding>;

    fundHoldings: Array<FundsAPI.FundHolding>;

    listedSecurities: Array<FundsAPI.FundHolding>;

    name: string | null;

    payables: Array<FundsAPI.FundHolding>;

    publicBonds: Array<FundsAPI.FundHolding>;

    receivables: Array<FundsAPI.FundHolding>;

    referenceDate: string;

    summary: { [key: string]: unknown };

    symbol: string | null;
  }
}

export interface FundProfileResponse {
  profiles: Array<FundProfileResponse.Profile>;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FundProfileResponse {
  export interface Profile {
    cnpj: string;

    concentration: { [key: string]: unknown } | null;

    investorBreakdown: { [key: string]: unknown } | null;

    liquidity: { [key: string]: unknown } | null;

    privateCredit: { [key: string]: unknown } | null;

    referenceDate: string;

    risk: { [key: string]: unknown } | null;

    symbol: string | null;
  }
}

export interface FundListParams {
  /**
   * Tipo do fundo.
   */
  assetType?: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other';

  /**
   * CNPJs separados por vírgula, até 20, com ou sem pontuação.
   */
  cnpjs?: string;

  /**
   * Itens por página.
   */
  limit?: number;

  /**
   * Número da página, a partir de 1.
   */
  page?: number;

  /**
   * Texto buscado no ticker, nome, razão social, ISIN ou CNPJ.
   */
  search?: string;

  /**
   * Campo usado na ordenação.
   */
  sortBy?: string;

  /**
   * Ordem crescente (`asc`) ou decrescente (`desc`).
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Situação do fundo no cadastro.
   */
  status?: string;

  /**
   * Tickers separados por vírgula, até 20. Ex.: JURO11,XPCA11.
   */
  symbols?: string;
}

export interface FundDividendsParams {
  /**
   * Tipo do fundo.
   */
  assetType?: 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'other';

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
   * Campo usado na ordenação.
   */
  sortBy?: 'lastDatePrior' | 'paymentDate' | 'declaredDate' | 'symbol' | 'rate';

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

export interface FundIndicatorsParams {
  /**
   * Tipo do fundo.
   */
  assetType?: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other';

  /**
   * CNPJs separados por vírgula, até 20, com ou sem pontuação.
   */
  cnpjs?: string;

  /**
   * Tickers separados por vírgula, até 20. Ex.: JURO11,XPCA11.
   */
  symbols?: string;
}

export interface FundPortfolioParams {
  /**
   * CNPJs separados por vírgula, até 20, com ou sem pontuação.
   */
  cnpjs?: string;

  /**
   * Grupos de ativos separados por vírgula. Ex.: publicBonds,creditAssets.
   */
  include?: string;

  /**
   * Itens por página.
   */
  limit?: number;

  /**
   * Número da página, a partir de 1.
   */
  page?: number;

  /**
   * Mês de referência no formato YYYY-MM-DD.
   */
  referenceDate?: string;

  /**
   * Tickers separados por vírgula, até 20. Ex.: JURO11,XPCA11.
   */
  symbols?: string;
}

export interface FundProfileParams {
  /**
   * CNPJs separados por vírgula, até 20, com ou sem pontuação.
   */
  cnpjs?: string;

  /**
   * Data final no formato YYYY-MM-DD.
   */
  endDate?: string;

  include?: string;

  /**
   * Mês de referência no formato YYYY-MM-DD.
   */
  referenceDate?: string;

  /**
   * Data inicial no formato YYYY-MM-DD.
   */
  startDate?: string;

  /**
   * Tickers separados por vírgula, até 20. Ex.: JURO11,XPCA11.
   */
  symbols?: string;
}

Funds.Nav = Nav;
Funds.Fiagro = Fiagro;
Funds.Fidc = Fidc;
Funds.Fip = Fip;

export declare namespace Funds {
  export {
    type FundHolding as FundHolding,
    type FundPaginationMeta as FundPaginationMeta,
    type FundListResponse as FundListResponse,
    type FundDividendsResponse as FundDividendsResponse,
    type FundIndicatorsResponse as FundIndicatorsResponse,
    type FundPortfolioResponse as FundPortfolioResponse,
    type FundProfileResponse as FundProfileResponse,
    type FundListParams as FundListParams,
    type FundDividendsParams as FundDividendsParams,
    type FundIndicatorsParams as FundIndicatorsParams,
    type FundPortfolioParams as FundPortfolioParams,
    type FundProfileParams as FundProfileParams,
  };

  export {
    Nav as Nav,
    type NavHistoryResponse as NavHistoryResponse,
    type NavHistoryParams as NavHistoryParams,
  };

  export {
    Fiagro as Fiagro,
    type FiagroPortfolioResponse as FiagroPortfolioResponse,
    type FiagroReportsResponse as FiagroReportsResponse,
    type FiagroPortfolioParams as FiagroPortfolioParams,
    type FiagroReportsParams as FiagroReportsParams,
  };

  export {
    Fidc as Fidc,
    type FidcPortfolioResponse as FidcPortfolioResponse,
    type FidcReportsResponse as FidcReportsResponse,
    type FidcPortfolioParams as FidcPortfolioParams,
    type FidcReportsParams as FidcReportsParams,
  };

  export {
    Fip as Fip,
    type FipReportsResponse as FipReportsResponse,
    type FipReportsParams as FipReportsParams,
  };
}
