// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as QuoteAPI from './quote';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Consulte informações detalhadas sobre ações, BDRs, ETFs e índices brasileiros. Obtenha preços em tempo real, dados fundamentalistas, históricos e dividendos.
 */
export class Quote extends APIResource {
  /**
   * Devolve cotação, histórico, dividendos e fundamentos de um ou mais ativos em uma
   * única resposta. É o endpoint original da brapi e continua funcionando sem data
   * de remoção.
   *
   * Para integrações novas, prefira `/api/v2/stocks/*`. Lá cada chamada traz um tipo
   * de dado e a resposta chega menor. Veja o guia em
   * [brapi.dev/docs/acoes/migracao-v2](https://brapi.dev/docs/acoes/migracao-v2).
   *
   * ### O que a resposta traz
   *
   * Sempre: `symbol`, `shortName`, `currency`, `regularMarketPrice`,
   * `regularMarketChange`, `regularMarketChangePercent`, `regularMarketVolume`,
   * `regularMarketDayHigh`, `regularMarketDayLow`, `fiftyTwoWeekHigh`,
   * `fiftyTwoWeekLow` e `marketCap`.
   *
   * Com `range` e `interval`: `historicalDataPrice` com a série OHLCV. Com
   * `includeRaw=true` e intervalo diário: os campos `rawOpen`, `rawHigh`, `rawLow` e
   * `rawClose` quando existirem no banco. Intervalos intradiários não retornam
   * campos `raw*`. Com `dividends=true`: `dividendsData` com dividendos, JCP e
   * bonificações. Com `modules`: um objeto por módulo pedido.
   *
   * ### Parâmetros de histórico
   *
   * `interval` aceita `1d`, `5d`, `1wk`, `1mo` e `3mo`. `range` aceita `1d`, `5d`,
   * `1mo`, `3mo`, `6mo`, `1y`, `2y`, `5y`, `10y`, `ytd` e `max`. O quanto de
   * histórico você enxerga depende do plano.
   *
   * ### Módulos
   *
   * `modules` aceita uma lista separada por vírgula:
   *
   * - `summaryProfile` - cadastro da empresa: CNPJ, setor, descrição, site,
   *   funcionários
   * - `defaultKeyStatistics` - múltiplos nos últimos 12 meses: P/L, P/VP, ROE,
   *   dividend yield
   * - `financialData` - receita, EBITDA, margens e dívida nos últimos 12 meses
   * - `balanceSheetHistory` - balanço patrimonial anual
   * - `incomeStatementHistory` - DRE anual
   * - `cashflowHistory` - fluxo de caixa anual
   * - `valueAddedHistory` - DVA anual
   *
   * Cada módulo de histórico tem a versão trimestral com o sufixo `Quarterly`. Os
   * módulos `defaultKeyStatistics` e `financialData` também aceitam os sufixos
   * `History` e `HistoryQuarterly`.
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" \
   *   "https://brapi.dev/api/quote/PETR4?range=6mo&interval=1d&dividends=true&modules=defaultKeyStatistics"
   * ```
   *
   * ### Autenticação
   *
   * PETR4, MGLU3, VALE3 e ITUB4 respondem sem token, com todos os recursos. Se você
   * misturar um desses com outro ticker na mesma requisição, a chamada inteira passa
   * a exigir token. Envie o token no header `Authorization` sempre que a sua
   * ferramenta permitir.
   *
   * Os fundamentos vêm dos documentos que as companhias entregam à CVM.
   *
   * @example
   * ```ts
   * const quote = await client.quote.retrieve('PETR4,VALE3');
   * ```
   */
  retrieve(
    tickers: string,
    query: QuoteRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<QuoteRetrieveResponse> {
    return this._client.get(path`/api/quote/${tickers}`, { query, ...options });
  }

  /**
   * Lista paginada de ativos da B3 com a cotação de cada um. Serve para montar
   * screener, tabela de mercado ou autocomplete de busca.
   *
   * Busque por nome ou ticker com `search`, aceitando tanto "Petrobras" quanto
   * "PETR4". Filtre por `type` (`stock`, `fund`, `bdr`), por `subType` (units, FIIs,
   * ETFs, FI-Infra, FI-Agro, FIPs, FIDCs, BDRs) e por `sector`.
   *
   * Ordene com `sortBy` usando `volume`, `close`, `market_cap_basic` ou `name`, mais
   * `sortOrder`. Pagine com `page` e `limit`. O padrão devolve os primeiros 100
   * ativos.
   *
   * A resposta também traz `availableSectors` e `availableStockTypes`, então você
   * monta os filtros da sua interface sem manter uma lista fixa no código.
   *
   * ```bash
   * curl -H "Authorization: Bearer SEU_TOKEN" \
   *   "https://brapi.dev/api/quote/list?type=stock&sortBy=volume&sortOrder=desc&limit=10"
   * ```
   *
   * Exige token, disponível em qualquer plano. Para buscar e validar símbolos sem
   * carregar cotação, `/api/v2/tickers` é mais leve.
   *
   * @example
   * ```ts
   * const quotes = await client.quote.list();
   * ```
   */
  list(
    query: QuoteListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<QuoteListResponse> {
    return this._client.get('/api/quote/list', { query, ...options });
  }
}

export interface BalanceSheetEntry {
  /**
   * Fornecedores
   */
  accountsPayable: number | null;

  /**
   * Caixa
   */
  cash: number | null;

  /**
   * Data de referência
   */
  endDate: string;

  /**
   * Estoques
   */
  inventory: number | null;

  /**
   * Dívida de longo prazo
   */
  longTermDebt: number | null;

  /**
   * Investimentos de longo prazo
   */
  longTermInvestments: number | null;

  /**
   * Contas a receber
   */
  netReceivables: number | null;

  /**
   * Outros ativos
   */
  otherAssets: number | null;

  /**
   * Outros ativos circulantes
   */
  otherCurrentAssets: number | null;

  /**
   * Imobilizado
   */
  propertyPlantEquipment: number | null;

  /**
   * Dívida de curto/longo prazo
   */
  shortLongTermDebt: number | null;

  /**
   * Investimentos de curto prazo
   */
  shortTermInvestments: number | null;

  /**
   * Ticker do ativo
   */
  symbol: string;

  /**
   * Total de ativos
   */
  totalAssets: number | null;

  /**
   * Total ativo circulante
   */
  totalCurrentAssets: number | null;

  /**
   * Passivo circulante total
   */
  totalCurrentLiabilities: number | null;

  /**
   * Passivo total
   */
  totalLiab: number | null;

  /**
   * Patrimônio líquido
   */
  totalStockholderEquity: number | null;

  /**
   * Tipo (yearly, quarterly)
   */
  type: string;

  /**
   * Data de atualização
   */
  updatedAt: string | null;
}

/**
 * Dados financeiros e indicadores TTM
 */
export interface FinancialDataEntry {
  /**
   * Preço atual
   */
  currentPrice: number | null;

  /**
   * Liquidez corrente
   */
  currentRatio: number | null;

  /**
   * Dívida/PL
   */
  debtToEquity: number | null;

  /**
   * Crescimento do lucro do controlador (TTM) - variação dos últimos 4 trimestres em
   * relação aos 4 trimestres imediatamente anteriores, usando Lucro Líquido
   * Atribuível aos Controladores. Para crescimento anual (DRE de exercício vs.
   * exercício anterior), use earningsGrowthAnnual.
   */
  earningsGrowth: number | null;

  /**
   * Crescimento anual do lucro do controlador - variação do Lucro Líquido Atribuível
   * aos Controladores do último exercício social completo em relação ao exercício
   * anterior.
   */
  earningsGrowthAnnual: number | null;

  /**
   * EBITDA
   */
  ebitda: number | null;

  /**
   * Margem EBITDA
   */
  ebitdaMargins: number | null;

  /**
   * Moeda
   */
  financialCurrency: string | null;

  /**
   * Fluxo de caixa livre
   */
  freeCashflow: number | null;

  /**
   * Margem bruta
   */
  grossMargins: number | null;

  /**
   * Lucro bruto
   */
  grossProfits: number | null;

  /**
   * Fluxo de caixa operacional
   */
  operatingCashflow: number | null;

  /**
   * Margem operacional
   */
  operatingMargins: number | null;

  /**
   * Margem de lucro
   */
  profitMargins: number | null;

  /**
   * Liquidez seca
   */
  quickRatio: number | null;

  /**
   * ROA
   */
  returnOnAssets: number | null;

  /**
   * ROE
   */
  returnOnEquity: number | null;

  /**
   * Crescimento da receita (TTM) - variação da receita dos últimos 4 trimestres em
   * relação aos 4 trimestres imediatamente anteriores. Para crescimento anual (DRE
   * de exercício vs. exercício anterior), use revenueGrowthAnnual.
   */
  revenueGrowth: number | null;

  /**
   * Crescimento anual da receita - variação da Receita Líquida do último exercício
   * social completo em relação ao exercício anterior.
   */
  revenueGrowthAnnual: number | null;

  /**
   * Receita por ação
   */
  revenuePerShare: number | null;

  /**
   * Ticker do ativo
   */
  symbol: string;

  /**
   * Caixa total
   */
  totalCash: number | null;

  /**
   * Caixa por ação
   */
  totalCashPerShare: number | null;

  /**
   * Dívida total
   */
  totalDebt: number | null;

  /**
   * Receita total
   */
  totalRevenue: number | null;

  /**
   * Tipo (ttm, yearly, quarterly)
   */
  type: string | null;

  /**
   * Data de atualização
   */
  updatedAt: string | null;
}

export interface QuoteRetrieveResponse {
  /**
   * Data e hora da requisição em formato ISO 8601
   */
  requestedAt: string;

  results: Array<QuoteRetrieveResponse.Result>;

  /**
   * Tempo de processamento em milissegundos
   */
  took: number;

  /**
   * Dicas contextuais quando a requisição funciona mas existe um endpoint mais
   * adequado para o caso de uso.
   */
  guidance?: Array<QuoteRetrieveResponse.Guidance>;
}

export namespace QuoteRetrieveResponse {
  export interface Result {
    /**
     * Média do volume diário nos últimos 10 dias
     */
    averageDailyVolume10Day: number | null;

    /**
     * Média do volume diário nos últimos 3 meses
     */
    averageDailyVolume3Month: number | null;

    /**
     * Moeda na qual os valores são expressos (geralmente BRL)
     */
    currency: string;

    /**
     * Lucro Por Ação (LPA) TTM
     */
    earningsPerShare: number | null;

    /**
     * Preço máximo nas últimas 52 semanas
     */
    fiftyTwoWeekHigh: number | null;

    /**
     * Variação entre preço atual e máximo de 52 semanas
     */
    fiftyTwoWeekHighChange: number | null;

    /**
     * Variação percentual entre preço atual e máximo de 52 semanas
     */
    fiftyTwoWeekHighChangePercent: number | null;

    /**
     * Preço mínimo nas últimas 52 semanas
     */
    fiftyTwoWeekLow: number | null;

    /**
     * Variação entre preço atual e mínimo de 52 semanas
     */
    fiftyTwoWeekLowChange: number | null;

    /**
     * Intervalo de preço das últimas 52 semanas
     */
    fiftyTwoWeekRange: string | null;

    /**
     * URL do logo do ativo
     */
    logourl: string | null;

    /**
     * Nome completo da empresa
     */
    longName: string | null;

    /**
     * Capitalização de mercado total
     */
    marketCap: number | null;

    /**
     * Indicador Preço/Lucro (P/L)
     */
    priceEarnings: number | null;

    /**
     * Variação absoluta do preço no dia em relação ao fechamento anterior
     */
    regularMarketChange: number | null;

    /**
     * Variação percentual do preço no dia
     */
    regularMarketChangePercent: number | null;

    /**
     * Preço máximo atingido no dia
     */
    regularMarketDayHigh: number | null;

    /**
     * Preço mínimo atingido no dia
     */
    regularMarketDayLow: number | null;

    /**
     * Intervalo de preço do dia (Mínimo - Máximo)
     */
    regularMarketDayRange: string | null;

    /**
     * Preço de abertura no dia
     */
    regularMarketOpen: number | null;

    /**
     * Preço de fechamento do pregão anterior
     */
    regularMarketPreviousClose: number | null;

    /**
     * Preço atual ou do último negócio registrado
     */
    regularMarketPrice: number | null;

    /**
     * Data/hora da última atualização da cotação (ISO 8601)
     */
    regularMarketTime: string | null;

    /**
     * Volume financeiro negociado no dia
     */
    regularMarketVolume: number | null;

    /**
     * Nome curto ou abreviado da empresa
     */
    shortName: string | null;

    /**
     * Ticker (símbolo) do ativo (ex: PETR4, ^BVSP)
     */
    symbol: string;

    /**
     * Média móvel de 200 dias
     */
    twoHundredDayAverage: number | null;

    /**
     * Variação entre preço atual e média de 200 dias
     */
    twoHundredDayAverageChange: number | null;

    /**
     * Variação percentual entre preço atual e média de 200 dias
     */
    twoHundredDayAverageChangePercent: number | null;

    /**
     * Intervalo efetivamente utilizado para dados históricos
     */
    usedInterval: string | null;

    /**
     * Período efetivamente utilizado para dados históricos
     */
    usedRange: string | null;

    /**
     * Histórico anual do Balanço Patrimonial
     */
    balanceSheetHistory?: Array<QuoteAPI.BalanceSheetEntry>;

    /**
     * Histórico trimestral do Balanço Patrimonial
     */
    balanceSheetHistoryQuarterly?: Array<QuoteAPI.BalanceSheetEntry>;

    /**
     * Dados de dividendos (quando dividends=true)
     */
    dividendsData?: Result.DividendsData;

    /**
     * Dados financeiros e indicadores TTM
     */
    financialData?: QuoteAPI.FinancialDataEntry;

    /**
     * Histórico anual de dados financeiros
     */
    financialDataHistory?: Array<QuoteAPI.FinancialDataEntry>;

    /**
     * Histórico trimestral de dados financeiros
     */
    financialDataHistoryQuarterly?: Array<QuoteAPI.FinancialDataEntry>;

    /**
     * Série histórica de preços (quando range/interval fornecidos)
     */
    historicalDataPrice?: Array<Result.HistoricalDataPrice>;

    /**
     * Perfil da empresa (quando modules inclui summaryProfile)
     */
    summaryProfile?: Result.SummaryProfile;

    /**
     * Valores válidos para o parâmetro interval
     */
    validIntervals?: Array<string>;

    /**
     * Valores válidos para o parâmetro range
     */
    validRanges?: Array<string>;
  }

  export namespace Result {
    /**
     * Dados de dividendos (quando dividends=true)
     */
    export interface DividendsData {
      /**
       * Histórico de dividendos e JCP em dinheiro
       */
      cashDividends: Array<DividendsData.CashDividend>;

      /**
       * Histórico de bonificações e desdobramentos
       */
      stockDividends: Array<DividendsData.StockDividend>;

      /**
       * Histórico de subscrições
       */
      subscriptions: Array<unknown>;
    }

    export namespace DividendsData {
      export interface CashDividend {
        /**
         * Data de aprovação
         */
        approvedOn: string | null;

        /**
         * Código ISIN do ativo emissor
         */
        assetIssued: string;

        /**
         * Data ex (primeiro dia sem direito ao provento)
         */
        exDate: string | null;

        /**
         * Código ISIN
         */
        isinCode: string;

        /**
         * Tipo (DIVIDENDO, JCP)
         */
        label: string;

        /**
         * Data-com (último dia antes da data ex)
         */
        lastDatePrior: string | null;

        /**
         * Data de pagamento
         */
        paymentDate: string | null;

        /**
         * Valor por ação
         */
        rate: number;

        /**
         * Período de referência
         */
        relatedTo: string;

        /**
         * Observações
         */
        remarks: string;

        /**
         * Valor por ação convertido para a escala dos preços brutos com base histórica.
         * Retornado com includeRaw=true.
         */
        rawRate?: number | null;
      }

      export interface StockDividend {
        /**
         * Data de aprovação
         */
        approvedOn: string | null;

        /**
         * Código ISIN do ativo emissor
         */
        assetIssued: string;

        /**
         * Fator completo (ex: 2 para 1)
         */
        completeFactor: string;

        /**
         * Data ex do evento corporativo
         */
        exDate: string | null;

        /**
         * Fator do desdobramento/grupamento
         */
        factor: number;

        /**
         * Código ISIN
         */
        isinCode: string;

        /**
         * Tipo (DESDOBRAMENTO, GRUPAMENTO)
         */
        label: string;

        /**
         * Data de corte
         */
        lastDatePrior: string | null;

        /**
         * Observações
         */
        remarks: string;
      }
    }

    export interface HistoricalDataPrice {
      /**
       * Preço de fechamento ajustado para proventos (dividendos, JCP, bonificações,
       * etc.) e desdobramentos/grupamentos.
       */
      adjustedClose: number;

      /**
       * Preço de fechamento do ativo no intervalo.
       */
      close: number;

      /**
       * Data do pregão ou do ponto de dados, representada como um timestamp UNIX (número
       * de segundos desde 1970-01-01 UTC).
       */
      date: number;

      /**
       * Preço máximo atingido pelo ativo no intervalo.
       */
      high: number;

      /**
       * Preço mínimo atingido pelo ativo no intervalo.
       */
      low: number;

      /**
       * Preço de abertura do ativo no intervalo (dia, semana, mês, etc.).
       */
      open: number;

      /**
       * Volume financeiro negociado no intervalo.
       */
      volume: number;

      /**
       * Preço de fechamento original armazenado no banco da brapi. Retornado com
       * includeRaw=true em intervalos diários no plano Pro. Pode ser nulo quando não
       * houver valor no banco.
       */
      rawClose?: number | null;

      /**
       * Preço máximo original armazenado no banco da brapi. Retornado com
       * includeRaw=true em intervalos diários no plano Pro. Pode ser nulo quando não
       * houver valor no banco.
       */
      rawHigh?: number | null;

      /**
       * Preço mínimo original armazenado no banco da brapi. Retornado com
       * includeRaw=true em intervalos diários no plano Pro. Pode ser nulo quando não
       * houver valor no banco.
       */
      rawLow?: number | null;

      /**
       * Preço de abertura original armazenado no banco da brapi. Retornado com
       * includeRaw=true em intervalos diários no plano Pro. Pode ser nulo quando não
       * houver valor no banco.
       */
      rawOpen?: number | null;
    }

    /**
     * Perfil da empresa (quando modules inclui summaryProfile)
     */
    export interface SummaryProfile {
      /**
       * Endereço linha 1
       */
      address1: string | null;

      /**
       * Endereço linha 2
       */
      address2: string | null;

      /**
       * Endereço linha 3
       */
      address3: string | null;

      /**
       * Cidade
       */
      city: string | null;

      /**
       * CNPJ da empresa
       */
      cnpj: string | null;

      /**
       * Diretoria
       */
      companyOfficers: Array<unknown>;

      /**
       * País
       */
      country: string | null;

      /**
       * Fax
       */
      fax: string | null;

      /**
       * Número de funcionários
       */
      fullTimeEmployees: number | null;

      /**
       * Setor
       */
      industry: string | null;

      /**
       * Nome do setor
       */
      industryDisp: string | null;

      /**
       * Chave do setor
       */
      industryKey: string | null;

      /**
       * Descrição da empresa
       */
      longBusinessSummary: string | null;

      /**
       * Telefone
       */
      phone: string | null;

      /**
       * Segmento
       */
      sector: string | null;

      /**
       * Nome do segmento
       */
      sectorDisp: string | null;

      /**
       * Chave do segmento
       */
      sectorKey: string | null;

      /**
       * Estado
       */
      state: string | null;

      /**
       * Ticker do ativo
       */
      symbol: string;

      /**
       * Data de atualização
       */
      updatedAt: string | null;

      /**
       * Website
       */
      website: string | null;

      /**
       * CEP
       */
      zip: string | null;
    }
  }

  export interface Guidance {
    code: string;

    details: Guidance.Details;

    message: string;
  }

  export namespace Guidance {
    export interface Details {
      reason: string;

      suggestedEndpoint: string;
    }
  }
}

export interface QuoteListResponse {
  availableSectors: Array<string>;

  availableStockTypes: Array<string>;

  availableSubsectors: Array<string>;

  availableSubTypeTypes: Array<string>;

  indexes: Array<QuoteListResponse.Index>;

  stocks: Array<QuoteListResponse.Stock>;

  currentPage?: number;

  hasNextPage?: boolean;

  itemsPerPage?: number;

  totalCount?: number;

  totalPages?: number;
}

export namespace QuoteListResponse {
  export interface Index {
    name: string;

    stock: string;
  }

  export interface Stock {
    /**
     * Variação percentual
     */
    change: number | null;

    /**
     * Preço de fechamento
     */
    close: number | null;

    /**
     * URL do logo
     */
    logo: string | null;

    /**
     * Capitalização de mercado
     */
    market_cap: number | null;

    /**
     * Nome da empresa
     */
    name: string;

    /**
     * Setor
     */
    sector: string | null;

    /**
     * Ticker do ativo
     */
    stock: string;

    /**
     * Subsetor B3
     */
    subsector: string | null;

    /**
     * Classificação aditiva do ativo: stock, unit, fii, etf, fi-infra, fi-agro, fip,
     * fidc ou bdr
     */
    subType: string | null;

    /**
     * Tipo do ativo
     */
    type: string | null;

    /**
     * Volume negociado
     */
    volume: number | null;
  }
}

export interface QuoteRetrieveParams {
  /**
   * Token de autenticação (alternativa ao header Authorization)
   */
  token?: string;

  /**
   * Incluir histórico de dividendos e JCP
   */
  dividends?: 'true' | 'false';

  /**
   * Data final para dados históricos (formato YYYY-MM-DD)
   */
  endDate?: string;

  /**
   * Incluir preços OHLC originais armazenados no banco da brapi para intervalos
   * diários. Use includeRaw=true. Disponível no plano Pro.
   */
  includeRaw?: 'true' | 'false';

  /**
   * Intervalo/granularidade dos dados históricos
   */
  interval?: '1m' | '2m' | '5m' | '15m' | '30m' | '60m' | '90m' | '1h' | '1d' | '5d' | '1wk' | '1mo' | '3mo';

  /**
   * Módulos de dados adicionais separados por vírgula
   */
  modules?: string;

  /**
   * Período para dados históricos de preço
   */
  range?: '1d' | '2d' | '5d' | '7d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max';

  /**
   * Data inicial para dados históricos (formato YYYY-MM-DD)
   */
  startDate?: string;
}

export interface QuoteListParams {
  /**
   * Token de autenticação (alternativa ao header Authorization)
   */
  token?: string;

  /**
   * Número máximo de resultados
   */
  limit?: string;

  /**
   * Número da página (paginação)
   */
  page?: string;

  /**
   * Termo de busca para filtrar ativos
   */
  search?: string;

  /**
   * Filtrar por setor
   */
  sector?: string;

  /**
   * Campo para ordenação
   */
  sortBy?: 'name' | 'close' | 'change' | 'change_abs' | 'volume' | 'market_cap_basic';

  /**
   * Ordem de classificação
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Filtrar pelo subsetor B3
   */
  subsector?: string;

  /**
   * Filtrar por classificação aditiva: stock, unit, fii, etf, fi-infra, fi-agro,
   * fip, fidc ou bdr
   */
  subType?: 'stock' | 'unit' | 'fii' | 'etf' | 'fi-infra' | 'fi-agro' | 'fip' | 'fidc' | 'bdr';

  /**
   * Filtrar por tipo de ativo
   */
  type?: 'stock' | 'fund' | 'bdr';
}

export declare namespace Quote {
  export {
    type BalanceSheetEntry as BalanceSheetEntry,
    type FinancialDataEntry as FinancialDataEntry,
    type QuoteRetrieveResponse as QuoteRetrieveResponse,
    type QuoteListResponse as QuoteListResponse,
    type QuoteRetrieveParams as QuoteRetrieveParams,
    type QuoteListParams as QuoteListParams,
  };
}
