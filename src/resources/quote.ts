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
   * **O ENDPOINT MAIS IMPORTANTE DA API.** Obtém dados detalhados e abrangentes de
   * um ou múltiplos ativos (ações, FIIs, BDRs) em uma única requisição. Combine
   * cotações em tempo real, dados históricos, fundamentos e dividendos conforme
   * necessário.
   *
   * ### Funcionalidades:
   *
   * - **Cotação em Tempo Real:** Preço atual, variação absoluta e percentual,
   *   volume, máxima/mínima do dia, range de 52 semanas.
   * - **Dados Históricos:** Preços OHLCV (Open, High, Low, Close, Volume) com
   *   intervalos flexíveis (1d, 5d, 1wk, 1mo, 3mo) e períodos (1d até max).
   * - **Fundamentos:** Balanço Patrimonial, DRE, Fluxo de Caixa, DVA,
   *   Indicadores-chave (P/L, P/VP, ROE, etc) via parâmetro `modules`.
   * - **Dividendos:** Histórico completo de proventos em dinheiro (dividendos, JCP)
   *   e bonificações.
   *
   * ### Autenticação:
   *
   * Requer token Bearer no header ou como query param. Tickers de teste **PETR4** e
   * **VALE3** funcionam sem autenticação.
   *
   * ```bash
   * # Via header (recomendado)
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/quote/PETR4"
   *
   * # Via query param
   * curl "https://brapi.dev/api/quote/PETR4?token=SEU_TOKEN"
   * ```
   *
   * ### Exemplos de Requisição:
   *
   * ```bash
   * # Simples: apenas cotação atual
   * curl "https://brapi.dev/api/quote/PETR4?token=SEU_TOKEN"
   *
   * # Múltiplos tickers em uma requisição
   * curl "https://brapi.dev/api/quote/PETR4,VALE3,ITUB4?token=SEU_TOKEN"
   *
   * # Com dados históricos (últimos 12 meses, diário)
   * curl "https://brapi.dev/api/quote/PETR4?range=1y&interval=1d&token=SEU_TOKEN"
   *
   * # Com módulos de fundamentos (balanço e DRE)
   * curl "https://brapi.dev/api/quote/PETR4?modules=balanceSheetHistory,incomeStatementHistory&token=SEU_TOKEN"
   *
   * # Completo: histórico + dividendos + estatísticas-chave
   * curl "https://brapi.dev/api/quote/PETR4?range=6mo&interval=1d&dividends=true&modules=balanceSheetHistory,defaultKeyStatistics&token=SEU_TOKEN"
   * ```
   *
   * ### Módulos Disponíveis:
   *
   * - `summaryProfile` — Perfil da empresa (CNPJ, setor, descrição, website,
   *   funcionários)
   * - `balanceSheetHistory` — Balanço Patrimonial anual
   * - `balanceSheetHistoryQuarterly` — Balanço Patrimonial trimestral
   * - `incomeStatementHistory` — DRE anual (Demonstração de Resultado do Exercício)
   * - `incomeStatementHistoryQuarterly` — DRE trimestral
   * - `financialData` — Indicadores financeiros atuais (TTM - Trailing Twelve
   *   Months)
   * - `financialDataHistory` — Histórico anual de indicadores financeiros
   * - `financialDataHistoryQuarterly` — Histórico trimestral de indicadores
   *   financeiros
   * - `defaultKeyStatistics` — Estatísticas-chave (P/L, P/VP, ROE, Dividend Yield,
   *   etc)
   * - `defaultKeyStatisticsHistory` — Histórico anual de estatísticas-chave
   * - `defaultKeyStatisticsHistoryQuarterly` — Histórico trimestral de
   *   estatísticas-chave
   * - `cashflowHistory` — Fluxo de Caixa anual
   * - `cashflowHistoryQuarterly` — Fluxo de Caixa trimestral
   * - `valueAddedHistory` — DVA anual (Demonstração de Valor Adicionado)
   * - `valueAddedHistoryQuarterly` — DVA trimestral
   *
   * ### Intervalos Válidos (histórico):
   *
   * - `1d` — Diário
   * - `5d` — 5 dias
   * - `1wk` — Semanal
   * - `1mo` — Mensal
   * - `3mo` — Trimestral
   *
   * ### Períodos Válidos (range):
   *
   * - `1d` — Último dia
   * - `5d` — Últimos 5 dias
   * - `1mo` — Último mês
   * - `3mo` — Últimos 3 meses
   * - `6mo` — Últimos 6 meses
   * - `1y` — Último ano
   * - `2y` — Últimos 2 anos
   * - `5y` — Últimos 5 anos
   * - `10y` — Últimos 10 anos
   * - `ytd` — Ano até hoje
   * - `max` — Máximo disponível
   *
   * ### Campos Principais da Resposta:
   *
   * - `symbol` — Ticker do ativo (ex: PETR4)
   * - `shortName` — Nome curto da empresa
   * - `currency` — Moeda (BRL)
   * - `regularMarketPrice` — Preço atual em BRL
   * - `regularMarketChange` — Variação absoluta
   * - `regularMarketChangePercent` — Variação percentual (%)
   * - `regularMarketVolume` — Volume de negociação do dia
   * - `regularMarketDayHigh` — Máxima do dia
   * - `regularMarketDayLow` — Mínima do dia
   * - `fiftyTwoWeekHigh` — Máxima de 52 semanas
   * - `fiftyTwoWeekLow` — Mínima de 52 semanas
   * - `marketCap` — Capitalização de mercado
   * - `historicalDataPrice` — Array de dados OHLCV (quando `range`/`interval`
   *   fornecidos)
   * - `dividendsData` — Histórico de dividendos (quando `dividends=true`)
   *
   * ### Tickers Populares (Teste):
   *
   * - `PETR4` — Petrobras (Energia)
   * - `VALE3` — Vale (Mineração)
   * - `ITUB4` — Itaú Unibanco (Financeiro)
   * - `BBDC4` — Bradesco (Financeiro)
   * - `ABEV3` — Ambev (Consumo)
   * - `WEGE3` — WEG (Indústria)
   * - `RENT3` — Localiza (Transporte)
   * - `BBAS3` — Banco do Brasil (Financeiro)
   * - `MGLU3` — Magazine Luiza (Varejo)
   *
   * ### Fonte dos Dados:
   *
   * CVM (Comissão de Valores Mobiliários)
   *
   * **Plano Mínimo:** Gratuito (limitado a 1 ticker/requisição e módulos básicos)
   * **Autenticação:** Necessária para produção (tickers de teste PETR4 e VALE3
   * funcionam sem token)
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
   * Retorna uma lista paginada de todos os ativos disponíveis na API (Ações, FIIs,
   * BDRs, ETFs, Índices). Use este endpoint para construir screeners, exploradores
   * de ações ou para descobrir novos ativos.
   *
   * ### Funcionalidades:
   *
   * - **Busca por Nome ou Ticker:** Encontre ativos digitando "Petrobras", "PETR4"
   *   ou qualquer termo.
   * - **Filtros por Tipo:** Ações (stock), Fundos Imobiliários (fund), BDRs (bdr).
   * - **Filtros por Subtipo:** Units, FIIs, ETFs, FI-Infra, FI-Agro, FIPs, FIDCs e
   *   BDRs via `subType`.
   * - **Filtros por Setor:** Energia, Financeiro, Tecnologia, Saúde, etc.
   * - **Ordenação Flexível:** Ordene por volume, preço, market cap ou nome.
   * - **Paginação:** Controle o número de resultados com `limit` e `page`.
   *
   * ### Autenticação:
   *
   * Requer token Bearer. Obtenha seu token em
   * [brapi.dev/dashboard](https://brapi.dev/dashboard).
   *
   * ### Exemplos de Requisição:
   *
   * ```bash
   * # Listar todos os ativos (primeiros 100)
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/quote/list"
   *
   * # Buscar por nome ou ticker
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/quote/list?search=petrobras"
   *
   * # Filtrar por tipo e ordenar por volume
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/quote/list?type=stock&sortBy=volume&sortOrder=desc&limit=10"
   *
   * # Filtrar por subtipo
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/quote/list?subType=fi-agro&limit=10"
   *
   * # Listar apenas FIIs de um setor específico
   * curl -H "Authorization: Bearer SEU_TOKEN" "https://brapi.dev/api/quote/list?type=fund&sector=Logística&limit=20"
   * ```
   *
   * ### Parâmetros de Ordenação:
   *
   * - `volume` — Volume de negociação do dia
   * - `close` — Preço de fechamento
   * - `market_cap_basic` — Capitalização de mercado
   * - `name` — Nome da empresa (alfabético)
   *
   * ### Tipos de Ativo:
   *
   * - `stock` — Ações (Ações ordinárias e preferenciais)
   * - `fund` — Fundos Imobiliários (FIIs) e ETFs
   * - `bdr` — BDRs (Brazilian Depositary Receipts)
   *
   * **Plano Mínimo:** Gratuito **Autenticação:** Necessária (Bearer Token)
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
   * Crescimento do lucro do controlador (TTM) — variação dos últimos 4 trimestres em
   * relação aos 4 trimestres imediatamente anteriores, usando Lucro Líquido
   * Atribuível aos Controladores. Para crescimento anual (DRE de exercício vs.
   * exercício anterior), use earningsGrowthAnnual.
   */
  earningsGrowth: number | null;

  /**
   * Crescimento anual do lucro do controlador — variação do Lucro Líquido Atribuível
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
   * Crescimento da receita (TTM) — variação da receita dos últimos 4 trimestres em
   * relação aos 4 trimestres imediatamente anteriores. Para crescimento anual (DRE
   * de exercício vs. exercício anterior), use revenueGrowthAnnual.
   */
  revenueGrowth: number | null;

  /**
   * Crescimento anual da receita — variação da Receita Líquida do último exercício
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
