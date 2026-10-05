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
   * Os proventos de LCAM3 e BRFS3 permanecem separados de RENT3 e MBRF3. PRGA3 usa
   * BRFS3. MRFG3 usa MBRF3.
   *
   * Os proventos disponíveis podem ser consultados mesmo quando o ticker não tem
   * cotação atual.
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
   * LCAM3 e BRFS3 também mantêm históricos próprios, separados de RENT3 e MBRF3.
   * PRGA3 usa a série de BRFS3. MRFG3 usa MBRF3.
   *
   * O histórico disponível pode ser consultado mesmo quando o ticker não tem cotação
   * atual.
   *
   * Defina a janela com `range` e `interval`, por exemplo `range=1y&interval=1d`, ou
   * com `startDate` e `endDate`. O padrão é `range=1mo` e `interval=1d`.
   *
   * O plano define os valores aceitos em `range` e `interval` e o tamanho máximo da
   * janela por data. Um pedido acima do limite do plano retorna erro 400.
   *
   * Em intervalos diários, `open`, `high`, `low` e `close` podem vir ajustados.
   * Nesses pontos, `close` coincide com `adjustedClose`. Outros pontos podem trazer
   * `close` sem ajuste ou `adjustedClose` nulo. Os campos `raw*`, quando
   * disponíveis, trazem os preços originais.
   *
   * Use `adjustedClose` para calcular retorno diário. Ele considera proventos,
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
   * Movimentações de valores mobiliários por administradores, controladores e
   * pessoas vinculadas, por empresa e período. Os relatórios são mensais. A
   * atualização ocorre semanalmente.
   *
   * O ticker identifica a empresa do relatório. PETR3 e PETR4 retornam os mesmos
   * dados. Os registros agrupam pessoas por cargo, sem identificar cada pessoa ou o
   * ticker negociado.
   *
   * `direction` indica entrada ou saída da posição, inclusive transferências. Use
   * `movementType` para identificar compras e vendas.
   *
   * A resposta traz as movimentações mais recentes primeiro e a última versão de
   * cada relatório. Use `allVersions=true` para incluir versões anteriores. Não some
   * essas versões, pois elas podem repetir movimentações. Saldos iniciais não entram
   * na lista.
   *
   * Plano Pro. PETR4, MGLU3, VALE3 e ITUB4 permitem testes gratuitos, sem token.
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.insiderTransactions(
   *   { symbols: 'VALE3' },
   * );
   * ```
   */
  insiderTransactions(
    query: StockInsiderTransactionsParams,
    options?: RequestOptions,
  ): APIPromise<StockInsiderTransactionsResponse> {
    return this._client.get('/api/v2/stocks/insider-transactions', { query, ...options });
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
   * Quando alguns tickers não existem, eles ficam fora de `results`. Se nenhum
   * ticker tem cotação, a resposta retorna 404.
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
   * Filtra e ordena ações da B3 por preço e indicadores fundamentalistas, como P/L,
   * P/VP, dividend yield e ROE. Uma chamada percorre todas as ações.
   *
   * Cada indicador aceita `{chave}Min` e `{chave}Max`. Os limites são inclusivos e
   * usam a mesma unidade da resposta. Frações seguem `/api/v2/stocks/statistics` e
   * `/api/v2/stocks/financial-data`: 6% é `0.06`. Um filtro remove os ativos sem o
   * dado. Na ordenação, os nulos ficam no fim.
   *
   * Exemplos:
   *
   * - P/L entre 0 e 8 e dividend yield de pelo menos 6%:
   *   `?trailingPEMin=0&trailingPEMax=8&dividendYieldMin=0.06&sortBy=dividendYield`
   * - ROE de pelo menos 15%, do maior para o menor:
   *   `?returnOnEquityMin=0.15&sortBy=returnOnEquity`
   *
   * Empresas com prejuízo têm P/L negativo. Para excluí-las, envie `trailingPEMin=0`
   * junto com `trailingPEMax`.
   *
   * `quote` e `dividendYield` usam o último preço. P/L, P/VP e os outros indicadores
   * usam o preço da atualização diária dos fundamentos. Em units, P/L e P/VP usam o
   * último preço da unit. `dividendYield` soma os proventos em dinheiro dos últimos
   * 12 meses.
   *
   * Planos Startup e Pro. Os indicadores do plano Pro não vêm em `metrics` no plano
   * Startup. Um filtro ou uma ordenação com esses indicadores no plano Startup
   * retorna 403.
   *
   * | Indicador                    | Chave                  | Unidade                    | Plano         |
   * | ---------------------------- | ---------------------- | -------------------------- | ------------- |
   * | Preço                        | `lastPrice`            | reais                      | Startup e Pro |
   * | Variação no dia              | `changePercent`        | porcentagem (2.81 = 2,81%) | Startup e Pro |
   * | Volume                       | `volume`               | ações                      | Startup e Pro |
   * | Valor de mercado             | `marketCap`            | reais                      | Startup e Pro |
   * | P/L                          | `trailingPE`           | múltiplo                   | Startup e Pro |
   * | P/VP                         | `priceToBook`          | múltiplo                   | Startup e Pro |
   * | EV/EBITDA                    | `enterpriseToEbitda`   | múltiplo                   | Startup e Pro |
   * | EV/Receita                   | `enterpriseToRevenue`  | múltiplo                   | Startup e Pro |
   * | PEG                          | `pegRatio`             | múltiplo                   | Startup e Pro |
   * | LPA                          | `earningsPerShare`     | reais                      | Startup e Pro |
   * | VPA                          | `bookValuePerShare`    | reais                      | Startup e Pro |
   * | Margem líquida               | `netMargin`            | fração (0.06 = 6%)         | Startup e Pro |
   * | Valor da firma               | `enterpriseValue`      | reais                      | Startup e Pro |
   * | Variação 52 semanas          | `fiftyTwoWeekChange`   | fração (0.06 = 6%)         | Startup e Pro |
   * | Dividend yield               | `dividendYield`        | fração (0.06 = 6%)         | Startup e Pro |
   * | ROE                          | `returnOnEquity`       | fração (0.06 = 6%)         | Pro           |
   * | ROA                          | `returnOnAssets`       | fração (0.06 = 6%)         | Pro           |
   * | Margem bruta                 | `grossMargin`          | fração (0.06 = 6%)         | Pro           |
   * | Margem EBITDA                | `ebitdaMargin`         | fração (0.06 = 6%)         | Pro           |
   * | Margem operacional           | `operatingMargin`      | fração (0.06 = 6%)         | Pro           |
   * | Dívida/PL                    | `debtToEquity`         | múltiplo                   | Pro           |
   * | Dívida líquida/EBITDA        | `netDebtToEbitda`      | múltiplo                   | Pro           |
   * | Liquidez corrente            | `currentRatio`         | múltiplo                   | Pro           |
   * | Liquidez seca                | `quickRatio`           | múltiplo                   | Pro           |
   * | Crescimento da receita       | `revenueGrowth`        | fração (0.06 = 6%)         | Pro           |
   * | Crescimento do lucro         | `earningsGrowth`       | fração (0.06 = 6%)         | Pro           |
   * | Crescimento anual da receita | `revenueGrowthAnnual`  | fração (0.06 = 6%)         | Pro           |
   * | Crescimento anual do lucro   | `earningsGrowthAnnual` | fração (0.06 = 6%)         | Pro           |
   * | Receita                      | `totalRevenue`         | reais                      | Pro           |
   * | EBITDA                       | `ebitda`               | reais                      | Pro           |
   * | Fluxo de caixa livre         | `freeCashflow`         | reais                      | Pro           |
   * | Dívida bruta                 | `totalDebt`            | reais                      | Pro           |
   * | Caixa                        | `totalCash`            | reais                      | Pro           |
   *
   * @example
   * ```ts
   * const response = await client.v2.stocks.screener();
   * ```
   */
  screener(
    query: StockScreenerParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<StockScreenerResponse> {
    return this._client.get('/api/v2/stocks/screener', { query, ...options });
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
     * `true` quando `symbol` difere de `requestedSymbol`.
     */
    changed: boolean;

    /**
     * Proventos. Na rota `/api/quote/{tickers}`, vem com `dividends=true`. Na rota
     * `/api/v2/stocks/dividends`, não exige esse parâmetro.
     */
    data: QuoteAPI.DividendsData;

    /**
     * Ticker enviado na requisição.
     */
    requestedSymbol: string;

    /**
     * Ticker usado para os dados retornados.
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
     * `true` quando `symbol` difere de `requestedSymbol`.
     */
    changed: boolean;

    data: Result.Data;

    /**
     * Ticker enviado na requisição.
     */
    requestedSymbol: string;

    /**
     * Ticker usado para os dados retornados.
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

export interface StockInsiderTransactionsResponse {
  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockInsiderTransactionsResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace StockInsiderTransactionsResponse {
  export interface Result {
    changed: boolean;

    data: Result.Data;

    requestedSymbol: string;

    symbol: string;
  }

  export namespace Result {
    export interface Data {
      cnpj: string;

      companyName: string | null;

      /**
       * Movimentações agrupadas por cargo. Os dados não identificam cada pessoa.
       */
      disclosureLevel: 'roleGroup';

      endDate: string;

      /**
       * Primeiro mês de relatório disponível para a empresa. Pode haver meses sem dados.
       */
      firstReportDate: string | null;

      /**
       * Data de apresentação mais recente. Uma correção pode se referir a um mês
       * anterior.
       */
      latestFilingDate: string | null;

      /**
       * Último mês de relatório disponível para a empresa.
       */
      latestReportDate: string | null;

      pagination: Data.Pagination;

      startDate: string;

      /**
       * Movimentações que correspondem aos filtros. Uma lista vazia não indica posição
       * igual a zero.
       */
      transactions: Array<Data.Transaction>;
    }

    export namespace Data {
      export interface Pagination {
        hasMore: boolean;

        limit: number;

        page: number;

        total: number;
      }

      export interface Transaction {
        /**
         * Identificador da movimentação nesta versão do relatório.
         */
        id: string;

        companyRelation: 'company' | 'parent' | 'subsidiary';

        description: string | null;

        direction: 'credit' | 'debit';

        /**
         * Data de apresentação do relatório.
         */
        filingDate: string;

        intermediary: string | null;

        movementType: string;

        /**
         * Quantidade inteira exata. Pode ser negativa.
         */
        quantity: string | null;

        /**
         * Primeiro dia do mês de referência. Não é a data da movimentação.
         */
        reportDate: string;

        roleDescription: string | null;

        roleGroup: 'controller' | 'board' | 'director' | 'fiscalCouncil' | 'statutoryBody' | null;

        securityClass: string | null;

        /**
         * Nome da empresa que emite o valor mobiliário.
         */
        securityCompany: string;

        securityType: string;

        /**
         * Data da movimentação em YYYY-MM-DD.
         */
        transactionDate: string | null;

        /**
         * Valor decimal exato em texto, sem ajuste por desdobramentos. null indica valor
         * ausente.
         */
        unitPrice: string | null;

        /**
         * Versão do relatório. Uma correção substitui a versão anterior.
         */
        version: number;

        /**
         * Valor decimal exato em texto, sem ajuste por desdobramentos. null indica valor
         * ausente.
         */
        volume: string | null;
      }
    }
  }
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
     * `true` quando `symbol` difere de `requestedSymbol`.
     */
    changed: boolean;

    data: Result.Data;

    /**
     * Ticker enviado na requisição.
     */
    requestedSymbol: string;

    /**
     * Ticker usado para os dados retornados.
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

export interface StockScreenerResponse {
  pagination: StockScreenerResponse.Pagination;

  /**
   * Data e hora da requisição em ISO 8601.
   */
  requestedAt: string;

  results: Array<StockScreenerResponse.Result>;

  /**
   * Tempo de processamento, em milissegundos.
   */
  took: number;
}

export namespace StockScreenerResponse {
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

    /**
     * Data e hora da última atualização dos fundamentos usados. Nulo quando o ativo
     * não tem fundamentos.
     */
    fundamentalsUpdatedAt: string | null;

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
     * Indicadores do ativo. As chaves do plano Pro não vêm no plano Startup.
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
    /**
     * Indicadores do ativo. As chaves do plano Pro não vêm no plano Startup.
     */
    export interface Metrics {
      /**
       * VPA. Valor patrimonial por ação, em reais. Unidade: reais. Nulo quando não há
       * dado.
       */
      bookValuePerShare: number | null;

      /**
       * Dividend yield. Proventos em dinheiro dos últimos 12 meses sobre o último preço,
       * em fração (0.06 = 6%). Nulo quando não houve proventos. Unidade: fração (0.06 =
       * 6%). Nulo quando não há dado.
       */
      dividendYield: number | null;

      /**
       * LPA. Lucro por ação dos últimos 12 meses, em reais. Unidade: reais. Nulo quando
       * não há dado.
       */
      earningsPerShare: number | null;

      /**
       * EV/EBITDA. Valor da firma sobre EBITDA. Unidade: múltiplo. Nulo quando não há
       * dado.
       */
      enterpriseToEbitda: number | null;

      /**
       * EV/Receita. Valor da firma sobre receita. Unidade: múltiplo. Nulo quando não há
       * dado.
       */
      enterpriseToRevenue: number | null;

      /**
       * Valor da firma. Valor de mercado mais dívida líquida, em reais. Unidade: reais.
       * Nulo quando não há dado.
       */
      enterpriseValue: number | null;

      /**
       * Variação 52 semanas. Variação do preço em 52 semanas, em fração (0.65 = 65%).
       * Unidade: fração (0.06 = 6%). Nulo quando não há dado.
       */
      fiftyTwoWeekChange: number | null;

      /**
       * Margem líquida. Lucro líquido sobre receita, em fração (0.24 = 24%). Unidade:
       * fração (0.06 = 6%). Nulo quando não há dado.
       */
      netMargin: number | null;

      /**
       * PEG. P/L dividido pelo crescimento do lucro. Unidade: múltiplo. Nulo quando não
       * há dado.
       */
      pegRatio: number | null;

      /**
       * P/VP. Preço sobre valor patrimonial. Unidade: múltiplo. Nulo quando não há dado.
       */
      priceToBook: number | null;

      /**
       * P/L. Preço sobre lucro dos últimos 12 meses. É negativo quando a empresa tem
       * prejuízo. Unidade: múltiplo. Nulo quando não há dado.
       */
      trailingPE: number | null;

      /**
       * Liquidez corrente. Ativo circulante sobre passivo circulante. Unidade: múltiplo.
       * Nulo quando não há dado. Só vem no plano Pro.
       */
      currentRatio?: number | null;

      /**
       * Dívida/PL. Dívida bruta sobre patrimônio líquido. Unidade: múltiplo. Nulo quando
       * não há dado. Só vem no plano Pro.
       */
      debtToEquity?: number | null;

      /**
       * Crescimento do lucro. Crescimento do lucro do último trimestre contra o mesmo
       * trimestre do ano anterior, em fração. Unidade: fração (0.06 = 6%). Nulo quando
       * não há dado. Só vem no plano Pro.
       */
      earningsGrowth?: number | null;

      /**
       * Crescimento anual do lucro. Crescimento do lucro no último ano fiscal, em
       * fração. Unidade: fração (0.06 = 6%). Nulo quando não há dado. Só vem no plano
       * Pro.
       */
      earningsGrowthAnnual?: number | null;

      /**
       * EBITDA. EBITDA dos últimos 12 meses, em reais. Unidade: reais. Nulo quando não
       * há dado. Só vem no plano Pro.
       */
      ebitda?: number | null;

      /**
       * Margem EBITDA. EBITDA sobre receita, em fração. Unidade: fração (0.06 = 6%).
       * Nulo quando não há dado. Só vem no plano Pro.
       */
      ebitdaMargin?: number | null;

      /**
       * Fluxo de caixa livre. Fluxo de caixa livre, em reais. Unidade: reais. Nulo
       * quando não há dado. Só vem no plano Pro.
       */
      freeCashflow?: number | null;

      /**
       * Margem bruta. Lucro bruto sobre receita, em fração. Unidade: fração (0.06 = 6%).
       * Nulo quando não há dado. Só vem no plano Pro.
       */
      grossMargin?: number | null;

      /**
       * Dívida líquida/EBITDA. Dívida bruta menos caixa, sobre EBITDA. Nulo quando o
       * EBITDA é zero ou negativo. Unidade: múltiplo. Nulo quando não há dado. Só vem no
       * plano Pro.
       */
      netDebtToEbitda?: number | null;

      /**
       * Margem operacional. Lucro operacional sobre receita, em fração. Unidade: fração
       * (0.06 = 6%). Nulo quando não há dado. Só vem no plano Pro.
       */
      operatingMargin?: number | null;

      /**
       * Liquidez seca. Ativo circulante sem estoques, sobre passivo circulante. Unidade:
       * múltiplo. Nulo quando não há dado. Só vem no plano Pro.
       */
      quickRatio?: number | null;

      /**
       * ROA. Retorno sobre os ativos, em fração. Unidade: fração (0.06 = 6%). Nulo
       * quando não há dado. Só vem no plano Pro.
       */
      returnOnAssets?: number | null;

      /**
       * ROE. Retorno sobre o patrimônio, em fração (0.15 = 15%). Unidade: fração (0.06 =
       * 6%). Nulo quando não há dado. Só vem no plano Pro.
       */
      returnOnEquity?: number | null;

      /**
       * Crescimento da receita. Crescimento da receita do último trimestre contra o
       * mesmo trimestre do ano anterior, em fração. Unidade: fração (0.06 = 6%). Nulo
       * quando não há dado. Só vem no plano Pro.
       */
      revenueGrowth?: number | null;

      /**
       * Crescimento anual da receita. Crescimento da receita no último ano fiscal, em
       * fração. Unidade: fração (0.06 = 6%). Nulo quando não há dado. Só vem no plano
       * Pro.
       */
      revenueGrowthAnnual?: number | null;

      /**
       * Caixa. Caixa e aplicações, em reais. Unidade: reais. Nulo quando não há dado. Só
       * vem no plano Pro.
       */
      totalCash?: number | null;

      /**
       * Dívida bruta. Dívida bruta, em reais. Unidade: reais. Nulo quando não há dado.
       * Só vem no plano Pro.
       */
      totalDebt?: number | null;

      /**
       * Receita. Receita dos últimos 12 meses, em reais. Unidade: reais. Nulo quando não
       * há dado. Só vem no plano Pro.
       */
      totalRevenue?: number | null;
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
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
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
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
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
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
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
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
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
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
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
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
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

export interface StockInsiderTransactionsParams {
  /**
   * Tickers separados por vírgula. Máximo de 20. Cada ticker identifica a empresa
   * que apresenta o relatório.
   */
  symbols: string;

  /**
   * Inclui versões anteriores dos relatórios. Padrão: false. Versões anteriores
   * podem repetir movimentações.
   */
  allVersions?: 'true' | 'false';

  /**
   * Empresa que emite o valor mobiliário: a própria empresa, sua controladora ou sua
   * controlada.
   */
  companyRelation?: 'company' | 'parent' | 'subsidiary' | 'all';

  /**
   * Entrada ou saída da posição. Inclui transferências e outras movimentações.
   */
  direction?: 'credit' | 'debit';

  /**
   * Data final da movimentação. Padrão: hoje.
   */
  endDate?: string;

  /**
   * Máximo de movimentações por empresa e página.
   */
  limit?: number;

  /**
   * Tipo de movimentação, com o texto exato do relatório.
   */
  movementType?: string;

  /**
   * Página de cada empresa.
   */
  page?: number;

  /**
   * Grupo de cargos. Cada grupo inclui pessoas vinculadas.
   */
  roleGroup?: 'controller' | 'board' | 'director' | 'fiscalCouncil' | 'statutoryBody';

  /**
   * Data inicial da movimentação. Padrão: 365 dias antes de endDate.
   */
  startDate?: string;
}

export interface StockProfileParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
   */
  symbols: string;
}

export interface StockQuoteParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
   */
  symbols: string;
}

export interface StockScreenerParams {
  /**
   * VPA: valor máximo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  bookValuePerShareMax?: number;

  /**
   * VPA: valor mínimo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  bookValuePerShareMin?: number;

  /**
   * Variação no dia: valor máximo, inclusive. Unidade: porcentagem (2.81 = 2,81%).
   * Plano Startup e Pro.
   */
  changePercentMax?: number;

  /**
   * Variação no dia: valor mínimo, inclusive. Unidade: porcentagem (2.81 = 2,81%).
   * Plano Startup e Pro.
   */
  changePercentMin?: number;

  /**
   * Liquidez corrente: valor máximo, inclusive. Unidade: múltiplo. Plano Pro.
   */
  currentRatioMax?: number;

  /**
   * Liquidez corrente: valor mínimo, inclusive. Unidade: múltiplo. Plano Pro.
   */
  currentRatioMin?: number;

  /**
   * Dívida/PL: valor máximo, inclusive. Unidade: múltiplo. Plano Pro.
   */
  debtToEquityMax?: number;

  /**
   * Dívida/PL: valor mínimo, inclusive. Unidade: múltiplo. Plano Pro.
   */
  debtToEquityMin?: number;

  /**
   * Dividend yield: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Plano
   * Startup e Pro.
   */
  dividendYieldMax?: number;

  /**
   * Dividend yield: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Plano
   * Startup e Pro.
   */
  dividendYieldMin?: number;

  /**
   * Crescimento anual do lucro: valor máximo, inclusive. Unidade: fração (0.06 =
   * 6%). Plano Pro.
   */
  earningsGrowthAnnualMax?: number;

  /**
   * Crescimento anual do lucro: valor mínimo, inclusive. Unidade: fração (0.06 =
   * 6%). Plano Pro.
   */
  earningsGrowthAnnualMin?: number;

  /**
   * Crescimento do lucro: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   * Plano Pro.
   */
  earningsGrowthMax?: number;

  /**
   * Crescimento do lucro: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   * Plano Pro.
   */
  earningsGrowthMin?: number;

  /**
   * LPA: valor máximo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  earningsPerShareMax?: number;

  /**
   * LPA: valor mínimo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  earningsPerShareMin?: number;

  /**
   * Margem EBITDA: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Plano Pro.
   */
  ebitdaMarginMax?: number;

  /**
   * Margem EBITDA: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Plano Pro.
   */
  ebitdaMarginMin?: number;

  /**
   * EBITDA: valor máximo, inclusive. Unidade: reais. Plano Pro.
   */
  ebitdaMax?: number;

  /**
   * EBITDA: valor mínimo, inclusive. Unidade: reais. Plano Pro.
   */
  ebitdaMin?: number;

  /**
   * EV/EBITDA: valor máximo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  enterpriseToEbitdaMax?: number;

  /**
   * EV/EBITDA: valor mínimo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  enterpriseToEbitdaMin?: number;

  /**
   * EV/Receita: valor máximo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  enterpriseToRevenueMax?: number;

  /**
   * EV/Receita: valor mínimo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  enterpriseToRevenueMin?: number;

  /**
   * Valor da firma: valor máximo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  enterpriseValueMax?: number;

  /**
   * Valor da firma: valor mínimo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  enterpriseValueMin?: number;

  /**
   * Variação 52 semanas: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Plano
   * Startup e Pro.
   */
  fiftyTwoWeekChangeMax?: number;

  /**
   * Variação 52 semanas: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Plano
   * Startup e Pro.
   */
  fiftyTwoWeekChangeMin?: number;

  /**
   * Fluxo de caixa livre: valor máximo, inclusive. Unidade: reais. Plano Pro.
   */
  freeCashflowMax?: number;

  /**
   * Fluxo de caixa livre: valor mínimo, inclusive. Unidade: reais. Plano Pro.
   */
  freeCashflowMin?: number;

  /**
   * Margem bruta: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Plano Pro.
   */
  grossMarginMax?: number;

  /**
   * Margem bruta: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Plano Pro.
   */
  grossMarginMin?: number;

  /**
   * Preço: valor máximo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  lastPriceMax?: number;

  /**
   * Preço: valor mínimo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  lastPriceMin?: number;

  /**
   * Itens por página. Máximo: 200.
   */
  limit?: number;

  /**
   * Valor de mercado: valor máximo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  marketCapMax?: number;

  /**
   * Valor de mercado: valor mínimo, inclusive. Unidade: reais. Plano Startup e Pro.
   */
  marketCapMin?: number;

  /**
   * Dívida líquida/EBITDA: valor máximo, inclusive. Unidade: múltiplo. Plano Pro.
   */
  netDebtToEbitdaMax?: number;

  /**
   * Dívida líquida/EBITDA: valor mínimo, inclusive. Unidade: múltiplo. Plano Pro.
   */
  netDebtToEbitdaMin?: number;

  /**
   * Margem líquida: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Plano
   * Startup e Pro.
   */
  netMarginMax?: number;

  /**
   * Margem líquida: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Plano
   * Startup e Pro.
   */
  netMarginMin?: number;

  /**
   * Margem operacional: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Plano
   * Pro.
   */
  operatingMarginMax?: number;

  /**
   * Margem operacional: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Plano
   * Pro.
   */
  operatingMarginMin?: number;

  /**
   * Número da página. Começa em 1.
   */
  page?: number;

  /**
   * PEG: valor máximo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  pegRatioMax?: number;

  /**
   * PEG: valor mínimo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  pegRatioMin?: number;

  /**
   * P/VP: valor máximo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  priceToBookMax?: number;

  /**
   * P/VP: valor mínimo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  priceToBookMin?: number;

  /**
   * Liquidez seca: valor máximo, inclusive. Unidade: múltiplo. Plano Pro.
   */
  quickRatioMax?: number;

  /**
   * Liquidez seca: valor mínimo, inclusive. Unidade: múltiplo. Plano Pro.
   */
  quickRatioMin?: number;

  /**
   * ROA: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Plano Pro.
   */
  returnOnAssetsMax?: number;

  /**
   * ROA: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Plano Pro.
   */
  returnOnAssetsMin?: number;

  /**
   * ROE: valor máximo, inclusive. Unidade: fração (0.06 = 6%). Plano Pro.
   */
  returnOnEquityMax?: number;

  /**
   * ROE: valor mínimo, inclusive. Unidade: fração (0.06 = 6%). Plano Pro.
   */
  returnOnEquityMin?: number;

  /**
   * Crescimento anual da receita: valor máximo, inclusive. Unidade: fração (0.06 =
   * 6%). Plano Pro.
   */
  revenueGrowthAnnualMax?: number;

  /**
   * Crescimento anual da receita: valor mínimo, inclusive. Unidade: fração (0.06 =
   * 6%). Plano Pro.
   */
  revenueGrowthAnnualMin?: number;

  /**
   * Crescimento da receita: valor máximo, inclusive. Unidade: fração (0.06 = 6%).
   * Plano Pro.
   */
  revenueGrowthMax?: number;

  /**
   * Crescimento da receita: valor mínimo, inclusive. Unidade: fração (0.06 = 6%).
   * Plano Pro.
   */
  revenueGrowthMin?: number;

  /**
   * Parte do ticker, do nome da empresa ou de um ticker antigo.
   */
  search?: string;

  /**
   * Setor. Aceita parte do nome.
   */
  sector?: string;

  /**
   * Campo de ordenação: uma chave de métrica, `symbol` ou `name`. Valores nulos
   * ficam no fim.
   */
  sortBy?:
    | 'symbol'
    | 'name'
    | 'lastPrice'
    | 'changePercent'
    | 'volume'
    | 'marketCap'
    | 'trailingPE'
    | 'priceToBook'
    | 'enterpriseToEbitda'
    | 'enterpriseToRevenue'
    | 'pegRatio'
    | 'earningsPerShare'
    | 'bookValuePerShare'
    | 'netMargin'
    | 'enterpriseValue'
    | 'fiftyTwoWeekChange'
    | 'dividendYield'
    | 'returnOnEquity'
    | 'returnOnAssets'
    | 'grossMargin'
    | 'ebitdaMargin'
    | 'operatingMargin'
    | 'debtToEquity'
    | 'netDebtToEbitda'
    | 'currentRatio'
    | 'quickRatio'
    | 'revenueGrowth'
    | 'earningsGrowth'
    | 'revenueGrowthAnnual'
    | 'earningsGrowthAnnual'
    | 'totalRevenue'
    | 'ebitda'
    | 'freeCashflow'
    | 'totalDebt'
    | 'totalCash';

  /**
   * Ordem. Padrão: `desc`.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Subsetor. Nome exato.
   */
  subsector?: string;

  /**
   * Subtipo do ativo: stock, unit, fii, etf, fi-infra, fi-agro, fip, fidc ou bdr.
   */
  subType?: 'stock' | 'unit' | 'fii' | 'etf' | 'fi-infra' | 'fi-agro' | 'fip' | 'fidc' | 'bdr';

  /**
   * Caixa: valor máximo, inclusive. Unidade: reais. Plano Pro.
   */
  totalCashMax?: number;

  /**
   * Caixa: valor mínimo, inclusive. Unidade: reais. Plano Pro.
   */
  totalCashMin?: number;

  /**
   * Dívida bruta: valor máximo, inclusive. Unidade: reais. Plano Pro.
   */
  totalDebtMax?: number;

  /**
   * Dívida bruta: valor mínimo, inclusive. Unidade: reais. Plano Pro.
   */
  totalDebtMin?: number;

  /**
   * Receita: valor máximo, inclusive. Unidade: reais. Plano Pro.
   */
  totalRevenueMax?: number;

  /**
   * Receita: valor mínimo, inclusive. Unidade: reais. Plano Pro.
   */
  totalRevenueMin?: number;

  /**
   * P/L: valor máximo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  trailingPEMax?: number;

  /**
   * P/L: valor mínimo, inclusive. Unidade: múltiplo. Plano Startup e Pro.
   */
  trailingPEMin?: number;

  /**
   * Tipo do ativo. Padrão: `stock`.
   */
  type?: 'stock' | 'fund' | 'bdr';

  /**
   * Volume: valor máximo, inclusive. Unidade: ações. Plano Startup e Pro.
   */
  volumeMax?: number;

  /**
   * Volume: valor mínimo, inclusive. Unidade: ações. Plano Startup e Pro.
   */
  volumeMin?: number;
}

export interface StockStatisticsParams {
  /**
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
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
   * Tickers separados por vírgula. Ex.: PETR4,VALE3. `requestedSymbol` identifica o
   * ticker enviado e `symbol` identifica os dados retornados.
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
    type StockInsiderTransactionsResponse as StockInsiderTransactionsResponse,
    type StockProfileResponse as StockProfileResponse,
    type StockQuoteResponse as StockQuoteResponse,
    type StockScreenerResponse as StockScreenerResponse,
    type StockStatisticsResponse as StockStatisticsResponse,
    type StockValueAddedResponse as StockValueAddedResponse,
    type StockBalanceSheetParams as StockBalanceSheetParams,
    type StockCashFlowParams as StockCashFlowParams,
    type StockDividendsParams as StockDividendsParams,
    type StockFinancialDataParams as StockFinancialDataParams,
    type StockHistoricalParams as StockHistoricalParams,
    type StockIncomeStatementParams as StockIncomeStatementParams,
    type StockInsiderTransactionsParams as StockInsiderTransactionsParams,
    type StockProfileParams as StockProfileParams,
    type StockQuoteParams as StockQuoteParams,
    type StockScreenerParams as StockScreenerParams,
    type StockStatisticsParams as StockStatisticsParams,
    type StockValueAddedParams as StockValueAddedParams,
  };
}
