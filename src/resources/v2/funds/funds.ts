// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FundsAPI from './funds';
import * as CrowdingAPI from './crowding';
import {
  Crowding,
  CrowdingHistoryParams,
  CrowdingHistoryResponse,
  CrowdingRetrieveParams,
  CrowdingRetrieveResponse,
} from './crowding';
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
import * as HoldingsAPI from './holdings';
import { HoldingHistoryParams, HoldingHistoryResponse, Holdings } from './holdings';
import * as NavAPI from './nav';
import { Nav, NavHistoryParams, NavHistoryResponse } from './nav';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Descubra e consulte fundos brasileiros listados e estruturados, incluindo FIIs, FIAGROs, FI-Infra/FIFs, FIDCs e FIPs.
 */
export class Funds extends APIResource {
  nav: NavAPI.Nav = new NavAPI.Nav(this._client);
  holdings: HoldingsAPI.Holdings = new HoldingsAPI.Holdings(this._client);
  crowding: CrowdingAPI.Crowding = new CrowdingAPI.Crowding(this._client);
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
   * Dividendos e rendimentos de ETFs, FIAGRO, FI-Infra, FIF, FIDC e FIP listados.
   * Cada evento traz data de declaração, data-com (`lastDatePrior`), data ex quando
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
   * A exposição final de uma carteira de ativos: cada item abre até os ativos
   * finais, e o resultado junta tudo por empresa, país, setor e classe de ativo.
   *
   * Use para saber quanto uma carteira tem, no total, em uma empresa (NVIDIA pelo
   * WRLD11, pelo IVVB11 e pelo NVDC34), em um país ou em um setor.
   *
   * Informe `positions` com até 200 itens: tickers de ações, units, BDRs, ETFs, BDRs
   * de ETF, ou CNPJs de fundos, cada um com o valor em reais (`PETR4:3000`) ou o
   * peso (`PETR4:30%`).
   *
   * Como cada item abre:
   *
   * - Fundo ou ETF brasileiro: pela carteira mensal do fundo, abrindo os fundos que
   *   ele tem, como em `/api/v2/funds/holdings`.
   * - BDR de ETF: pela carteira do ETF no exterior, dos relatórios públicos dos
   *   fundos. BDRs de ouro, prata e criptoativos viram o próprio ativo.
   * - Ação, unit ou BDR de empresa: a própria empresa. Uma ação direta soma com a
   *   mesma empresa dentro dos fundos.
   *
   * `companies` junta as classes de ações de uma empresa e os BDRs dela, quando a
   * ligação é conhecida. `paths` mostra quanto vem de cada item, até 10 itens;
   * `pathsCount` conta todos. `totals` e `assetClasses` fecham 100%.
   *
   * `coverage.unresolved` lista as 50 maiores partes que não abrem (fundos sem
   * carteira, posições confidenciais, fundos pequenos demais para abrir), com o
   * motivo e o peso; `coverage.otherUnresolved` soma o resto. Os fundos de todos os
   * itens dividem um limite de posições: os de maior peso na carteira abrem
   * primeiro. As carteiras têm datas diferentes: `coverage.oldestReferenceDate` traz
   * a mais antiga.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.exposure({
   *   positions:
   *     'WRLD11:10000,IVVB11:5000,NVDC34:2000,PETR4:3000,BIAU39:1000',
   * });
   * ```
   */
  exposure(query: FundExposureParams, options?: RequestOptions): APIPromise<FundExposureResponse> {
    return this._client.get('/api/v2/funds/exposure', { query, ...options });
  }

  /**
   * Fundos que têm um ativo em carteira, com o valor e o peso da posição em cada
   * fundo. Os dados vêm da carteira mensal que os fundos entregam à CVM.
   *
   * Use para ver quais fundos e ETFs compram uma ação, quais têm ações ou dívida de
   * uma empresa, ou quais fundos têm cotas de outro fundo.
   *
   * Informe `symbol` (ticker na bolsa, como `PETR4`) ou `cnpj`. O CNPJ de um fundo
   * traz quem tem cotas dele. O CNPJ de uma empresa traz quem tem as ações dela
   * (todos os tickers, como `PETR3` e `PETR4`), as debêntures e os outros títulos de
   * dívida que ela emitiu. Com `issuer=true`, um ticker de ação faz o mesmo que o
   * CNPJ da empresa. `asset.type` diz como o ativo foi lido e `asset.symbols` lista
   * os tickers buscados.
   *
   * Cada fundo aparece uma vez, com os valores somados. `positions` mostra cada
   * ativo da posição. Use `assetClass=equity` para ver só as ações.
   *
   * Por padrão (`scope=direct`), só posições diretas: um fundo que tem o ativo por
   * meio de outro fundo não aparece. Ações próprias e emprestadas somam uma posição.
   * Derivativos, valores a pagar e posições confidenciais não aparecem.
   *
   * Fundos que têm o ativo por meio de outros fundos: use `scope=indirect` (só
   * esses) ou `scope=all` (os dois). O caminho passa por fundos de fundos, ETFs,
   * BDRs de ETF e os fundos do exterior por trás deles. Assim, um fundo que tem
   * WRLD11 aparece entre os que têm NVIDIA (NVDC34). Um BDR de empresa também busca
   * a ação no exterior: as ações da NVIDIA que os fundos têm fora do país e dentro
   * dos fundos do exterior.
   *
   * Com `scope=indirect` ou `all`:
   *
   * - `marketValue` e `weightPercent` trazem a exposição total do fundo ao ativo,
   *   direta mais indireta. `directValue` e `directWeightPercent` trazem só a
   *   posição direta, e `indirectValue` a parte por meio de outros fundos.
   * - `paths` traz os 3 caminhos de maior valor, cada um com os fundos no caminho
   *   (`via`), o peso e o valor. A posição direta é o caminho com `via` vazio.
   * - A mesma posição aparece em cada fundo acima dela, então a soma dos fundos
   *   conta a posição mais de uma vez. `summary.totalValue` conta cada posição uma
   *   vez. `summary` traz também quantos fundos têm o ativo só direto, só indireto
   *   ou dos dois jeitos.
   * - `change`, `sortBy=bought`, `sortBy=sold` e `include=movers` continuam sobre a
   *   posição direta. `include=direct` traz também `topDirect`: as maiores posições
   *   diretas, na mesma resposta. O valor indireto muda quando um fundo no meio do
   *   caminho negocia, e isso não é compra nem venda do fundo.
   *   `previousIndirectValue` traz o valor indireto do mês anterior.
   * - Um fundo só abre outro a partir de 0,01% do patrimônio e até 5 níveis.
   *   Posições confidenciais nunca abrem. Os fundos do exterior publicam a carteira
   *   a cada trimestre: `summary.oldestReferenceDate` traz a data mais antiga usada.
   *
   * Sem `referenceDate`, a resposta traz o mês mais recente que a maioria dos fundos
   * já entregou: os fundos entregam a carteira ao longo de semanas.
   *
   * Quem comprou e quem vendeu: `change` compara cada fundo com o mês anterior com
   * carteiras (`previousReferenceDate`). `change.changeValue` estima o valor
   * comprado ou vendido pela diferença de quantidade vezes o preço do mês, então a
   * alta ou a queda do preço não conta. A quantidade do mês anterior é ajustada por
   * desdobramentos, grupamentos e bonificações. Use `sortBy=bought` para os maiores
   * compradores e `sortBy=sold` para os maiores vendedores, inclusive os que zeraram
   * a posição. Com `include=movers`, a mesma resposta traz também `topBuyers` e
   * `topSellers`. `summary` traz quantos fundos compraram e venderam e o saldo do
   * mês. Uma linha com quantidade e valor zerados conta como posição zerada.
   *
   * Um fundo que ainda não entregou a carteira do mês não conta como venda. Um fundo
   * sem carteira no mês anterior, ou com posições confidenciais da mesma classe do
   * ativo em um dos dois meses, fica com `change.status` `unknown` e não entra nos
   * totais. Quando um evento muda a quantidade de ações sem fator conhecido (como
   * incorporação ou redução de capital), `change` e os totais vêm `null`.
   *
   * `return12mPercent` traz a variação do valor da cota de cada fundo nos 12 meses
   * até `referenceDate`, sem os rendimentos distribuídos.
   *
   * Plano Pro.
   *
   * @example
   * ```ts
   * const response = await client.v2.funds.holders();
   * ```
   */
  holders(
    query: FundHoldersParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FundHoldersResponse> {
    return this._client.get('/api/v2/funds/holders', { query, ...options });
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
   * Filtra e ordena os fundos de investimento por indicadores. Uma chamada percorre
   * todos os fundos.
   *
   * Sem `assetType`, ou com um tipo listado, a busca cobre os fundos negociados na
   * B3 (FIIs, Fiagros, FI-Infra, ETFs, FIDCs e FIPs), por preço, rendimentos, P/VP,
   * liquidez, patrimônio e cotistas. Para FIIs, `segmentType` separa tijolo, papel,
   * fundos de fundos e híbridos, e `segment` usa o segmento do cadastro da CVM. Para
   * ETFs, `etfCategory` separa renda fixa, renda variável, cripto e imobiliário.
   *
   * Com `assetType=unlisted`, a busca cobre os fundos sem ticker na B3,
   * identificados pelo CNPJ (renda fixa, multimercado, ações, previdência), por
   * rentabilidade, patrimônio, cotistas e captação. Entram os fundos com situação
   * "Em Funcionamento Normal" na CVM que enviaram o informe diário nos últimos 20
   * dias. `classification` usa a classe da CVM, `anbimaClassification` busca parte
   * da classificação ANBIMA e `manager` busca parte do nome do gestor. Cada item
   * traz `cnpj` em vez de `symbol`.
   *
   * Um filtro ou uma ordenação de um só grupo de fundos responde 400 no outro grupo.
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
   * - Fundos de previdência de renda fixa pela maior rentabilidade em 12 meses:
   *   `?assetType=unlisted&classification=renda-fixa&anbimaClassification=Previdência&sortBy=return12m`
   * - Fundos cujo CNPJ começa com 12.345.678:
   *   `?assetType=unlisted&search=12.345.678`
   *
   * `dividendYield` soma só os rendimentos dos últimos 12 meses pela data-com, sem
   * amortizações, e divide pelo último preço. `priceToNav` usa o último preço e o
   * valor patrimonial por cota do último informe. `averageDailyTradedValue` divide o
   * valor negociado nos últimos 30 dias pelos pregões do período.
   *
   * Os dados dos fundos sem ticker vêm do informe diário que os fundos enviam à CVM.
   * Ele costuma chegar com 1 a 3 dias úteis de atraso: `navDate` mostra a data do
   * último informe de cada fundo. As rentabilidades são a variação da cota: brutas
   * de imposto de renda e líquidas de taxas. Uma rentabilidade é nula quando falta a
   * cota inicial ou quando a cota muda mais de 10 vezes no período, o que indica
   * desdobramento ou grupamento de cotas.
   *
   * Plano Pro.
   *
   * Indicadores dos fundos listados:
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
   * Indicadores dos fundos sem ticker (`assetType=unlisted`):
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
   * const response = await client.v2.funds.screener();
   * ```
   */
  screener(
    query: FundScreenerParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FundScreenerResponse> {
    return this._client.get('/api/v2/funds/screener', { query, ...options });
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

    /**
     * Valor patrimonial por cota na base de cotas dos preços: desdobramentos e
     * grupamentos depois da data do informe já estão aplicados, como em `close`.
     */
    navPerShare: number | null;

    price: number | null;

    /**
     * Data do preço de fechamento usado em `price`.
     */
    priceDate: string | null;

    /**
     * Fechamento na data da cota dividido por `navPerShare`. Usa o último pregão até 7
     * dias antes dessa data. Sem fechamento nesse intervalo, é `null`.
     */
    priceToNav: number | null;

    /**
     * Valor patrimonial por cota como o informe declara, sem desdobramentos e
     * grupamentos posteriores.
     */
    rawNavPerShare: number | null;

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
    assetType: 'etf' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'other';

    cnpj: string;

    declaredDate: string;

    exDate: string | null;

    isinCode: string | null;

    label: string;

    lastDatePrior: string;

    paymentDate: string;

    /**
     * Valor por cota, em reais, na escala das cotações ajustadas por desdobramentos e
     * grupamentos.
     */
    rate: number;

    /**
     * Valor pago por cota na data do provento, sem ajuste.
     */
    rawRate: number;

    symbol: string;
  }
}

export interface FundExposureResponse {
  assetClasses: Array<FundExposureResponse.AssetClass>;

  companies: Array<FundExposureResponse.Company>;

  countries: Array<FundExposureResponse.Country>;

  countryCoveragePercent: number | null;

  coverage: FundExposureResponse.Coverage;

  inputs: Array<FundExposureResponse.Input>;

  pagination: FundExposureResponse.Pagination;

  referenceDate: string | null;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  /**
   * Parte do peso das empresas que tem setor, em %.
   */
  sectorCoveragePercent: number | null;

  sectors: Array<FundExposureResponse.Sector>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  totals: FundExposureResponse.Totals;

  /**
   * Soma dos valores informados. `null` com pesos.
   */
  totalValue: number | null;
}

export namespace FundExposureResponse {
  export interface AssetClass {
    /**
     * `equity` (ações e BDRs), `fixedIncome` (renda fixa), `cash` (caixa e valores a
     * pagar e receber), `commodity`, `crypto`, `fund` (fundos que não abrem) ou
     * `other`.
     */
    assetClass: 'equity' | 'fixedIncome' | 'cash' | 'commodity' | 'crypto' | 'fund' | 'other';

    value: number | null;

    /**
     * Peso na cesta, em %.
     */
    weightPercent: number;
  }

  export interface Company {
    /**
     * Chave da empresa: junta classes de ações e BDRs da mesma empresa.
     */
    id: string;

    /**
     * Tickers da empresa na B3 (ações, units, BDRs).
     */
    b3Symbols: Array<string>;

    country: string | null;

    isin: string | null;

    name: string | null;

    /**
     * Até 10 itens da cesta que levam à empresa, do maior para o menor.
     */
    paths: Array<Company.Path>;

    /**
     * Quantos itens da cesta levam à empresa.
     */
    pathsCount: number;

    rank: number;

    sector: string | null;

    /**
     * Ticker na bolsa de origem, quando conhecido.
     */
    symbol: string | null;

    value: number | null;

    /**
     * Peso na cesta, em %.
     */
    weightPercent: number;
  }

  export namespace Company {
    export interface Path {
      /**
       * Item da cesta.
       */
      input: string;

      /**
       * Fundos entre o item e a empresa, no caminho de maior peso. Vazio quando o item é
       * a própria ação.
       */
      via: Array<Path.Via>;

      /**
       * Peso que vem por este item, em % da cesta.
       */
      weightPercent: number;
    }

    export namespace Path {
      export interface Via {
        id: string | null;

        name: string | null;

        symbol: string | null;
      }
    }
  }

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

  export interface Coverage {
    oldestReferenceDate: string | null;

    /**
     * Soma das partes que não abrem além das 50 listadas.
     */
    otherUnresolved: Coverage.OtherUnresolved;

    /**
     * Parte da cesta que chega a um ativo final, em %.
     */
    resolvedPercent: number;

    /**
     * As 50 maiores partes que não abrem, da maior para a menor.
     */
    unresolved: Array<Coverage.Unresolved>;
  }

  export namespace Coverage {
    /**
     * Soma das partes que não abrem além das 50 listadas.
     */
    export interface OtherUnresolved {
      count: number;

      /**
       * Peso das partes fora de `unresolved`, em % da cesta.
       */
      weightPercent: number;
    }

    export interface Unresolved {
      id: string | null;

      /**
       * `localFund` (fundo brasileiro), `foreignFund` (fundo do exterior), `etfBdr` (BDR
       * de ETF) ou `singleAsset` (um ativo só, como ouro ou bitcoin).
       */
      kind: 'localFund' | 'foreignFund' | 'etfBdr' | 'singleAsset' | null;

      name: string | null;

      /**
       * Por que o fundo não abre: `confidential` (posição confidencial), `noReport` (sem
       * carteira), `staleReport` (carteira longe do mês), `belowThreshold` (peso
       * pequeno), `depthLimit` (muitos níveis), `cycle` (o fundo já está acima),
       * `noComposition` (sem carteira pública), `inconsistentReport` (as posições não
       * batem com o patrimônio) ou `notFound` (item da cesta que não é ticker, fundo ou
       * BDR de ETF conhecido).
       */
      reason:
        | 'confidential'
        | 'noReport'
        | 'staleReport'
        | 'belowThreshold'
        | 'depthLimit'
        | 'cycle'
        | 'noComposition'
        | 'inconsistentReport'
        | 'notFound';

      symbol: string | null;

      /**
       * Até 10 itens da cesta por onde chega esta parte.
       */
      via: Array<string>;

      /**
       * Quantos itens da cesta chegam a esta parte.
       */
      viaCount: number;

      /**
       * Peso no fundo pedido, em %.
       */
      weightPercent: number;
    }
  }

  export interface Input {
    id: string | null;

    cnpj: string | null;

    /**
     * Como o item foi lido: fundo brasileiro, BDR de ETF, ativo único (ouro, bitcoin),
     * ação ou unit, BDR de empresa, fundo listado sem carteira mensal, ou
     * desconhecido.
     */
    kind: 'localFund' | 'etfBdr' | 'singleAsset' | 'stock' | 'bdr' | 'fund' | 'unknown';

    name: string | null;

    /**
     * Por que o fundo não abre: `confidential` (posição confidencial), `noReport` (sem
     * carteira), `staleReport` (carteira longe do mês), `belowThreshold` (peso
     * pequeno), `depthLimit` (muitos níveis), `cycle` (o fundo já está acima),
     * `noComposition` (sem carteira pública), `inconsistentReport` (as posições não
     * batem com o patrimônio) ou `notFound` (item da cesta que não é ticker, fundo ou
     * BDR de ETF conhecido).
     */
    reason:
      | 'confidential'
      | 'noReport'
      | 'staleReport'
      | 'belowThreshold'
      | 'depthLimit'
      | 'cycle'
      | 'noComposition'
      | 'inconsistentReport'
      | 'notFound'
      | null;

    /**
     * Data da carteira do item.
     */
    referenceDate: string | null;

    /**
     * Parte do item que chega a um ativo final, em %.
     */
    resolvedPercent: number;

    symbol: string | null;

    value: number | null;

    /**
     * Peso do item na cesta, em %.
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

  export interface Sector {
    sector: string;

    /**
     * Peso no patrimônio, em %.
     */
    weightPercent: number;
  }

  export interface Totals {
    companiesCount: number;

    /**
     * Peso de todas as empresas, em %.
     */
    companiesWeightPercent: number;

    /**
     * Peso das empresas desta página.
     */
    listedWeightPercent: number;

    /**
     * Peso do que não é ação: renda fixa, caixa, ouro, criptoativos, fundos sem
     * carteira.
     */
    notCompaniesWeightPercent: number;

    /**
     * Peso das empresas fora desta página.
     */
    otherCompaniesWeightPercent: number;
  }
}

export interface FundHoldersResponse {
  asset: FundHoldersResponse.Asset;

  funds: Array<FundHoldersResponse.Fund>;

  pagination: FundHoldersResponse.Pagination;

  /**
   * Mês anterior com carteiras, base de `change` e dos totais de compra e venda.
   * `null` quando `change` é `null`.
   */
  previousReferenceDate: string | null;

  referenceDate: string | null;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  summary: FundHoldersResponse.Summary;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  /**
   * Com `scope=indirect` ou `all`: o escopo pedido.
   */
  scope?: 'direct' | 'indirect' | 'all';

  /**
   * Com `include=movers`: os fundos que mais compraram no mês, como em
   * `sortBy=bought`, até `limit`. Vazio quando `change` é `null`.
   */
  topBuyers?: Array<FundHoldersResponse.TopBuyer>;

  /**
   * Com `include=direct` e `scope=indirect` ou `all`: os fundos com as maiores
   * posições diretas, por `directValue`, até `limit`.
   */
  topDirect?: Array<FundHoldersResponse.TopDirect>;

  /**
   * Com `include=movers`: os fundos que mais venderam no mês, como em `sortBy=sold`,
   * até `limit`. Vazio quando `change` é `null`.
   */
  topSellers?: Array<FundHoldersResponse.TopSeller>;
}

export namespace FundHoldersResponse {
  export interface Asset {
    cnpj: string | null;

    name: string | null;

    symbol: string | null;

    /**
     * Tickers buscados na bolsa.
     */
    symbols: Array<string>;

    /**
     * `fund` (cotas de um fundo e, se listado, o ticker dele), `company` (ações e
     * dívida de uma empresa) ou `security` (um ticker).
     */
    type: 'fund' | 'company' | 'security';
  }

  export interface Fund {
    assetType: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other' | null;

    /**
     * Mudança contra o mês anterior com carteiras (`previousReferenceDate`). `null`
     * sem mês anterior, ou quando um evento muda a quantidade de ações sem fator
     * conhecido (incorporação, redução de capital, ou mudança de quantidade sem evento
     * registrado).
     */
    change: Fund.Change | null;

    cnpj: string;

    /**
     * Valor da posição em reais, com ações emprestadas.
     */
    marketValue: number;

    name: string | null;

    /**
     * Patrimônio líquido do fundo, em reais.
     */
    netAssets: number | null;

    /**
     * Cada ativo que forma a posição, do maior valor ao menor. Mostra, por exemplo,
     * quanto o fundo tem em cada ação e em cada debênture da empresa.
     */
    positions: Array<Fund.Position>;

    /**
     * Quantidade. Vendas a descoberto ficam negativas. `null` quando a posição junta
     * mais de um ativo (classes da empresa, ou o BDR e a ação no exterior com
     * `scope=indirect|all`), ou títulos sem código.
     */
    quantity: number | null;

    /**
     * Variação do valor da cota do fundo nos 12 meses até `referenceDate`, em % (12.5
     * = 12,5%), ajustada por desdobramentos da cota. Não soma os rendimentos
     * distribuídos, então fica abaixo do retorno total de um fundo que distribui.
     * `null` sem o valor da cota nas duas datas.
     */
    return12mPercent: number | null;

    symbol: string | null;

    /**
     * Peso do ativo no patrimônio do fundo, em %.
     */
    weightPercent: number | null;

    /**
     * Com `scope=indirect` ou `all`: valor da posição na própria carteira do fundo, em
     * reais.
     */
    directValue?: number;

    /**
     * Com `scope=indirect` ou `all`: peso da posição direta no patrimônio do fundo, em
     * %.
     */
    directWeightPercent?: number | null;

    /**
     * Com `scope=indirect` ou `all`: valor que o fundo tem no ativo por meio de outros
     * fundos, em reais: patrimônio do fundo × peso do caminho × peso do ativo no fundo
     * que o tem.
     */
    indirectValue?: number;

    /**
     * Com `scope=indirect` ou `all`: os 3 caminhos de maior valor.
     */
    paths?: Array<Fund.Path>;

    /**
     * Com `scope=indirect` ou `all`: quantos caminhos levam ao ativo, com a posição
     * direta.
     */
    pathsCount?: number;

    /**
     * Com `scope=indirect` ou `all`: `indirectValue` no mês anterior
     * (`previousReferenceDate`). Não indica compra nem venda: o valor muda quando um
     * fundo no meio do caminho negocia. `null` sem dados do mês anterior.
     */
    previousIndirectValue?: number | null;

    /**
     * Com `scope=indirect` ou `all`: exposição do fundo ao ativo em reais, direta mais
     * indireta. Igual a `marketValue`.
     */
    value?: number;
  }

  export namespace Fund {
    /**
     * Mudança contra o mês anterior com carteiras (`previousReferenceDate`). `null`
     * sem mês anterior, ou quando um evento muda a quantidade de ações sem fator
     * conhecido (incorporação, redução de capital, ou mudança de quantidade sem evento
     * registrado).
     */
    export interface Change {
      /**
       * Valor estimado comprado (positivo) ou vendido (negativo) no mês, em reais: a
       * diferença de quantidade vezes o preço do mês (valor dividido pela quantidade).
       * Assim a alta ou a queda do preço não conta como compra ou venda. Uma posição
       * nova soma o valor dela; uma posição zerada, o valor do mês anterior. Um título
       * sem quantidade que o fundo tem nos dois meses soma 0. `null` para `unknown`.
       */
      changeValue: number | null;

      /**
       * Valor da posição no mês anterior, em reais. 0 para `new`. `null` para `unknown`
       * sem carteira do mês anterior.
       */
      previousMarketValue: number | null;

      /**
       * Quantidade no mês anterior, já ajustada por desdobramentos, grupamentos e
       * bonificações. `null` como em `quantity`.
       */
      previousQuantity: number | null;

      /**
       * `new` (o fundo entregou a carteira do mês anterior sem o ativo), `increased`,
       * `decreased`, `unchanged`, `exited` (tinha o ativo no mês anterior e entregou a
       * carteira deste mês sem ele) ou `unknown` (sem carteira do mês anterior, ou com
       * posições confidenciais da mesma classe do ativo em um dos dois meses). Uma linha
       * com quantidade e valor zerados conta como sem posição.
       */
      status: 'new' | 'increased' | 'decreased' | 'unchanged' | 'exited' | 'unknown';
    }

    export interface Position {
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

      /**
       * Valor em reais.
       */
      marketValue: number;

      /**
       * Quantidade. `null` para títulos sem código de uma empresa: podem ser mais de um.
       */
      quantity: number | null;

      /**
       * Ticker ou código do ativo. `null` para cotas de fundo e títulos sem código.
       */
      symbol: string | null;

      /**
       * Peso no patrimônio do fundo, em %.
       */
      weightPercent: number | null;
    }

    export interface Path {
      /**
       * Valor em reais.
       */
      value: number;

      /**
       * Fundos no caminho, do primeiro ao que tem o ativo. Vazio para a posição direta.
       */
      via: Array<Path.Via>;

      /**
       * Peso deste caminho no patrimônio do fundo, em %.
       */
      weightPercent: number | null;
    }

    export namespace Path {
      export interface Via {
        /**
         * CNPJ do fundo, `sec:<série>` de um fundo do exterior ou `bdr:<ticker>` de um BDR
         * de ETF.
         */
        id: string;

        name: string | null;

        symbol: string | null;
      }
    }
  }

  export interface Pagination {
    hasNextPage: boolean;

    limit: number;

    page: number;

    totalItems: number;

    totalPages: number;
  }

  export interface Summary {
    /**
     * Fundos que compraram no mês (`change.changeValue` positivo). `null` quando
     * `change` é `null`.
     */
    buyersCount: number | null;

    /**
     * Saldo estimado do mês, em reais: compras menos vendas de todos os fundos. Fundos
     * com `unknown` não entram.
     */
    changeValue: number | null;

    fundsCount: number;

    /**
     * Fundos que venderam no mês, inclusive os que zeraram a posição. `null` quando
     * `change` é `null`.
     */
    sellersCount: number | null;

    /**
     * Valor das posições diretas. Com `scope=indirect` ou `all`, inclui as linhas da
     * mesma ação no exterior nas carteiras dos fundos locais (NVDA para NVDC34).
     */
    totalMarketValue: number;

    /**
     * Soma das quantidades. `null` quando a resposta junta mais de um ativo (classes
     * da empresa, ou o BDR e a ação no exterior com `scope=indirect|all`), ou títulos
     * sem código.
     */
    totalQuantity: number | null;

    /**
     * Com `scope=indirect` ou `all`: fundos que têm o ativo das duas formas.
     */
    bothCount?: number;

    /**
     * Com `scope=indirect` ou `all`: fundos que têm o ativo só na própria carteira.
     */
    directOnlyCount?: number;

    /**
     * Com `scope=indirect` ou `all`: parte de `totalValue` que os fundos têm por meio
     * de fundos do exterior e BDRs de ETF.
     */
    foreignFundsValue?: number;

    /**
     * Com `scope=indirect` ou `all`: `false` quando o mês não tem os caminhos entre
     * fundos. Então só as posições diretas entram.
     */
    indirectAvailable?: boolean;

    /**
     * Com `scope=indirect` ou `all`: fundos que têm o ativo só por meio de outros
     * fundos.
     */
    indirectOnlyCount?: number;

    /**
     * Com `scope=indirect` ou `all`: data da carteira mais antiga usada. Os fundos do
     * exterior publicam a carteira a cada trimestre, com atraso.
     */
    oldestReferenceDate?: string | null;

    /**
     * Com `scope=indirect` ou `all`: valor total no ativo, com cada posição contada
     * uma vez: as posições diretas (`totalMarketValue`) mais a parte dos fundos do
     * exterior que os fundos têm (`foreignFundsValue`). A soma de `value` dos fundos é
     * maior: a mesma posição aparece em cada fundo acima dela.
     */
    totalValue?: number;
  }

  export interface TopBuyer {
    assetType: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other' | null;

    /**
     * Mudança contra o mês anterior com carteiras (`previousReferenceDate`). `null`
     * sem mês anterior, ou quando um evento muda a quantidade de ações sem fator
     * conhecido (incorporação, redução de capital, ou mudança de quantidade sem evento
     * registrado).
     */
    change: TopBuyer.Change | null;

    cnpj: string;

    /**
     * Valor da posição em reais, com ações emprestadas.
     */
    marketValue: number;

    name: string | null;

    /**
     * Patrimônio líquido do fundo, em reais.
     */
    netAssets: number | null;

    /**
     * Cada ativo que forma a posição, do maior valor ao menor. Mostra, por exemplo,
     * quanto o fundo tem em cada ação e em cada debênture da empresa.
     */
    positions: Array<TopBuyer.Position>;

    /**
     * Quantidade. Vendas a descoberto ficam negativas. `null` quando a posição junta
     * mais de um ativo (classes da empresa, ou o BDR e a ação no exterior com
     * `scope=indirect|all`), ou títulos sem código.
     */
    quantity: number | null;

    /**
     * Variação do valor da cota do fundo nos 12 meses até `referenceDate`, em % (12.5
     * = 12,5%), ajustada por desdobramentos da cota. Não soma os rendimentos
     * distribuídos, então fica abaixo do retorno total de um fundo que distribui.
     * `null` sem o valor da cota nas duas datas.
     */
    return12mPercent: number | null;

    symbol: string | null;

    /**
     * Peso do ativo no patrimônio do fundo, em %.
     */
    weightPercent: number | null;

    /**
     * Com `scope=indirect` ou `all`: valor da posição na própria carteira do fundo, em
     * reais.
     */
    directValue?: number;

    /**
     * Com `scope=indirect` ou `all`: peso da posição direta no patrimônio do fundo, em
     * %.
     */
    directWeightPercent?: number | null;

    /**
     * Com `scope=indirect` ou `all`: valor que o fundo tem no ativo por meio de outros
     * fundos, em reais: patrimônio do fundo × peso do caminho × peso do ativo no fundo
     * que o tem.
     */
    indirectValue?: number;

    /**
     * Com `scope=indirect` ou `all`: os 3 caminhos de maior valor.
     */
    paths?: Array<TopBuyer.Path>;

    /**
     * Com `scope=indirect` ou `all`: quantos caminhos levam ao ativo, com a posição
     * direta.
     */
    pathsCount?: number;

    /**
     * Com `scope=indirect` ou `all`: `indirectValue` no mês anterior
     * (`previousReferenceDate`). Não indica compra nem venda: o valor muda quando um
     * fundo no meio do caminho negocia. `null` sem dados do mês anterior.
     */
    previousIndirectValue?: number | null;

    /**
     * Com `scope=indirect` ou `all`: exposição do fundo ao ativo em reais, direta mais
     * indireta. Igual a `marketValue`.
     */
    value?: number;
  }

  export namespace TopBuyer {
    /**
     * Mudança contra o mês anterior com carteiras (`previousReferenceDate`). `null`
     * sem mês anterior, ou quando um evento muda a quantidade de ações sem fator
     * conhecido (incorporação, redução de capital, ou mudança de quantidade sem evento
     * registrado).
     */
    export interface Change {
      /**
       * Valor estimado comprado (positivo) ou vendido (negativo) no mês, em reais: a
       * diferença de quantidade vezes o preço do mês (valor dividido pela quantidade).
       * Assim a alta ou a queda do preço não conta como compra ou venda. Uma posição
       * nova soma o valor dela; uma posição zerada, o valor do mês anterior. Um título
       * sem quantidade que o fundo tem nos dois meses soma 0. `null` para `unknown`.
       */
      changeValue: number | null;

      /**
       * Valor da posição no mês anterior, em reais. 0 para `new`. `null` para `unknown`
       * sem carteira do mês anterior.
       */
      previousMarketValue: number | null;

      /**
       * Quantidade no mês anterior, já ajustada por desdobramentos, grupamentos e
       * bonificações. `null` como em `quantity`.
       */
      previousQuantity: number | null;

      /**
       * `new` (o fundo entregou a carteira do mês anterior sem o ativo), `increased`,
       * `decreased`, `unchanged`, `exited` (tinha o ativo no mês anterior e entregou a
       * carteira deste mês sem ele) ou `unknown` (sem carteira do mês anterior, ou com
       * posições confidenciais da mesma classe do ativo em um dos dois meses). Uma linha
       * com quantidade e valor zerados conta como sem posição.
       */
      status: 'new' | 'increased' | 'decreased' | 'unchanged' | 'exited' | 'unknown';
    }

    export interface Position {
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

      /**
       * Valor em reais.
       */
      marketValue: number;

      /**
       * Quantidade. `null` para títulos sem código de uma empresa: podem ser mais de um.
       */
      quantity: number | null;

      /**
       * Ticker ou código do ativo. `null` para cotas de fundo e títulos sem código.
       */
      symbol: string | null;

      /**
       * Peso no patrimônio do fundo, em %.
       */
      weightPercent: number | null;
    }

    export interface Path {
      /**
       * Valor em reais.
       */
      value: number;

      /**
       * Fundos no caminho, do primeiro ao que tem o ativo. Vazio para a posição direta.
       */
      via: Array<Path.Via>;

      /**
       * Peso deste caminho no patrimônio do fundo, em %.
       */
      weightPercent: number | null;
    }

    export namespace Path {
      export interface Via {
        /**
         * CNPJ do fundo, `sec:<série>` de um fundo do exterior ou `bdr:<ticker>` de um BDR
         * de ETF.
         */
        id: string;

        name: string | null;

        symbol: string | null;
      }
    }
  }

  export interface TopDirect {
    assetType: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other' | null;

    /**
     * Mudança contra o mês anterior com carteiras (`previousReferenceDate`). `null`
     * sem mês anterior, ou quando um evento muda a quantidade de ações sem fator
     * conhecido (incorporação, redução de capital, ou mudança de quantidade sem evento
     * registrado).
     */
    change: TopDirect.Change | null;

    cnpj: string;

    /**
     * Valor da posição em reais, com ações emprestadas.
     */
    marketValue: number;

    name: string | null;

    /**
     * Patrimônio líquido do fundo, em reais.
     */
    netAssets: number | null;

    /**
     * Cada ativo que forma a posição, do maior valor ao menor. Mostra, por exemplo,
     * quanto o fundo tem em cada ação e em cada debênture da empresa.
     */
    positions: Array<TopDirect.Position>;

    /**
     * Quantidade. Vendas a descoberto ficam negativas. `null` quando a posição junta
     * mais de um ativo (classes da empresa, ou o BDR e a ação no exterior com
     * `scope=indirect|all`), ou títulos sem código.
     */
    quantity: number | null;

    /**
     * Variação do valor da cota do fundo nos 12 meses até `referenceDate`, em % (12.5
     * = 12,5%), ajustada por desdobramentos da cota. Não soma os rendimentos
     * distribuídos, então fica abaixo do retorno total de um fundo que distribui.
     * `null` sem o valor da cota nas duas datas.
     */
    return12mPercent: number | null;

    symbol: string | null;

    /**
     * Peso do ativo no patrimônio do fundo, em %.
     */
    weightPercent: number | null;

    /**
     * Com `scope=indirect` ou `all`: valor da posição na própria carteira do fundo, em
     * reais.
     */
    directValue?: number;

    /**
     * Com `scope=indirect` ou `all`: peso da posição direta no patrimônio do fundo, em
     * %.
     */
    directWeightPercent?: number | null;

    /**
     * Com `scope=indirect` ou `all`: valor que o fundo tem no ativo por meio de outros
     * fundos, em reais: patrimônio do fundo × peso do caminho × peso do ativo no fundo
     * que o tem.
     */
    indirectValue?: number;

    /**
     * Com `scope=indirect` ou `all`: os 3 caminhos de maior valor.
     */
    paths?: Array<TopDirect.Path>;

    /**
     * Com `scope=indirect` ou `all`: quantos caminhos levam ao ativo, com a posição
     * direta.
     */
    pathsCount?: number;

    /**
     * Com `scope=indirect` ou `all`: `indirectValue` no mês anterior
     * (`previousReferenceDate`). Não indica compra nem venda: o valor muda quando um
     * fundo no meio do caminho negocia. `null` sem dados do mês anterior.
     */
    previousIndirectValue?: number | null;

    /**
     * Com `scope=indirect` ou `all`: exposição do fundo ao ativo em reais, direta mais
     * indireta. Igual a `marketValue`.
     */
    value?: number;
  }

  export namespace TopDirect {
    /**
     * Mudança contra o mês anterior com carteiras (`previousReferenceDate`). `null`
     * sem mês anterior, ou quando um evento muda a quantidade de ações sem fator
     * conhecido (incorporação, redução de capital, ou mudança de quantidade sem evento
     * registrado).
     */
    export interface Change {
      /**
       * Valor estimado comprado (positivo) ou vendido (negativo) no mês, em reais: a
       * diferença de quantidade vezes o preço do mês (valor dividido pela quantidade).
       * Assim a alta ou a queda do preço não conta como compra ou venda. Uma posição
       * nova soma o valor dela; uma posição zerada, o valor do mês anterior. Um título
       * sem quantidade que o fundo tem nos dois meses soma 0. `null` para `unknown`.
       */
      changeValue: number | null;

      /**
       * Valor da posição no mês anterior, em reais. 0 para `new`. `null` para `unknown`
       * sem carteira do mês anterior.
       */
      previousMarketValue: number | null;

      /**
       * Quantidade no mês anterior, já ajustada por desdobramentos, grupamentos e
       * bonificações. `null` como em `quantity`.
       */
      previousQuantity: number | null;

      /**
       * `new` (o fundo entregou a carteira do mês anterior sem o ativo), `increased`,
       * `decreased`, `unchanged`, `exited` (tinha o ativo no mês anterior e entregou a
       * carteira deste mês sem ele) ou `unknown` (sem carteira do mês anterior, ou com
       * posições confidenciais da mesma classe do ativo em um dos dois meses). Uma linha
       * com quantidade e valor zerados conta como sem posição.
       */
      status: 'new' | 'increased' | 'decreased' | 'unchanged' | 'exited' | 'unknown';
    }

    export interface Position {
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

      /**
       * Valor em reais.
       */
      marketValue: number;

      /**
       * Quantidade. `null` para títulos sem código de uma empresa: podem ser mais de um.
       */
      quantity: number | null;

      /**
       * Ticker ou código do ativo. `null` para cotas de fundo e títulos sem código.
       */
      symbol: string | null;

      /**
       * Peso no patrimônio do fundo, em %.
       */
      weightPercent: number | null;
    }

    export interface Path {
      /**
       * Valor em reais.
       */
      value: number;

      /**
       * Fundos no caminho, do primeiro ao que tem o ativo. Vazio para a posição direta.
       */
      via: Array<Path.Via>;

      /**
       * Peso deste caminho no patrimônio do fundo, em %.
       */
      weightPercent: number | null;
    }

    export namespace Path {
      export interface Via {
        /**
         * CNPJ do fundo, `sec:<série>` de um fundo do exterior ou `bdr:<ticker>` de um BDR
         * de ETF.
         */
        id: string;

        name: string | null;

        symbol: string | null;
      }
    }
  }

  export interface TopSeller {
    assetType: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other' | null;

    /**
     * Mudança contra o mês anterior com carteiras (`previousReferenceDate`). `null`
     * sem mês anterior, ou quando um evento muda a quantidade de ações sem fator
     * conhecido (incorporação, redução de capital, ou mudança de quantidade sem evento
     * registrado).
     */
    change: TopSeller.Change | null;

    cnpj: string;

    /**
     * Valor da posição em reais, com ações emprestadas.
     */
    marketValue: number;

    name: string | null;

    /**
     * Patrimônio líquido do fundo, em reais.
     */
    netAssets: number | null;

    /**
     * Cada ativo que forma a posição, do maior valor ao menor. Mostra, por exemplo,
     * quanto o fundo tem em cada ação e em cada debênture da empresa.
     */
    positions: Array<TopSeller.Position>;

    /**
     * Quantidade. Vendas a descoberto ficam negativas. `null` quando a posição junta
     * mais de um ativo (classes da empresa, ou o BDR e a ação no exterior com
     * `scope=indirect|all`), ou títulos sem código.
     */
    quantity: number | null;

    /**
     * Variação do valor da cota do fundo nos 12 meses até `referenceDate`, em % (12.5
     * = 12,5%), ajustada por desdobramentos da cota. Não soma os rendimentos
     * distribuídos, então fica abaixo do retorno total de um fundo que distribui.
     * `null` sem o valor da cota nas duas datas.
     */
    return12mPercent: number | null;

    symbol: string | null;

    /**
     * Peso do ativo no patrimônio do fundo, em %.
     */
    weightPercent: number | null;

    /**
     * Com `scope=indirect` ou `all`: valor da posição na própria carteira do fundo, em
     * reais.
     */
    directValue?: number;

    /**
     * Com `scope=indirect` ou `all`: peso da posição direta no patrimônio do fundo, em
     * %.
     */
    directWeightPercent?: number | null;

    /**
     * Com `scope=indirect` ou `all`: valor que o fundo tem no ativo por meio de outros
     * fundos, em reais: patrimônio do fundo × peso do caminho × peso do ativo no fundo
     * que o tem.
     */
    indirectValue?: number;

    /**
     * Com `scope=indirect` ou `all`: os 3 caminhos de maior valor.
     */
    paths?: Array<TopSeller.Path>;

    /**
     * Com `scope=indirect` ou `all`: quantos caminhos levam ao ativo, com a posição
     * direta.
     */
    pathsCount?: number;

    /**
     * Com `scope=indirect` ou `all`: `indirectValue` no mês anterior
     * (`previousReferenceDate`). Não indica compra nem venda: o valor muda quando um
     * fundo no meio do caminho negocia. `null` sem dados do mês anterior.
     */
    previousIndirectValue?: number | null;

    /**
     * Com `scope=indirect` ou `all`: exposição do fundo ao ativo em reais, direta mais
     * indireta. Igual a `marketValue`.
     */
    value?: number;
  }

  export namespace TopSeller {
    /**
     * Mudança contra o mês anterior com carteiras (`previousReferenceDate`). `null`
     * sem mês anterior, ou quando um evento muda a quantidade de ações sem fator
     * conhecido (incorporação, redução de capital, ou mudança de quantidade sem evento
     * registrado).
     */
    export interface Change {
      /**
       * Valor estimado comprado (positivo) ou vendido (negativo) no mês, em reais: a
       * diferença de quantidade vezes o preço do mês (valor dividido pela quantidade).
       * Assim a alta ou a queda do preço não conta como compra ou venda. Uma posição
       * nova soma o valor dela; uma posição zerada, o valor do mês anterior. Um título
       * sem quantidade que o fundo tem nos dois meses soma 0. `null` para `unknown`.
       */
      changeValue: number | null;

      /**
       * Valor da posição no mês anterior, em reais. 0 para `new`. `null` para `unknown`
       * sem carteira do mês anterior.
       */
      previousMarketValue: number | null;

      /**
       * Quantidade no mês anterior, já ajustada por desdobramentos, grupamentos e
       * bonificações. `null` como em `quantity`.
       */
      previousQuantity: number | null;

      /**
       * `new` (o fundo entregou a carteira do mês anterior sem o ativo), `increased`,
       * `decreased`, `unchanged`, `exited` (tinha o ativo no mês anterior e entregou a
       * carteira deste mês sem ele) ou `unknown` (sem carteira do mês anterior, ou com
       * posições confidenciais da mesma classe do ativo em um dos dois meses). Uma linha
       * com quantidade e valor zerados conta como sem posição.
       */
      status: 'new' | 'increased' | 'decreased' | 'unchanged' | 'exited' | 'unknown';
    }

    export interface Position {
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

      /**
       * Valor em reais.
       */
      marketValue: number;

      /**
       * Quantidade. `null` para títulos sem código de uma empresa: podem ser mais de um.
       */
      quantity: number | null;

      /**
       * Ticker ou código do ativo. `null` para cotas de fundo e títulos sem código.
       */
      symbol: string | null;

      /**
       * Peso no patrimônio do fundo, em %.
       */
      weightPercent: number | null;
    }

    export interface Path {
      /**
       * Valor em reais.
       */
      value: number;

      /**
       * Fundos no caminho, do primeiro ao que tem o ativo. Vazio para a posição direta.
       */
      via: Array<Path.Via>;

      /**
       * Peso deste caminho no patrimônio do fundo, em %.
       */
      weightPercent: number | null;
    }

    export namespace Path {
      export interface Via {
        /**
         * CNPJ do fundo, `sec:<série>` de um fundo do exterior ou `bdr:<ticker>` de um BDR
         * de ETF.
         */
        id: string;

        name: string | null;

        symbol: string | null;
      }
    }
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

    /**
     * Rendimento distribuído no mês sobre o valor patrimonial da cota, em %.
     */
    dividendYieldMonthly: number | null;

    equity: number | null;

    /**
     * Rentabilidade da cota no mês do informe, em %.
     */
    monthlyReturn: number | null;

    name: string | null;

    /**
     * Valor patrimonial por cota na base de cotas dos preços: desdobramentos e
     * grupamentos depois da data do informe já estão aplicados, como em `close`.
     */
    navPerShare: number | null;

    /**
     * Rentabilidade patrimonial no mês do informe, em %.
     */
    patrimonialMonthlyReturn: number | null;

    price: number | null;

    /**
     * Data do preço de fechamento usado em `price`.
     */
    priceDate: string | null;

    /**
     * Fechamento na data da cota dividido por `navPerShare`. Usa o último pregão até 7
     * dias antes dessa data. Sem fechamento nesse intervalo, é `null`.
     */
    priceToNav: number | null;

    /**
     * Valor patrimonial por cota como o informe declara, sem desdobramentos e
     * grupamentos posteriores.
     */
    rawNavPerShare: number | null;

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

  results: Array<FundScreenerResponse.FundScreenerItem | FundScreenerResponse.FundScreenerUnlistedItem>;

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

  export interface FundScreenerItem {
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

    fund: FundScreenerItem.Fund;

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
    metrics: FundScreenerItem.Metrics;

    /**
     * Nome da empresa ou do fundo.
     */
    name: string;

    quote: FundScreenerItem.Quote;

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

  export namespace FundScreenerItem {
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

  /**
   * Fundo sem ticker na bolsa, com `assetType=unlisted`.
   */
  export interface FundScreenerUnlistedItem {
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
    metrics: FundScreenerUnlistedItem.Metrics;

    /**
     * Nome do fundo.
     */
    name: string | null;

    /**
     * Data do último informe diário, de onde vêm os indicadores (AAAA-MM-DD).
     */
    navDate: string;
  }

  export namespace FundScreenerUnlistedItem {
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
  assetType?: 'etf' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'other';

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

export interface FundExposureParams {
  /**
   * Itens separados por vírgula, até 200: ticker ou CNPJ, com o valor em reais
   * (`WRLD11:10000`) ou o peso (`WRLD11:30%`). Sem valor, o item recebe a média dos
   * outros; sem nenhum valor, todos têm o mesmo peso. Use ponto como separador
   * decimal.
   */
  positions: string;

  /**
   * Empresas por página. Padrão 50, máximo 500.
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

export interface FundHoldersParams {
  /**
   * Só posições destas classes de ativo, separadas por vírgula. Ex.: `equity` para
   * só ações de uma empresa.
   */
  assetClass?: string;

  /**
   * Só fundos deste tipo. Ex.: `etf`.
   */
  assetType?: 'fii' | 'fiagro' | 'fiinfra' | 'fif' | 'fidc' | 'fip' | 'etf' | 'other';

  /**
   * CNPJ de um fundo, para ver quais fundos têm cotas dele, ou de uma empresa, para
   * ver quais fundos têm ações ou dívida dela. Use `symbol` ou `cnpj`, não os dois.
   */
  cnpj?: string;

  /**
   * Listas extras na mesma resposta, separadas por vírgula, até `limit` de cada.
   * `movers` traz `topBuyers` e `topSellers`: os maiores compradores e vendedores do
   * mês. `direct`, com `scope=indirect` ou `all`, traz `topDirect`: as maiores
   * posições diretas.
   */
  include?: string;

  /**
   * `true` troca o ticker de `symbol` por todos os ativos da empresa: ações, units,
   * debêntures e outros títulos de dívida. Padrão `false`.
   */
  issuer?: 'true' | 'false';

  /**
   * Fundos por página. Padrão 20, máximo 100.
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
   * `direct` (padrão): fundos que têm o ativo na própria carteira. `indirect`:
   * fundos que têm o ativo por meio de outros fundos (fundos de fundos, ETFs, BDRs
   * de ETF e os fundos do exterior por trás deles). `all`: os dois. Com `indirect` e
   * `all`, `marketValue` e `weightPercent` trazem a exposição total do fundo, e cada
   * fundo traz `directValue`, `indirectValue` e `paths`.
   */
  scope?: 'direct' | 'indirect' | 'all';

  /**
   * `marketValue` (padrão) ou `weightPercent` listam os fundos que têm o ativo.
   * `bought` lista só os fundos que compraram no mês, pelo valor comprado
   * (`change.changeValue`). `sold` lista só os que venderam, inclusive os que
   * zeraram a posição, pelo valor vendido.
   */
  sortBy?: 'marketValue' | 'weightPercent' | 'bought' | 'sold';

  /**
   * Ordem crescente (`asc`) ou decrescente (`desc`, padrão). Com `bought` e `sold`,
   * `desc` traz primeiro as maiores compras ou vendas.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Ticker do ativo na bolsa. Ex.: PETR4.
   */
  symbol?: string;
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
   * Parte da classificação ANBIMA, sem diferença de maiúsculas e acentos. Exemplos:
   * Previdência, Exterior, Crédito Livre. Só com `assetType=unlisted`.
   */
  anbimaClassification?: string;

  /**
   * Tipo do fundo listado: fii, fiagro, fiinfra, etf, fidc, fip ou fif. Sem ele,
   * todos os fundos listados. `unlisted` troca para os fundos sem ticker na bolsa,
   * por CNPJ.
   */
  assetType?: 'fii' | 'fiagro' | 'fiinfra' | 'etf' | 'fidc' | 'fip' | 'fif' | 'unlisted';

  /**
   * Liquidez diária: valor máximo, inclusive. Unidade: reais. Só para fundos
   * listados.
   */
  averageDailyTradedValueMax?: number;

  /**
   * Liquidez diária: valor mínimo, inclusive. Unidade: reais. Só para fundos
   * listados.
   */
  averageDailyTradedValueMin?: number;

  /**
   * Variação no dia: valor máximo, inclusive. Unidade: porcentagem (2.81 = 2,81%).
   * Só para fundos listados.
   */
  changePercentMax?: number;

  /**
   * Variação no dia: valor mínimo, inclusive. Unidade: porcentagem (2.81 = 2,81%).
   * Só para fundos listados.
   */
  changePercentMin?: number;

  /**
   * Classe do fundo na CVM: renda-fixa, multimercado, acoes, cambial ou fmp-fgts. Só
   * com `assetType=unlisted`.
   */
  classification?: 'renda-fixa' | 'multimercado' | 'acoes' | 'cambial' | 'fmp-fgts';

  /**
   * Dividend yield 12m: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Só
   * para fundos listados.
   */
  dividendYieldMax?: number;

  /**
   * Dividend yield 12m: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Só
   * para fundos listados.
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
   * real-estate. Só para fundos listados.
   */
  etfCategory?: 'fixed-income' | 'equity' | 'crypto' | 'real-estate';

  /**
   * Meses com rendimento: valor máximo, inclusive. Unidade: quantidade. Só para
   * fundos listados.
   */
  incomeMonths12mMax?: number;

  /**
   * Meses com rendimento: valor mínimo, inclusive. Unidade: quantidade. Só para
   * fundos listados.
   */
  incomeMonths12mMin?: number;

  /**
   * Último rendimento: valor máximo, inclusive. Unidade: reais. Só para fundos
   * listados.
   */
  lastDividendMax?: number;

  /**
   * Último rendimento: valor mínimo, inclusive. Unidade: reais. Só para fundos
   * listados.
   */
  lastDividendMin?: number;

  /**
   * Yield do último rendimento: valor máximo, inclusive. Unidade: fração (0.06 =
   * 6%). Só para fundos listados.
   */
  lastDividendYieldMax?: number;

  /**
   * Yield do último rendimento: valor mínimo, inclusive. Unidade: fração (0.06 =
   * 6%). Só para fundos listados.
   */
  lastDividendYieldMin?: number;

  /**
   * Preço: valor máximo, inclusive. Unidade: reais. Só para fundos listados.
   */
  lastPriceMax?: number;

  /**
   * Preço: valor mínimo, inclusive. Unidade: reais. Só para fundos listados.
   */
  lastPriceMin?: number;

  /**
   * Itens por página. Máximo: 200.
   */
  limit?: number;

  /**
   * Parte do nome do gestor, sem diferença de maiúsculas e acentos. Só com
   * `assetType=unlisted`.
   */
  manager?: string;

  /**
   * Valor de mercado: valor máximo, inclusive. Unidade: reais. Só para fundos
   * listados.
   */
  marketCapMax?: number;

  /**
   * Valor de mercado: valor mínimo, inclusive. Unidade: reais. Só para fundos
   * listados.
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
   * Captação líquida em 1 mês: valor máximo, inclusive. Unidade: reais. Só com
   * `assetType=unlisted`.
   */
  netFlow1mMax?: number;

  /**
   * Captação líquida em 1 mês: valor mínimo, inclusive. Unidade: reais. Só com
   * `assetType=unlisted`.
   */
  netFlow1mMin?: number;

  /**
   * Número da página. Começa em 1.
   */
  page?: number;

  /**
   * Variação em 12 meses: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Só
   * para fundos listados.
   */
  priceChange12mMax?: number;

  /**
   * Variação em 12 meses: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Só
   * para fundos listados.
   */
  priceChange12mMin?: number;

  /**
   * P/VP: valor máximo, inclusive. Unidade: múltiplo. Só para fundos listados.
   */
  priceToNavMax?: number;

  /**
   * P/VP: valor mínimo, inclusive. Unidade: múltiplo. Só para fundos listados.
   */
  priceToNavMin?: number;

  /**
   * Rentabilidade em 12 meses: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   * Só com `assetType=unlisted`.
   */
  return12mMax?: number;

  /**
   * Rentabilidade em 12 meses: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   * Só com `assetType=unlisted`.
   */
  return12mMin?: number;

  /**
   * Rentabilidade em 1 mês: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Só
   * com `assetType=unlisted`.
   */
  return1mMax?: number;

  /**
   * Rentabilidade em 1 mês: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Só
   * com `assetType=unlisted`.
   */
  return1mMin?: number;

  /**
   * Rentabilidade em 36 meses: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   * Só com `assetType=unlisted`.
   */
  return36mMax?: number;

  /**
   * Rentabilidade em 36 meses: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   * Só com `assetType=unlisted`.
   */
  return36mMin?: number;

  /**
   * Variação no dia: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Só com
   * `assetType=unlisted`.
   */
  returnDayMax?: number;

  /**
   * Variação no dia: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Só com
   * `assetType=unlisted`.
   */
  returnDayMin?: number;

  /**
   * Rentabilidade no ano: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Só
   * com `assetType=unlisted`.
   */
  returnYtdMax?: number;

  /**
   * Rentabilidade no ano: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Só
   * com `assetType=unlisted`.
   */
  returnYtdMin?: number;

  /**
   * Parte do ticker ou do nome do fundo. Com `assetType=unlisted`, parte do nome ou
   * da razão social; números, com ou sem pontuação, buscam o início do CNPJ.
   */
  search?: string;

  /**
   * Segmento do FII no cadastro da CVM, como Logística, Shoppings, Escritórios ou
   * Títulos e Val. Mob. Nome exato, sem diferença de maiúsculas. Só para fundos
   * listados.
   */
  segment?: string;

  /**
   * Tipo do FII pelo último informe: tijolo (imóveis), papel (CRI, LCI e títulos),
   * fof (cotas de outros FIIs) ou hibrido. Só para fundos listados.
   */
  segmentType?: 'tijolo' | 'papel' | 'hibrido' | 'fof';

  /**
   * Campo de ordenação: uma chave de métrica, `symbol` ou `name`; com
   * `assetType=unlisted`, uma chave de indicador, `name` ou `cnpj`. Padrão:
   * `averageDailyTradedValue`; com `assetType=unlisted`, `totalInvestors`. Valores
   * nulos ficam no fim.
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
    | 'totalFeePercent'
    | 'cnpj'
    | 'returnDay'
    | 'return1m'
    | 'returnYtd'
    | 'return12m'
    | 'return36m'
    | 'netFlow1m';

  /**
   * Ordem. Padrão: `desc`.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Taxa total: valor máximo, inclusive. Unidade: porcentagem (2.81 = 2,81%). Só
   * para fundos listados.
   */
  totalFeePercentMax?: number;

  /**
   * Taxa total: valor mínimo, inclusive. Unidade: porcentagem (2.81 = 2,81%). Só
   * para fundos listados.
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
   * Volume: valor máximo, inclusive. Unidade: quantidade. Só para fundos listados.
   */
  volumeMax?: number;

  /**
   * Volume: valor mínimo, inclusive. Unidade: quantidade. Só para fundos listados.
   */
  volumeMin?: number;
}

Funds.Nav = Nav;
Funds.Holdings = Holdings;
Funds.Crowding = Crowding;
Funds.Fiagro = Fiagro;
Funds.Fidc = Fidc;
Funds.Fip = Fip;

export declare namespace Funds {
  export {
    type FundHolding as FundHolding,
    type FundPaginationMeta as FundPaginationMeta,
    type FundListResponse as FundListResponse,
    type FundDividendsResponse as FundDividendsResponse,
    type FundExposureResponse as FundExposureResponse,
    type FundHoldersResponse as FundHoldersResponse,
    type FundIndicatorsResponse as FundIndicatorsResponse,
    type FundPortfolioResponse as FundPortfolioResponse,
    type FundProfileResponse as FundProfileResponse,
    type FundScreenerResponse as FundScreenerResponse,
    type FundListParams as FundListParams,
    type FundDividendsParams as FundDividendsParams,
    type FundExposureParams as FundExposureParams,
    type FundHoldersParams as FundHoldersParams,
    type FundIndicatorsParams as FundIndicatorsParams,
    type FundPortfolioParams as FundPortfolioParams,
    type FundProfileParams as FundProfileParams,
    type FundScreenerParams as FundScreenerParams,
  };

  export {
    Nav as Nav,
    type NavHistoryResponse as NavHistoryResponse,
    type NavHistoryParams as NavHistoryParams,
  };

  export {
    Holdings as Holdings,
    type HoldingHistoryResponse as HoldingHistoryResponse,
    type HoldingHistoryParams as HoldingHistoryParams,
  };

  export {
    Crowding as Crowding,
    type CrowdingRetrieveResponse as CrowdingRetrieveResponse,
    type CrowdingHistoryResponse as CrowdingHistoryResponse,
    type CrowdingRetrieveParams as CrowdingRetrieveParams,
    type CrowdingHistoryParams as CrowdingHistoryParams,
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
