// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as QuoteAPI from '../quote';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Stocks extends APIResource {
  /**
   * Ativo, passivo e patrimônio líquido de empresas listadas, com base nos
   * demonstrativos entregues à CVM. Uma linha por período, do mais recente para o
   * mais antigo.
   *
   * Use para analisar endividamento, liquidez e estrutura de capital.
   *
   * O padrão é `period=annual`. Use `period=quarterly` para trimestres. `startDate`
   * e `endDate` filtram pela data de encerramento do período.
   *
   * Bancos e seguradoras usam outro plano de contas. Campos que não se aplicam ao
   * setor vêm como `null`.
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.balanceSheet({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  balanceSheet(
    query: StockBalanceSheetParams,
    options?: RequestOptions,
  ): APIPromise<StockBalanceSheetResponse> {
    return this._client.get('/api/v2/stocks/balance-sheet', { query, ...options });
  }

  /**
   * Demonstração do fluxo de caixa de empresas listadas: caixa das atividades
   * operacionais, de investimento e de financiamento, com os saldos de caixa no
   * início e no fim do período.
   *
   * Use para comparar a geração de caixa com o lucro e calcular o fluxo de caixa
   * livre.
   *
   * O padrão é `period=annual`. Use `period=quarterly` para trimestres. `startDate`
   * e `endDate` filtram pela data de encerramento do período.
   *
   * `freeCashFlow` soma o caixa operacional e o caixa de investimento. Ele é `null`
   * quando um dos dois falta.
   *
   * Os trimestres usam a mesma base, consolidada ou individual, do relatório anual
   * do mesmo ano. Sem relatório anual, a base é a que tem o trimestre mais recente.
   * Em empate, a consolidada vale. Lacunas não são preenchidas com a outra base. Um
   * período sem os dados necessários para o cálculo retorna `null`.
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.cashFlow({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  cashFlow(query: StockCashFlowParams, options?: RequestOptions): APIPromise<StockCashFlowResponse> {
    return this._client.get('/api/v2/stocks/cash-flow', { query, ...options });
  }

  /**
   * Proventos de ações brasileiras: dividendos, JCP, bonificações, desdobramentos,
   * grupamentos e subscrições, com valor por ação, data-com, data ex e data de
   * pagamento.
   *
   * Use para calcular dividend yield, montar calendários de proventos e registrar
   * proventos em carteiras.
   *
   * Em conversões de ações, os proventos de cada classe permanecem separados. Uma
   * consulta por AXIA6 retorna os proventos de AXIA6 e ELET6.
   *
   * `lastDatePrior` é a data-com, o último dia para comprar a ação e ter direito ao
   * provento. `exDate` é a data ex, o primeiro dia sem esse direito. `exDate` pode
   * ser nulo.
   *
   * `startDate` e `endDate` filtram proventos em dinheiro por `paymentDate` e
   * eventos em ações por `lastDatePrior`.
   *
   * `includeRaw=true` exige o plano Pro. Ele adiciona `rawRate`, o valor por ação na
   * escala dos preços sem ajuste.
   *
   * FIIs não entram aqui. Um ticker de FII retorna erro 400. Use
   * [dividendos de FIIs](https://brapi.dev/docs/fiis/dividendos).
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.dividends({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  dividends(query: StockDividendsParams, options?: RequestOptions): APIPromise<StockDividendsResponse> {
    return this._client.get('/api/v2/stocks/dividends', { query, ...options });
  }

  /**
   * Receita, lucro, EBITDA, margens, dívida, caixa e fluxo de caixa livre de uma
   * empresa, em um único objeto.
   *
   * Use para ver o resumo financeiro sem ler cada demonstração.
   *
   * O padrão `mode=current` traz os últimos 12 meses. `mode=history` traz a série
   * anual ou trimestral, conforme `period`, filtrada por `startDate` e `endDate`.
   *
   * Para as linhas completas, use
   * [balanço patrimonial](https://brapi.dev/docs/acoes/balanco-patrimonial),
   * [DRE](https://brapi.dev/docs/acoes/dre) e
   * [fluxo de caixa](https://brapi.dev/docs/acoes/fluxo-de-caixa).
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.financialData({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  financialData(
    query: StockFinancialDataParams,
    options?: RequestOptions,
  ): APIPromise<StockFinancialDataResponse> {
    return this._client.get('/api/v2/stocks/financial-data', { query, ...options });
  }

  /**
   * Série de preços por pregão com abertura, máxima, mínima, fechamento, fechamento
   * ajustado e volume. Serve para ações, FIIs, BDRs, ETFs, units e índices com
   * histórico.
   *
   * Use para gráficos, backtests e cálculo de retorno.
   *
   * Em conversões de ações, use o ticker original para consultar o histórico daquela
   * classe. Por exemplo, AXIA6 mantém seu próprio histórico.
   *
   * Defina a janela com `range` e `interval`, por exemplo `range=1y&interval=1d`, ou
   * com `startDate` e `endDate`. O padrão é `range=1mo` e `interval=1d`.
   *
   * O plano define os valores aceitos em `range` e `interval` e o tamanho máximo da
   * janela por data. Um pedido acima do limite do plano retorna erro 400.
   *
   * Use `adjustedClose` para calcular retorno. Ele considera proventos,
   * desdobramentos e grupamentos.
   *
   * `includeRaw=true` exige o plano Pro. Em intervalos diários, ele adiciona
   * `rawOpen`, `rawHigh`, `rawLow` e `rawClose`, os preços originais sem ajuste.
   * Esses campos podem ser nulos. Intervalos intradiários não trazem campos `raw*`.
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.historical({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  historical(query: StockHistoricalParams, options?: RequestOptions): APIPromise<StockHistoricalResponse> {
    return this._client.get('/api/v2/stocks/historical', { query, ...options });
  }

  /**
   * Demonstração de resultado de empresas listadas: receita, custos, lucro bruto,
   * despesas operacionais, resultado financeiro, impostos e lucro líquido. Uma linha
   * por período, do mais recente para o mais antigo.
   *
   * Use para acompanhar resultados, margens e crescimento de lucro.
   *
   * O padrão é `period=annual`. Use `period=quarterly` para trimestres. `startDate`
   * e `endDate` filtram pela data de encerramento do período.
   *
   * Cada trimestre traz o valor do trimestre isolado, sem somar os trimestres
   * anteriores do ano.
   *
   * Os trimestres usam a mesma base, consolidada ou individual, do relatório anual
   * do mesmo ano. Sem relatório anual, a base é a que tem o trimestre mais recente.
   * Em empate, a consolidada vale. Lacunas não são preenchidas com a outra base. Um
   * período sem os dados necessários para o cálculo retorna `null`.
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.incomeStatement({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  incomeStatement(
    query: StockIncomeStatementParams,
    options?: RequestOptions,
  ): APIPromise<StockIncomeStatementResponse> {
    return this._client.get('/api/v2/stocks/income-statement', { query, ...options });
  }

  /**
   * Dados cadastrais da empresa por trás do ticker: razão social, CNPJ, setor,
   * indústria, endereço, site, telefone, número de funcionários e descrição da
   * atividade.
   *
   * Use para páginas de empresa, filtros por setor e cadastro de ativos em
   * carteiras.
   *
   * Esses dados quase não mudam. Guarde a resposta e consulte de novo poucas vezes.
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.profile({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  profile(query: StockProfileParams, options?: RequestOptions): APIPromise<StockProfileResponse> {
    return this._client.get('/api/v2/stocks/profile', { query, ...options });
  }

  /**
   * Preço, variação, volume, market cap, máxima e mínima do dia, faixa de 52 semanas
   * e logo de ações, FIIs, BDRs, ETFs, units e índices brasileiros.
   *
   * Use para telas de cotação, carteiras, alertas de preço e widgets.
   *
   * Envie vários tickers em `symbols`, separados por vírgula. O número máximo de
   * tickers por chamada depende do plano.
   *
   * Um ticker antigo é trocado pelo ticker atual. Nesse caso, `changed` é `true` e
   * `requestedSymbol` guarda o ticker enviado.
   *
   * AXIA5 e AXIA6 retornam a cotação de uma ação AXIA3. Consulte a resolução de
   * tickers para ver a proporção de conversão.
   *
   * Para a série de preços, use o
   * [histórico de preços](https://brapi.dev/docs/acoes/historico). Para achar
   * tickers válidos, use a [lista de tickers](https://brapi.dev/docs/tickers).
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.quote({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  quote(query: StockQuoteParams, options?: RequestOptions): APIPromise<StockQuoteResponse> {
    return this._client.get('/api/v2/stocks/quote', { query, ...options });
  }

  /**
   * Múltiplos e indicadores por ação: P/L, P/VP, beta, dividend yield, lucro por
   * ação, valor patrimonial por ação e market cap.
   *
   * Use para comparar empresas, montar screeners e acompanhar valuation.
   *
   * O padrão `mode=current` traz o valor atual. `mode=history` traz a série anual ou
   * trimestral, conforme `period`, filtrada por `startDate` e `endDate`.
   *
   * Múltiplos que usam o preço mudam a cada pregão. Múltiplos que usam só o balanço
   * mudam quando a empresa publica um novo resultado.
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.statistics({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  statistics(query: StockStatisticsParams, options?: RequestOptions): APIPromise<StockStatisticsResponse> {
    return this._client.get('/api/v2/stocks/statistics', { query, ...options });
  }

  /**
   * Demonstração do valor adicionado de empresas listadas: a riqueza que a empresa
   * gerou e como ela se divide entre pessoal, governo, credores e acionistas.
   *
   * Use para ver quanto a empresa paga de salários, impostos e juros, e quanto fica
   * com os acionistas.
   *
   * O padrão é `period=annual`. Use `period=quarterly` para trimestres. `startDate`
   * e `endDate` filtram pela data de encerramento do período.
   *
   * Os trimestres usam a mesma base, consolidada ou individual, do relatório anual
   * do mesmo ano. Sem relatório anual, a base é a que tem o trimestre mais recente.
   * Em empate, a consolidada vale. Lacunas não são preenchidas com a outra base. Um
   * período sem os dados necessários para o cálculo retorna `null`.
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.valueAdded({
   *   symbols: 'PETR4,VALE3',
   * });
   * ```
   */
  valueAdded(query: StockValueAddedParams, options?: RequestOptions): APIPromise<StockValueAddedResponse> {
    return this._client.get('/api/v2/stocks/value-added', { query, ...options });
  }
}

export interface StockFundamentalsSeries {
  changed: boolean;

  requestedSymbol: string;

  symbol: string;

  /**
   * Dados do endpoint. Pode ser objeto, array ou null.
   */
  data?: unknown;
}

export interface StockBalanceSheetResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockFundamentalsSeries>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface StockCashFlowResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockFundamentalsSeries>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface StockDividendsResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockDividendsResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace StockDividendsResponse {
  export interface Result {
    /**
     * `true` quando o ticker enviado foi trocado pelo ticker atual.
     */
    changed: boolean;

    /**
     * Proventos. Vem com `dividends=true`.
     */
    data: QuoteAPI.DividendsData;

    /**
     * Ticker enviado na requisição.
     */
    requestedSymbol: string;

    /**
     * Ticker atual, depois de resolver renomes.
     */
    symbol: string;
  }
}

export interface StockFinancialDataResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockFundamentalsSeries>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface StockHistoricalResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockHistoricalResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace StockHistoricalResponse {
  export interface Result {
    /**
     * `true` quando o ticker enviado foi trocado pelo ticker atual.
     */
    changed: boolean;

    data: Result.Data;

    /**
     * Ticker enviado na requisição.
     */
    requestedSymbol: string;

    /**
     * Ticker atual, depois de resolver renomes.
     */
    symbol: string;
  }

  export namespace Result {
    export interface Data {
      historicalDataPrice: Array<Data.HistoricalDataPrice>;

      usedInterval: string;

      usedRange: string;
    }

    export namespace Data {
      export interface HistoricalDataPrice {
        adjustedClose: number | null;

        close: number | null;

        /**
         * Data do pregão em Unix timestamp, em segundos.
         */
        date: number;

        high: number | null;

        low: number | null;

        open: number | null;

        volume: number | null;

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
    }
  }
}

export interface StockIncomeStatementResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockFundamentalsSeries>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface StockProfileResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockFundamentalsSeries>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface StockQuoteResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockQuoteResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace StockQuoteResponse {
  export interface Result {
    /**
     * `true` quando o ticker enviado foi trocado pelo ticker atual.
     */
    changed: boolean;

    data: Result.Data;

    /**
     * Ticker enviado na requisição.
     */
    requestedSymbol: string;

    /**
     * Ticker atual, depois de resolver renomes.
     */
    symbol: string;
  }

  export namespace Result {
    export interface Data {
      currency: string;

      fiftyTwoWeekHigh: number;

      fiftyTwoWeekLow: number;

      fiftyTwoWeekRange: string;

      logourl: string;

      longName: string;

      marketCap: number | null;

      regularMarketChange: number;

      regularMarketChangePercent: number;

      regularMarketDayHigh: number;

      regularMarketDayLow: number;

      regularMarketDayRange: string;

      regularMarketOpen: number;

      regularMarketPreviousClose: number;

      regularMarketPrice: number;

      /**
       * Horário da cotação em ISO 8601.
       */
      regularMarketTime: string;

      regularMarketVolume: number;

      shortName: string;
    }
  }
}

export interface StockStatisticsResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockFundamentalsSeries>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface StockValueAddedResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockFundamentalsSeries>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export interface StockBalanceSheetParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  endDate?: string;

  /**
   * Período de cada linha: anual ou trimestral.
   */
  period?: 'annual' | 'quarterly';

  /**
   * Data inicial no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  startDate?: string;
}

export interface StockCashFlowParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  endDate?: string;

  /**
   * Período de cada linha: anual ou trimestral.
   */
  period?: 'annual' | 'quarterly';

  /**
   * Data inicial no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  startDate?: string;
}

export interface StockDividendsParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD. Filtra proventos em dinheiro por `paymentDate`
   * e eventos em ações por `lastDatePrior`.
   */
  endDate?: string;

  /**
   * Inclui `rawRate`, o valor por ação na escala dos preços sem ajuste. Exige o
   * plano Pro.
   */
  includeRaw?: 'true' | 'false';

  /**
   * Campo de ordenação dos eventos.
   */
  sortBy?: 'paymentDate' | 'lastDatePrior' | 'approvedOn' | 'rate';

  /**
   * Ordem dos eventos.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD. Filtra proventos em dinheiro por
   * `paymentDate` e eventos em ações por `lastDatePrior`.
   */
  startDate?: string;
}

export interface StockFinancialDataParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  endDate?: string;

  /**
   * `current` traz o valor atual. `history` traz a série definida por `period`.
   */
  mode?: 'current' | 'history';

  /**
   * Período de cada linha: anual ou trimestral.
   */
  period?: 'annual' | 'quarterly';

  /**
   * Data inicial no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  startDate?: string;
}

export interface StockHistoricalParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD.
   */
  endDate?: string;

  /**
   * Inclui os preços originais sem ajuste (`rawOpen`, `rawHigh`, `rawLow`,
   * `rawClose`) em intervalos diários. Exige o plano Pro.
   */
  includeRaw?: 'true' | 'false';

  /**
   * Intervalo entre os pontos. Padrão: 1d.
   */
  interval?: '1m' | '2m' | '5m' | '15m' | '30m' | '60m' | '90m' | '1h' | '1d' | '5d' | '1wk' | '1mo' | '3mo';

  /**
   * Janela relativa. Padrão: 1mo.
   */
  range?: '1d' | '2d' | '5d' | '7d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max';

  /**
   * Ordem dos pontos por data.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Data inicial no formato YYYY-MM-DD.
   */
  startDate?: string;
}

export interface StockIncomeStatementParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  endDate?: string;

  /**
   * Período de cada linha: anual ou trimestral.
   */
  period?: 'annual' | 'quarterly';

  /**
   * Data inicial no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  startDate?: string;
}

export interface StockProfileParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;
}

export interface StockQuoteParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;
}

export interface StockStatisticsParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  endDate?: string;

  /**
   * `current` traz o valor atual. `history` traz a série definida por `period`.
   */
  mode?: 'current' | 'history';

  /**
   * Período de cada linha: anual ou trimestral.
   */
  period?: 'annual' | 'quarterly';

  /**
   * Data inicial no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  startDate?: string;
}

export interface StockValueAddedParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. Um ticker antigo é trocado pelo
   * ticker atual.
   */
  symbols: string;

  /**
   * Data final no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  endDate?: string;

  /**
   * Período de cada linha: anual ou trimestral.
   */
  period?: 'annual' | 'quarterly';

  /**
   * Data inicial no formato YYYY-MM-DD. Filtra pela data de encerramento do período.
   */
  startDate?: string;
}

export declare namespace Stocks {
  export {
    type StockFundamentalsSeries as StockFundamentalsSeries,
    type StockBalanceSheetResponse as StockBalanceSheetResponse,
    type StockCashFlowResponse as StockCashFlowResponse,
    type StockDividendsResponse as StockDividendsResponse,
    type StockFinancialDataResponse as StockFinancialDataResponse,
    type StockHistoricalResponse as StockHistoricalResponse,
    type StockIncomeStatementResponse as StockIncomeStatementResponse,
    type StockProfileResponse as StockProfileResponse,
    type StockQuoteResponse as StockQuoteResponse,
    type StockStatisticsResponse as StockStatisticsResponse,
    type StockValueAddedResponse as StockValueAddedResponse,
    type StockBalanceSheetParams as StockBalanceSheetParams,
    type StockCashFlowParams as StockCashFlowParams,
    type StockDividendsParams as StockDividendsParams,
    type StockFinancialDataParams as StockFinancialDataParams,
    type StockHistoricalParams as StockHistoricalParams,
    type StockIncomeStatementParams as StockIncomeStatementParams,
    type StockProfileParams as StockProfileParams,
    type StockQuoteParams as StockQuoteParams,
    type StockStatisticsParams as StockStatisticsParams,
    type StockValueAddedParams as StockValueAddedParams,
  };
}
