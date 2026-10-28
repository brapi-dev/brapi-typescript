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
   * Para ETFs, `etfCategory` separa renda fixa, renda variável, criptoativos e
   * imobiliário. Consulte cotações e preços históricos nos endpoints de ações. A
   * presença no catálogo de tickers não garante indicadores de fundos.
   *
   * `updatedAt` informa a atualização do cadastro. `priceDate` informa a data do
   * preço. Consulte `asOfDate` em `/api/v2/funds/indicators` para a data da cota e
   * do patrimônio. Os indicadores não têm a mesma frequência das cotações.
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
   * `priceDate` é a data do último fechamento. `asOfDate` é a data do informe com a
   * cota e o patrimônio, que costuma chegar dias depois do pregão.
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

  /**
   * Filtra e ordena os fundos negociados na B3 (FIIs, Fiagros, FI-Infra, ETFs, FIDCs
   * e FIPs) por preço, rendimentos, P/VP, liquidez, patrimônio e cotistas. Uma
   * chamada percorre todos os fundos.
   *
   * `assetType` escolhe o tipo de fundo. Para FIIs, `segmentType` separa tijolo,
   * papel, fundos de fundos e híbridos, e `segment` usa o segmento do cadastro da
   * CVM. Para ETFs, `etfCategory` separa renda fixa, renda variável, cripto e
   * imobiliário.
   *
   * Cada indicador aceita `{chave}Min` e `{chave}Max`. Os limites são inclusivos e
   * usam a mesma unidade da resposta: 10% é `0.1`. Um filtro remove os fundos sem o
   * dado. Na ordenação, os nulos ficam no fim.
   *
   * Exemplos:
   *
   * - FIIs de papel com dividend yield de pelo menos 12% e P/VP até 0,95:
   *   `?assetType=fii&segmentType=papel&dividendYieldMin=0.12&priceToNavMax=0.95&sortBy=dividendYield`
   * - ETFs de renda fixa pela menor taxa:
   *   `?assetType=etf&etfCategory=fixed-income&sortBy=totalFeePercent&sortOrder=asc`
   *
   * `dividendYield` soma só os rendimentos dos últimos 12 meses pela data-com, sem
   * amortizações, e divide pelo último preço. `priceToNav` usa o último preço e o
   * valor patrimonial por cota do último informe. `averageDailyTradedValue` divide o
   * valor negociado nos últimos 30 dias pelos pregões do período.
   *
   * Plano Pro.
   *
   * | Indicador                  | Chave                     | Unidade                    |
   * | -------------------------- | ------------------------- | -------------------------- |
   * | Preço                      | `lastPrice`               | reais                      |
   * | Variação no dia            | `changePercent`           | porcentagem (2.81 = 2,81%) |
   * | Volume                     | `volume`                  | quantidade                 |
   * | Liquidez diária            | `averageDailyTradedValue` | reais                      |
   * | Valor de mercado           | `marketCap`               | reais                      |
   * | Dividend yield 12m         | `dividendYield`           | fração (0.06 = 6%)         |
   * | Último rendimento          | `lastDividend`            | reais                      |
   * | Yield do último rendimento | `lastDividendYield`       | fração (0.06 = 6%)         |
   * | Meses com rendimento       | `incomeMonths12m`         | quantidade                 |
   * | Valor patrimonial/cota     | `navPerShare`             | reais                      |
   * | P/VP                       | `priceToNav`              | múltiplo                   |
   * | Patrimônio líquido         | `equity`                  | reais                      |
   * | Cotistas                   | `totalInvestors`          | quantidade                 |
   * | Variação em 12 meses       | `priceChange12m`          | fração (0.06 = 6%)         |
   * | Taxa total                 | `totalFeePercent`         | porcentagem (2.81 = 2,81%) |
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.screener();
   * ```
   */
  screener(
    query: FundScreenerParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FundScreenerResponse> {
    return this._client.get('/api/v2/funds/screener', { query, ...options });
  }

  /**
   * Filtra e ordena os fundos de investimento sem ticker na B3, identificados pelo
   * CNPJ, por rentabilidade, patrimônio, cotistas e captação. Uma chamada percorre
   * todos os fundos.
   *
   * Entram só os fundos sem ticker na B3, com situação "Em Funcionamento Normal" na
   * CVM, que enviaram o informe diário nos últimos 20 dias. Para os fundos
   * negociados na bolsa, use `/api/v2/funds/screener`.
   *
   * Os dados vêm do informe diário que os fundos enviam à CVM. Ele costuma chegar
   * com 1 a 3 dias úteis de atraso: `navDate` mostra a data do último informe de
   * cada fundo.
   *
   * As rentabilidades são a variação da cota: brutas de imposto de renda e líquidas
   * de taxas. Uma rentabilidade é nula quando falta a cota inicial ou quando a cota
   * muda mais de 10 vezes no período, o que indica desdobramento ou grupamento de
   * cotas.
   *
   * `search` busca no nome e na razão social. Números, com ou sem pontuação, buscam
   * o início do CNPJ. `classification` usa a classe da CVM, `anbimaClassification`
   * busca parte da classificação ANBIMA e `manager` busca parte do nome do gestor.
   *
   * Cada indicador aceita `{chave}Min` e `{chave}Max`. Os limites são inclusivos e
   * usam a mesma unidade da resposta: 10% é `0.1`. Um filtro remove os fundos sem o
   * dado. Na ordenação, os nulos ficam no fim.
   *
   * Exemplos:
   *
   * - Fundos de previdência de renda fixa pela maior rentabilidade em 12 meses:
   *   `?classification=renda-fixa&anbimaClassification=Previdência&sortBy=return12m`
   * - Multimercados com pelo menos R$ 100 milhões e 1.000 cotistas:
   *   `?classification=multimercado&equityMin=100000000&totalInvestorsMin=1000`
   * - Fundos cujo CNPJ começa com 12.345.678: `?search=12.345.678`
   *
   * Plano Pro.
   *
   * | Indicador                 | Chave            | Unidade            |
   * | ------------------------- | ---------------- | ------------------ |
   * | Valor da cota             | `navPerShare`    | reais              |
   * | Variação no dia           | `returnDay`      | fração (0.06 = 6%) |
   * | Rentabilidade em 1 mês    | `return1m`       | fração (0.06 = 6%) |
   * | Rentabilidade no ano      | `returnYtd`      | fração (0.06 = 6%) |
   * | Rentabilidade em 12 meses | `return12m`      | fração (0.06 = 6%) |
   * | Rentabilidade em 36 meses | `return36m`      | fração (0.06 = 6%) |
   * | Patrimônio líquido        | `equity`         | reais              |
   * | Cotistas                  | `totalInvestors` | quantidade         |
   * | Captação líquida em 1 mês | `netFlow1m`      | reais              |
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.screenerCnpj();
   * ```
   */
  screenerCnpj(
    query: FundScreenerCnpjParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FundScreenerCnpjResponse> {
    return this._client.get('/api/v2/funds/screener/cnpj', { query, ...options });
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

    /**
     * Categoria do ETF pela lista de ETFs da bolsa: `fixed-income` (renda fixa),
     * `equity` (renda variável), `crypto` (criptoativos) ou `real-estate`
     * (imobiliário). É `null` para fundos que não são ETF e para ETFs que nenhuma
     * lista da bolsa traz.
     */
    etfCategory: 'fixed-income' | 'equity' | 'crypto' | 'real-estate' | null;

    /**
     * Taxas do regulamento mais recente do fundo que as informa. Por enquanto, só para
     * ETFs.
     */
    fees: Fund.Fees | null;

    formattedCnpj: string | null;

    isin: string | null;

    legalName: string | null;

    managerCnpj: string | null;

    managerName: string | null;

    name: string | null;

    navPerShare: number | null;

    price: number | null;

    /**
     * Data do preço de fechamento usado em `price` e `priceToNav`.
     */
    priceDate: string | null;

    priceToNav: number | null;

    status: string | null;

    symbol: string | null;

    totalAssets: number | null;

    totalInvestors: number | null;

    updatedAt: string | null;
  }

  export namespace Fund {
    /**
     * Taxas do regulamento mais recente do fundo que as informa. Por enquanto, só para
     * ETFs.
     */
    export interface Fees {
      adminFeePercent: number | null;

      /**
       * Condições da taxa, como valor mínimo mensal ou faixas por patrimônio.
       */
      conditions: string | null;

      custodyMaxFeePercent: number | null;

      /**
       * Data de entrega do regulamento com esta taxa.
       */
      effectiveDate: string;

      managementFeePercent: number | null;

      performanceFee: string | null;

      /**
       * Taxa total ao ano, em percentual (0.2 = 0,20% a.a.). Quando o regulamento
       * informa só as taxas de administração e de gestão, é a soma delas.
       */
      totalFeePercent: number | null;
    }
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
    /**
     * Data do informe com a cota e o patrimônio. Pode ser anterior a `priceDate`.
     */
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

    /**
     * Data do preço de fechamento usado em `price` e `priceToNav`.
     */
    priceDate: string | null;

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

export interface FundScreenerResponse {
  pagination: FundScreenerResponse.Pagination;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<FundScreenerResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FundScreenerResponse {
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

    fund: Result.Fund;

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
     * Indicadores do fundo.
     */
    metrics: Result.Metrics;

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
    export interface Fund {
      administratorName: string | null;

      cnpj: string;

      /**
       * Categoria do ETF. Nulo para os outros fundos.
       */
      etfCategory: 'fixed-income' | 'equity' | 'crypto' | 'real-estate' | null;

      /**
       * Data-com do último rendimento dos últimos 12 meses (AAAA-MM-DD).
       */
      lastDividendDate: string | null;

      /**
       * Tipo de gestão do FII: Ativa ou Passiva.
       */
      managementType: string | null;

      managerName: string | null;

      /**
       * Mandato do FII no cadastro da CVM.
       */
      mandate: string | null;

      /**
       * Data do informe de onde vêm patrimônio, valor patrimonial por cota e cotistas
       * (AAAA-MM-DD).
       */
      reportDate: string | null;

      /**
       * Segmento do FII no cadastro da CVM.
       */
      segment: string | null;

      /**
       * Tipo do FII: tijolo, papel, fof ou hibrido.
       */
      segmentType: string | null;

      /**
       * Tipo do fundo: fii, fiagro, fiinfra, etf, fidc, fip ou fif.
       */
      type: string;
    }

    /**
     * Indicadores do fundo.
     */
    export interface Metrics {
      /**
       * Liquidez diária. Média do valor negociado por pregão nos últimos 30 dias, em
       * reais. Dias sem negócio contam como zero. Unidade: reais. Nulo quando não há
       * dado.
       */
      averageDailyTradedValue: number | null;

      /**
       * Dividend yield 12m. Rendimentos dos últimos 12 meses, pela data-com, sobre o
       * último preço, em fração (0.1 = 10%). Não soma amortizações. Nulo quando o fundo
       * não pagou rendimentos. Unidade: fração (0.06 = 6%). Nulo quando não há dado.
       */
      dividendYield: number | null;

      /**
       * Patrimônio líquido. Patrimônio líquido do último informe, em reais. Unidade:
       * reais. Nulo quando não há dado.
       */
      equity: number | null;

      /**
       * Meses com rendimento. Quantos dos últimos 12 meses tiveram rendimento, pela
       * data-com. Mede a regularidade dos pagamentos. Unidade: quantidade. Nulo quando
       * não há dado.
       */
      incomeMonths12m: number | null;

      /**
       * Último rendimento. Valor por cota do último rendimento, pela data-com, em reais.
       * Unidade: reais. Nulo quando não há dado.
       */
      lastDividend: number | null;

      /**
       * Yield do último rendimento. Último rendimento sobre o último preço, em fração
       * (0.008 = 0,8%). Unidade: fração (0.06 = 6%). Nulo quando não há dado.
       */
      lastDividendYield: number | null;

      /**
       * Valor de mercado. Último preço vezes as cotas emitidas do último informe, em
       * reais. Unidade: reais. Nulo quando não há dado.
       */
      marketCap: number | null;

      /**
       * Valor patrimonial/cota. Valor patrimonial por cota do último informe, em reais.
       * Nulo quando o informe não fecha com o patrimônio e o número de cotas. Unidade:
       * reais. Nulo quando não há dado.
       */
      navPerShare: number | null;

      /**
       * Variação em 12 meses. Último preço sobre o fechamento de 12 meses atrás, em
       * fração (0.05 = 5%). Não soma os rendimentos. Unidade: fração (0.06 = 6%). Nulo
       * quando não há dado.
       */
      priceChange12m: number | null;

      /**
       * P/VP. Último preço sobre o valor patrimonial por cota do último informe.
       * Unidade: múltiplo. Nulo quando não há dado.
       */
      priceToNav: number | null;

      /**
       * Taxa total. Taxa total ao ano do regulamento mais recente, em percentual (0.2 =
       * 0,20% a.a.). Por enquanto, só ETFs. Unidade: porcentagem (2.81 = 2,81%). Nulo
       * quando não há dado.
       */
      totalFeePercent: number | null;

      /**
       * Cotistas. Número de cotistas do último informe. Unidade: quantidade. Nulo quando
       * não há dado.
       */
      totalInvestors: number | null;
    }

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

export interface FundScreenerCnpjResponse {
  pagination: FundScreenerCnpjResponse.Pagination;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<FundScreenerCnpjResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace FundScreenerCnpjResponse {
  export interface Pagination {
    hasNextPage: boolean;

    limit: number;

    page: number;

    totalItems: number;

    totalPages: number;
  }

  export interface Result {
    administratorName: string | null;

    /**
     * Classificação ANBIMA do fundo.
     */
    anbimaClassification: string | null;

    /**
     * Tipo do fundo no cadastro, como fif (fundo de investimento financeiro) ou fidc.
     */
    assetType: string;

    /**
     * Classe do fundo na CVM: Renda Fixa, Multimercado, Ações, Cambial ou FMP-FGTS.
     */
    classification: string | null;

    /**
     * CNPJ do fundo, só os 14 dígitos.
     */
    cnpj: string;

    formattedCnpj: string;

    /**
     * Razão social do fundo no cadastro da CVM.
     */
    legalName: string | null;

    managerName: string | null;

    /**
     * Indicadores do fundo pelo último informe diário.
     */
    metrics: Result.Metrics;

    /**
     * Nome do fundo.
     */
    name: string | null;

    /**
     * Data do último informe diário, de onde vêm os indicadores (AAAA-MM-DD).
     */
    navDate: string;
  }

  export namespace Result {
    /**
     * Indicadores do fundo pelo último informe diário.
     */
    export interface Metrics {
      /**
       * Patrimônio líquido. Patrimônio líquido no último informe diário, em reais.
       * Unidade: reais. Nulo quando não há dado.
       */
      equity: number | null;

      /**
       * Valor da cota. Valor da cota no último informe diário, em reais. Unidade: reais.
       * Nulo quando não há dado.
       */
      navPerShare: number | null;

      /**
       * Captação líquida em 1 mês. Aplicações menos resgates em 1 mês, em reais.
       * Negativa quando saiu mais dinheiro do que entrou. Unidade: reais. Nulo quando
       * não há dado.
       */
      netFlow1m: number | null;

      /**
       * Rentabilidade em 12 meses. Variação da cota em 12 meses, em fração. Unidade:
       * fração (0.06 = 6%). Nulo quando não há dado.
       */
      return12m: number | null;

      /**
       * Rentabilidade em 1 mês. Variação da cota em 1 mês, em fração. Nula quando a cota
       * muda mais de 10 vezes no período (desdobramento ou grupamento). Unidade: fração
       * (0.06 = 6%). Nulo quando não há dado.
       */
      return1m: number | null;

      /**
       * Rentabilidade em 36 meses. Variação da cota em 36 meses, em fração. Unidade:
       * fração (0.06 = 6%). Nulo quando não há dado.
       */
      return36m: number | null;

      /**
       * Variação no dia. Variação da cota desde o informe anterior, em fração (0.0074 =
       * 0,74%). Unidade: fração (0.06 = 6%). Nulo quando não há dado.
       */
      returnDay: number | null;

      /**
       * Rentabilidade no ano. Variação da cota desde o último informe do ano anterior,
       * em fração. Unidade: fração (0.06 = 6%). Nulo quando não há dado.
       */
      returnYtd: number | null;

      /**
       * Cotistas. Número de cotistas no último informe diário. Unidade: quantidade. Nulo
       * quando não há dado.
       */
      totalInvestors: number | null;
    }
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
   * Categoria do ETF. Só traz ETFs.
   */
  etfCategory?: 'fixed-income' | 'equity' | 'crypto' | 'real-estate';

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

export interface FundScreenerParams {
  /**
   * Tipo do fundo: fii, fiagro, fiinfra, etf, fidc, fip ou fif. Sem ele, todos os
   * fundos listados.
   */
  assetType?: 'fii' | 'fiagro' | 'fiinfra' | 'etf' | 'fidc' | 'fip' | 'fif';

  /**
   * Liquidez diária: valor máximo, inclusive. Unidade: reais.
   */
  averageDailyTradedValueMax?: number;

  /**
   * Liquidez diária: valor mínimo, inclusive. Unidade: reais.
   */
  averageDailyTradedValueMin?: number;

  /**
   * Variação no dia: valor máximo, inclusive. Unidade: porcentagem (2.81 = 2,81%).
   */
  changePercentMax?: number;

  /**
   * Variação no dia: valor mínimo, inclusive. Unidade: porcentagem (2.81 = 2,81%).
   */
  changePercentMin?: number;

  /**
   * Dividend yield 12m: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   */
  dividendYieldMax?: number;

  /**
   * Dividend yield 12m: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   */
  dividendYieldMin?: number;

  /**
   * Patrimônio líquido: valor máximo, inclusive. Unidade: reais.
   */
  equityMax?: number;

  /**
   * Patrimônio líquido: valor mínimo, inclusive. Unidade: reais.
   */
  equityMin?: number;

  /**
   * Categoria do ETF pela lista da bolsa: fixed-income, equity, crypto ou
   * real-estate.
   */
  etfCategory?: 'fixed-income' | 'equity' | 'crypto' | 'real-estate';

  /**
   * Meses com rendimento: valor máximo, inclusive. Unidade: quantidade.
   */
  incomeMonths12mMax?: number;

  /**
   * Meses com rendimento: valor mínimo, inclusive. Unidade: quantidade.
   */
  incomeMonths12mMin?: number;

  /**
   * Último rendimento: valor máximo, inclusive. Unidade: reais.
   */
  lastDividendMax?: number;

  /**
   * Último rendimento: valor mínimo, inclusive. Unidade: reais.
   */
  lastDividendMin?: number;

  /**
   * Yield do último rendimento: valor máximo, inclusive. Unidade: fração (0.06 =
   * 6%).
   */
  lastDividendYieldMax?: number;

  /**
   * Yield do último rendimento: valor mínimo, inclusive. Unidade: fração (0.06 =
   * 6%).
   */
  lastDividendYieldMin?: number;

  /**
   * Preço: valor máximo, inclusive. Unidade: reais.
   */
  lastPriceMax?: number;

  /**
   * Preço: valor mínimo, inclusive. Unidade: reais.
   */
  lastPriceMin?: number;

  /**
   * Itens por página. Máximo: 200.
   */
  limit?: number;

  /**
   * Valor de mercado: valor máximo, inclusive. Unidade: reais.
   */
  marketCapMax?: number;

  /**
   * Valor de mercado: valor mínimo, inclusive. Unidade: reais.
   */
  marketCapMin?: number;

  /**
   * Valor patrimonial/cota: valor máximo, inclusive. Unidade: reais.
   */
  navPerShareMax?: number;

  /**
   * Valor patrimonial/cota: valor mínimo, inclusive. Unidade: reais.
   */
  navPerShareMin?: number;

  /**
   * Número da página. Começa em 1.
   */
  page?: number;

  /**
   * Variação em 12 meses: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   */
  priceChange12mMax?: number;

  /**
   * Variação em 12 meses: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   */
  priceChange12mMin?: number;

  /**
   * P/VP: valor máximo, inclusive. Unidade: múltiplo.
   */
  priceToNavMax?: number;

  /**
   * P/VP: valor mínimo, inclusive. Unidade: múltiplo.
   */
  priceToNavMin?: number;

  /**
   * Parte do ticker ou do nome do fundo.
   */
  search?: string;

  /**
   * Segmento do FII no cadastro da CVM, como Logística, Shoppings, Escritórios ou
   * Títulos e Val. Mob. Nome exato, sem diferença de maiúsculas.
   */
  segment?: string;

  /**
   * Tipo do FII pelo último informe: tijolo (imóveis), papel (CRI, LCI e títulos),
   * fof (cotas de outros FIIs) ou hibrido.
   */
  segmentType?: 'tijolo' | 'papel' | 'hibrido' | 'fof';

  /**
   * Campo de ordenação: uma chave de métrica, `symbol` ou `name`. Padrão:
   * `averageDailyTradedValue`. Valores nulos ficam no fim.
   */
  sortBy?:
    | 'symbol'
    | 'name'
    | 'lastPrice'
    | 'changePercent'
    | 'volume'
    | 'averageDailyTradedValue'
    | 'marketCap'
    | 'dividendYield'
    | 'lastDividend'
    | 'lastDividendYield'
    | 'incomeMonths12m'
    | 'navPerShare'
    | 'priceToNav'
    | 'equity'
    | 'totalInvestors'
    | 'priceChange12m'
    | 'totalFeePercent';

  /**
   * Ordem. Padrão: `desc`.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Taxa total: valor máximo, inclusive. Unidade: porcentagem (2.81 = 2,81%).
   */
  totalFeePercentMax?: number;

  /**
   * Taxa total: valor mínimo, inclusive. Unidade: porcentagem (2.81 = 2,81%).
   */
  totalFeePercentMin?: number;

  /**
   * Cotistas: valor máximo, inclusive. Unidade: quantidade.
   */
  totalInvestorsMax?: number;

  /**
   * Cotistas: valor mínimo, inclusive. Unidade: quantidade.
   */
  totalInvestorsMin?: number;

  /**
   * Volume: valor máximo, inclusive. Unidade: quantidade.
   */
  volumeMax?: number;

  /**
   * Volume: valor mínimo, inclusive. Unidade: quantidade.
   */
  volumeMin?: number;
}

export interface FundScreenerCnpjParams {
  /**
   * Parte da classificação ANBIMA, sem diferença de maiúsculas e acentos. Exemplos:
   * Previdência, Exterior, Crédito Livre.
   */
  anbimaClassification?: string;

  /**
   * Classe do fundo na CVM: renda-fixa, multimercado, acoes, cambial ou fmp-fgts.
   */
  classification?: 'renda-fixa' | 'multimercado' | 'acoes' | 'cambial' | 'fmp-fgts';

  /**
   * Patrimônio líquido: valor máximo, inclusive. Unidade: reais.
   */
  equityMax?: number;

  /**
   * Patrimônio líquido: valor mínimo, inclusive. Unidade: reais.
   */
  equityMin?: number;

  /**
   * Itens por página. Máximo: 200.
   */
  limit?: number;

  /**
   * Parte do nome do gestor, sem diferença de maiúsculas e acentos.
   */
  manager?: string;

  /**
   * Valor da cota: valor máximo, inclusive. Unidade: reais.
   */
  navPerShareMax?: number;

  /**
   * Valor da cota: valor mínimo, inclusive. Unidade: reais.
   */
  navPerShareMin?: number;

  /**
   * Captação líquida em 1 mês: valor máximo, inclusive. Unidade: reais.
   */
  netFlow1mMax?: number;

  /**
   * Captação líquida em 1 mês: valor mínimo, inclusive. Unidade: reais.
   */
  netFlow1mMin?: number;

  /**
   * Número da página. Começa em 1.
   */
  page?: number;

  /**
   * Rentabilidade em 12 meses: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   */
  return12mMax?: number;

  /**
   * Rentabilidade em 12 meses: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   */
  return12mMin?: number;

  /**
   * Rentabilidade em 1 mês: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   */
  return1mMax?: number;

  /**
   * Rentabilidade em 1 mês: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   */
  return1mMin?: number;

  /**
   * Rentabilidade em 36 meses: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   */
  return36mMax?: number;

  /**
   * Rentabilidade em 36 meses: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   */
  return36mMin?: number;

  /**
   * Variação no dia: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   */
  returnDayMax?: number;

  /**
   * Variação no dia: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   */
  returnDayMin?: number;

  /**
   * Rentabilidade no ano: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   */
  returnYtdMax?: number;

  /**
   * Rentabilidade no ano: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   */
  returnYtdMin?: number;

  /**
   * Parte do nome ou da razão social do fundo, sem diferença de maiúsculas e
   * acentos. Números, com ou sem pontuação, buscam o início do CNPJ.
   */
  search?: string;

  /**
   * Campo de ordenação: uma chave de indicador, `name` ou `cnpj`. Padrão: `equity`.
   * Valores nulos ficam no fim.
   */
  sortBy?:
    | 'name'
    | 'cnpj'
    | 'navPerShare'
    | 'returnDay'
    | 'return1m'
    | 'returnYtd'
    | 'return12m'
    | 'return36m'
    | 'equity'
    | 'totalInvestors'
    | 'netFlow1m';

  /**
   * Ordem. Padrão: `desc`.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Cotistas: valor máximo, inclusive. Unidade: quantidade.
   */
  totalInvestorsMax?: number;

  /**
   * Cotistas: valor mínimo, inclusive. Unidade: quantidade.
   */
  totalInvestorsMin?: number;
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
    type FundScreenerResponse as FundScreenerResponse,
    type FundScreenerCnpjResponse as FundScreenerCnpjResponse,
    type FundListParams as FundListParams,
    type FundDividendsParams as FundDividendsParams,
    type FundIndicatorsParams as FundIndicatorsParams,
    type FundPortfolioParams as FundPortfolioParams,
    type FundProfileParams as FundProfileParams,
    type FundScreenerParams as FundScreenerParams,
    type FundScreenerCnpjParams as FundScreenerCnpjParams,
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
