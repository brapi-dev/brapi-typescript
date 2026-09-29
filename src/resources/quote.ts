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
   * Cotação de um ou mais ativos brasileiros. A mesma resposta pode trazer histórico
   * de preços, proventos e dados das demonstrações financeiras.
   *
   * Use para integrações que já usam este formato. Para integrações novas, use os
   * endpoints `/api/v2/stocks/*`, que trazem um tipo de dado por chamada. Veja o
   * [guia de migração](https://brapi.dev/docs/acoes/migracao-v2).
   *
   * Este é o endpoint original da brapi. Ele continua ativo e não tem data de
   * remoção.
   *
   * A resposta sempre traz a cotação: preço, variação, volume, máxima e mínima do
   * dia, faixa de 52 semanas e `marketCap`. Estes parâmetros adicionam outros dados:
   *
   * - `range` e `interval`, ou `startDate` e `endDate`: `historicalDataPrice`, a
   *   série de preços.
   * - `includeRaw=true`: os preços originais sem ajuste `rawOpen`, `rawHigh`,
   *   `rawLow` e `rawClose`, só em intervalos diários. Exige o plano Pro.
   * - `dividends=true`: `dividendsData`, com dividendos, JCP e eventos em ações.
   * - `modules`: um objeto para cada módulo pedido.
   *
   * Módulos aceitos em `modules`, separados por vírgula:
   *
   * - `summaryProfile`: cadastro da empresa.
   * - `defaultKeyStatistics`: múltiplos dos últimos 12 meses, como P/L, P/VP e
   *   dividend yield.
   * - `financialData`: receita, EBITDA, margens e dívida dos últimos 12 meses.
   * - `balanceSheetHistory`: balanço patrimonial anual.
   * - `incomeStatementHistory`: DRE anual.
   * - `cashflowHistory`: fluxo de caixa anual.
   * - `valueAddedHistory`: DVA anual.
   *
   * Cada módulo de demonstração tem uma versão trimestral com o sufixo `Quarterly`,
   * como `balanceSheetHistoryQuarterly`. `defaultKeyStatistics` e `financialData`
   * também aceitam os sufixos `History` e `HistoryQuarterly`. Os dados trimestrais
   * seguem as mesmas regras dos endpoints v2 de
   * [DRE](https://brapi.dev/docs/acoes/dre),
   * [fluxo de caixa](https://brapi.dev/docs/acoes/fluxo-de-caixa) e
   * [DVA](https://brapi.dev/docs/acoes/valor-adicionado).
   *
   * O plano define os valores aceitos em `range`, `interval` e `modules`. Um valor
   * fora do plano retorna erro.
   *
   * PETR4, MGLU3, VALE3 e ITUB4 respondem sem token. Se a chamada juntar um deles
   * com outro ticker, ela exige token.
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
   * Lista de ações, FIIs, BDRs e ETFs com preço de fechamento, variação, volume,
   * market cap, setor e logo de cada um. A resposta também traz os índices
   * disponíveis.
   *
   * Use para screeners, tabelas de mercado e busca de ativos com cotação.
   *
   * `search` busca por parte do ticker ou do nome da empresa. Filtre por `type`,
   * `subType`, `sector` e `subsector`. A ordem padrão é por volume, decrescente.
   *
   * Sem `limit`, a resposta traz até 2.000 ativos e não traz os campos de paginação.
   * Com `limit`, ela traz `currentPage`, `totalPages`, `itemsPerPage`, `totalCount`
   * e `hasNextPage`.
   *
   * `availableSectors`, `availableSubsectors`, `availableStockTypes` e
   * `availableSubTypeTypes` listam os valores aceitos nos filtros.
   *
   * Este endpoint não exige token. Para buscar e validar tickers, a
   * [lista de tickers](https://brapi.dev/docs/tickers) traz uma resposta menor.
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
 * Dados financeiros dos últimos 12 meses.
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
   * Crescimento do lucro atribuível aos controladores nos últimos 4 trimestres,
   * contra os 4 trimestres anteriores. Para a variação anual, use
   * `earningsGrowthAnnual`.
   */
  earningsGrowth: number | null;

  /**
   * Crescimento do lucro atribuível aos controladores no último exercício completo,
   * contra o exercício anterior.
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
   * Crescimento da receita nos últimos 4 trimestres, contra os 4 trimestres
   * anteriores. Para a variação anual, use `revenueGrowthAnnual`.
   */
  revenueGrowth: number | null;

  /**
   * Crescimento da receita líquida no último exercício completo, contra o exercício
   * anterior.
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
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<QuoteRetrieveResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;

  /**
   * Dicas que apontam um endpoint mais adequado para o pedido. A requisição funciona
   * mesmo assim.
   */
  guidance?: Array<QuoteRetrieveResponse.Guidance>;
}

export namespace QuoteRetrieveResponse {
  export interface Result {
    /**
     * Volume médio diário dos últimos 10 dias.
     */
    averageDailyVolume10Day: number | null;

    /**
     * Volume médio diário dos últimos 3 meses.
     */
    averageDailyVolume3Month: number | null;

    /**
     * Moeda dos valores. Em geral, BRL.
     */
    currency: string;

    /**
     * Lucro por ação (LPA) dos últimos 12 meses.
     */
    earningsPerShare: number | null;

    /**
     * Preço máximo das últimas 52 semanas.
     */
    fiftyTwoWeekHigh: number | null;

    /**
     * Diferença entre o preço atual e o máximo de 52 semanas.
     */
    fiftyTwoWeekHighChange: number | null;

    /**
     * Diferença entre o preço atual e o máximo de 52 semanas, em porcentagem.
     */
    fiftyTwoWeekHighChangePercent: number | null;

    /**
     * Preço mínimo das últimas 52 semanas.
     */
    fiftyTwoWeekLow: number | null;

    /**
     * Diferença entre o preço atual e o mínimo de 52 semanas.
     */
    fiftyTwoWeekLowChange: number | null;

    /**
     * Faixa de preço das últimas 52 semanas no formato mínimo - máximo.
     */
    fiftyTwoWeekRange: string | null;

    /**
     * URL do logo do ativo.
     */
    logourl: string | null;

    /**
     * Nome completo da empresa.
     */
    longName: string | null;

    /**
     * Valor de mercado, em reais.
     */
    marketCap: number | null;

    /**
     * Preço sobre lucro (P/L).
     */
    priceEarnings: number | null;

    /**
     * Variação do preço no dia em relação ao fechamento anterior, em reais.
     */
    regularMarketChange: number | null;

    /**
     * Variação do preço no dia, em porcentagem.
     */
    regularMarketChangePercent: number | null;

    /**
     * Preço máximo do dia.
     */
    regularMarketDayHigh: number | null;

    /**
     * Preço mínimo do dia.
     */
    regularMarketDayLow: number | null;

    /**
     * Faixa de preço do dia no formato mínimo - máximo.
     */
    regularMarketDayRange: string | null;

    /**
     * Preço de abertura do dia.
     */
    regularMarketOpen: number | null;

    /**
     * Fechamento do pregão anterior.
     */
    regularMarketPreviousClose: number | null;

    /**
     * Preço do último negócio.
     */
    regularMarketPrice: number | null;

    /**
     * Horário da cotação em ISO 8601.
     */
    regularMarketTime: string | null;

    /**
     * Volume negociado no dia.
     */
    regularMarketVolume: number | null;

    /**
     * Nome curto do ativo.
     */
    shortName: string | null;

    /**
     * Ticker do ativo. Ex.: PETR4, ^BVSP.
     */
    symbol: string;

    /**
     * Média móvel de 200 dias.
     */
    twoHundredDayAverage: number | null;

    /**
     * Diferença entre o preço atual e a média de 200 dias.
     */
    twoHundredDayAverageChange: number | null;

    /**
     * Diferença entre o preço atual e a média de 200 dias, em porcentagem.
     */
    twoHundredDayAverageChangePercent: number | null;

    /**
     * Intervalo usado na série de preços.
     */
    usedInterval: string | null;

    /**
     * Janela usada na série de preços.
     */
    usedRange: string | null;

    /**
     * Balanço patrimonial anual.
     */
    balanceSheetHistory?: Array<QuoteAPI.BalanceSheetEntry>;

    /**
     * Balanço patrimonial trimestral.
     */
    balanceSheetHistoryQuarterly?: Array<QuoteAPI.BalanceSheetEntry>;

    /**
     * Proventos. Vem com `dividends=true`.
     */
    dividendsData?: Result.DividendsData;

    /**
     * Dados financeiros dos últimos 12 meses.
     */
    financialData?: QuoteAPI.FinancialDataEntry;

    /**
     * Dados financeiros anuais.
     */
    financialDataHistory?: Array<QuoteAPI.FinancialDataEntry>;

    /**
     * Dados financeiros trimestrais.
     */
    financialDataHistoryQuarterly?: Array<QuoteAPI.FinancialDataEntry>;

    /**
     * Série de preços. Vem quando a requisição define a janela.
     */
    historicalDataPrice?: Array<Result.HistoricalDataPrice>;

    /**
     * Cadastro da empresa. Vem com o módulo `summaryProfile`.
     */
    summaryProfile?: Result.SummaryProfile;

    /**
     * Valores aceitos em `interval`.
     */
    validIntervals?: Array<string>;

    /**
     * Valores aceitos em `range`.
     */
    validRanges?: Array<string>;
  }

  export namespace Result {
    /**
     * Proventos. Vem com `dividends=true`.
     */
    export interface DividendsData {
      /**
       * Dividendos e JCP pagos em dinheiro.
       */
      cashDividends: Array<DividendsData.CashDividend>;

      /**
       * Eventos em ações: desdobramentos, grupamentos e bonificações.
       */
      stockDividends: Array<DividendsData.StockDividend>;

      /**
       * Direitos de subscrição.
       */
      subscriptions: Array<unknown>;
    }

    export namespace DividendsData {
      export interface CashDividend {
        /**
         * Data de aprovação.
         */
        approvedOn: string | null;

        /**
         * Código ISIN do ativo que dá direito ao provento.
         */
        assetIssued: string;

        /**
         * Data ex, o primeiro dia sem direito ao provento. Pode ser nulo.
         */
        exDate: string | null;

        /**
         * Código ISIN.
         */
        isinCode: string;

        /**
         * Tipo do provento: DIVIDENDO ou JCP.
         */
        label: string;

        /**
         * Data-com, o último dia para comprar o ativo e ter direito ao provento.
         */
        lastDatePrior: string | null;

        /**
         * Data de pagamento.
         */
        paymentDate: string | null;

        /**
         * Valor por ação, em reais.
         */
        rate: number;

        /**
         * Período a que o provento se refere. Ex.: 1º Trimestre/2024.
         */
        relatedTo: string;

        /**
         * Observações.
         */
        remarks: string;

        /**
         * Valor por ação na escala dos preços sem ajuste. Vem com `includeRaw=true`.
         */
        rawRate?: number | null;
      }

      export interface StockDividend {
        /**
         * Data de aprovação.
         */
        approvedOn: string | null;

        /**
         * Código ISIN do ativo que dá direito ao provento.
         */
        assetIssued: string;

        /**
         * Fator em texto. Ex.: 2 para 1.
         */
        completeFactor: string;

        /**
         * Data ex, o primeiro dia sem direito ao evento. Pode ser nulo.
         */
        exDate: string | null;

        /**
         * Fator do evento. Ex.: 2 em um desdobramento de 2 para 1.
         */
        factor: number;

        /**
         * Código ISIN.
         */
        isinCode: string;

        /**
         * Tipo do evento: DESDOBRAMENTO, GRUPAMENTO ou BONIFICAÇÃO.
         */
        label: string;

        /**
         * Data-com, o último dia para comprar o ativo e ter direito ao evento.
         */
        lastDatePrior: string | null;

        /**
         * Observações.
         */
        remarks: string;
      }
    }

    export interface HistoricalDataPrice {
      /**
       * Fechamento ajustado por proventos, desdobramentos e grupamentos. Use para
       * calcular retorno.
       */
      adjustedClose: number;

      /**
       * Preço de fechamento no intervalo.
       */
      close: number;

      /**
       * Data do ponto em Unix timestamp, em segundos.
       */
      date: number;

      /**
       * Preço máximo no intervalo.
       */
      high: number;

      /**
       * Preço mínimo no intervalo.
       */
      low: number;

      /**
       * Preço de abertura no intervalo.
       */
      open: number;

      /**
       * Volume negociado no intervalo.
       */
      volume: number;

      /**
       * Preço de fechamento original, sem ajuste. Vem com `includeRaw=true` em
       * intervalos diários. Pode ser nulo.
       */
      rawClose?: number | null;

      /**
       * Preço máximo original, sem ajuste. Vem com `includeRaw=true` em intervalos
       * diários. Pode ser nulo.
       */
      rawHigh?: number | null;

      /**
       * Preço mínimo original, sem ajuste. Vem com `includeRaw=true` em intervalos
       * diários. Pode ser nulo.
       */
      rawLow?: number | null;

      /**
       * Preço de abertura original, sem ajuste. Vem com `includeRaw=true` em intervalos
       * diários. Pode ser nulo.
       */
      rawOpen?: number | null;
    }

    /**
     * Cadastro da empresa. Vem com o módulo `summaryProfile`.
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
     * Variação no dia, em porcentagem.
     */
    change: number | null;

    /**
     * Último preço.
     */
    close: number | null;

    /**
     * URL do logo.
     */
    logo: string | null;

    /**
     * Valor de mercado, em reais.
     */
    market_cap: number | null;

    /**
     * Nome da empresa.
     */
    name: string;

    /**
     * Setor.
     */
    sector: string | null;

    /**
     * Ticker do ativo.
     */
    stock: string;

    /**
     * Subsetor.
     */
    subsector: string | null;

    /**
     * Subtipo do ativo: stock, unit, fii, etf, fi-infra, fi-agro, fip, fidc ou bdr.
     */
    subType: string | null;

    /**
     * Tipo do ativo.
     */
    type: string | null;

    /**
     * Volume negociado.
     */
    volume: number | null;
  }
}

export interface QuoteRetrieveParams {
  /**
   * Token de acesso. Use no lugar do header `Authorization`.
   */
  token?: string;

  /**
   * Inclui `dividendsData` com dividendos, JCP e eventos em ações.
   */
  dividends?: 'true' | 'false';

  /**
   * Data final da série de preços no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Inclui os preços originais sem ajuste (`rawOpen`, `rawHigh`, `rawLow`,
   * `rawClose`) em intervalos diários. Exige o plano Pro.
   */
  includeRaw?: 'true' | 'false';

  /**
   * Intervalo entre os pontos da série de preços.
   */
  interval?: '1m' | '2m' | '5m' | '15m' | '30m' | '60m' | '90m' | '1h' | '1d' | '5d' | '1wk' | '1mo' | '3mo';

  /**
   * Módulos extras separados por vírgula.
   */
  modules?: string;

  /**
   * Janela relativa da série de preços.
   */
  range?: '1d' | '2d' | '5d' | '7d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max';

  /**
   * Data inicial da série de preços no formato YYYY-MM-DD.
   */
  startDate?: string;
}

export interface QuoteListParams {
  /**
   * Token de acesso. Use no lugar do header `Authorization`.
   */
  token?: string;

  /**
   * Itens por página. Máximo: 2000. Sem este parâmetro, a resposta traz até 2000
   * itens e não traz paginação.
   */
  limit?: string;

  /**
   * Número da página. Começa em 1.
   */
  page?: string;

  /**
   * Parte do ticker ou do nome da empresa.
   */
  search?: string;

  /**
   * Setor.
   */
  sector?: string;

  /**
   * Campo de ordenação. Padrão: volume.
   */
  sortBy?: 'name' | 'close' | 'change' | 'change_abs' | 'volume' | 'market_cap_basic';

  /**
   * Ordem. Padrão: desc.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Subsetor.
   */
  subsector?: string;

  /**
   * Subtipo do ativo: stock, unit, fii, etf, fi-infra, fi-agro, fip, fidc ou bdr.
   */
  subType?: 'stock' | 'unit' | 'fii' | 'etf' | 'fi-infra' | 'fi-agro' | 'fip' | 'fidc' | 'bdr';

  /**
   * Tipo do ativo.
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
