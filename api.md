# Quote

Types:

- <code><a href="./src/resources/quote.ts">BalanceSheetEntry</a></code>
- <code><a href="./src/resources/quote.ts">DividendsData</a></code>
- <code><a href="./src/resources/quote.ts">FinancialDataEntry</a></code>
- <code><a href="./src/resources/quote.ts">QuoteRetrieveResponse</a></code>
- <code><a href="./src/resources/quote.ts">QuoteListResponse</a></code>

Methods:

- <code title="get /api/quote/{tickers}">client.quote.<a href="./src/resources/quote.ts">retrieve</a>(tickers, { ...params }) -> QuoteRetrieveResponse</code>
- <code title="get /api/quote/list">client.quote.<a href="./src/resources/quote.ts">list</a>({ ...params }) -> QuoteListResponse</code>

# Available

Types:

- <code><a href="./src/resources/available.ts">AvailableListResponse</a></code>

Methods:

- <code title="get /api/available">client.available.<a href="./src/resources/available.ts">list</a>({ ...params }) -> AvailableListResponse</code>

# V2

## Crypto

Types:

- <code><a href="./src/resources/v2/crypto.ts">CryptoRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/crypto.ts">CryptoListAvailableResponse</a></code>

Methods:

- <code title="get /api/v2/crypto">client.v2.crypto.<a href="./src/resources/v2/crypto.ts">retrieve</a>({ ...params }) -> CryptoRetrieveResponse</code>
- <code title="get /api/v2/crypto/available">client.v2.crypto.<a href="./src/resources/v2/crypto.ts">listAvailable</a>({ ...params }) -> CryptoListAvailableResponse</code>

## Currency

Types:

- <code><a href="./src/resources/v2/currency.ts">CurrencyRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/currency.ts">CurrencyHistoricalResponse</a></code>
- <code><a href="./src/resources/v2/currency.ts">CurrencyListAvailableResponse</a></code>

Methods:

- <code title="get /api/v2/currency">client.v2.currency.<a href="./src/resources/v2/currency.ts">retrieve</a>({ ...params }) -> CurrencyRetrieveResponse</code>
- <code title="get /api/v2/currency/historical">client.v2.currency.<a href="./src/resources/v2/currency.ts">historical</a>({ ...params }) -> CurrencyHistoricalResponse</code>
- <code title="get /api/v2/currency/available">client.v2.currency.<a href="./src/resources/v2/currency.ts">listAvailable</a>({ ...params }) -> CurrencyListAvailableResponse</code>

## Inflation

Types:

- <code><a href="./src/resources/v2/inflation.ts">InflationRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/inflation.ts">InflationListAvailableResponse</a></code>

Methods:

- <code title="get /api/v2/inflation">client.v2.inflation.<a href="./src/resources/v2/inflation.ts">retrieve</a>({ ...params }) -> InflationRetrieveResponse</code>
- <code title="get /api/v2/inflation/available">client.v2.inflation.<a href="./src/resources/v2/inflation.ts">listAvailable</a>({ ...params }) -> InflationListAvailableResponse</code>

## PrimeRate

Types:

- <code><a href="./src/resources/v2/prime-rate.ts">PrimeRateRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/prime-rate.ts">PrimeRateListAvailableResponse</a></code>

Methods:

- <code title="get /api/v2/prime-rate">client.v2.primeRate.<a href="./src/resources/v2/prime-rate.ts">retrieve</a>({ ...params }) -> PrimeRateRetrieveResponse</code>
- <code title="get /api/v2/prime-rate/available">client.v2.primeRate.<a href="./src/resources/v2/prime-rate.ts">listAvailable</a>({ ...params }) -> PrimeRateListAvailableResponse</code>

## Dictionary

Types:

- <code><a href="./src/resources/v2/dictionary.ts">DictionaryRetrieveResponse</a></code>

Methods:

- <code title="get /api/v2/dictionary">client.v2.dictionary.<a href="./src/resources/v2/dictionary.ts">retrieve</a>({ ...params }) -> DictionaryRetrieveResponse</code>

## Stocks

Types:

- <code><a href="./src/resources/v2/stocks.ts">StockFundamentalsSeries</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockBalanceSheetResponse</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockCashFlowResponse</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockDividendsResponse</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockFinancialDataResponse</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockHistoricalResponse</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockIncomeStatementResponse</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockProfileResponse</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockQuoteResponse</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockStatisticsResponse</a></code>
- <code><a href="./src/resources/v2/stocks.ts">StockValueAddedResponse</a></code>

Methods:

- <code title="get /api/v2/stocks/balance-sheet">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">balanceSheet</a>({ ...params }) -> StockBalanceSheetResponse</code>
- <code title="get /api/v2/stocks/cash-flow">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">cashFlow</a>({ ...params }) -> StockCashFlowResponse</code>
- <code title="get /api/v2/stocks/dividends">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">dividends</a>({ ...params }) -> StockDividendsResponse</code>
- <code title="get /api/v2/stocks/financial-data">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">financialData</a>({ ...params }) -> StockFinancialDataResponse</code>
- <code title="get /api/v2/stocks/historical">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">historical</a>({ ...params }) -> StockHistoricalResponse</code>
- <code title="get /api/v2/stocks/income-statement">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">incomeStatement</a>({ ...params }) -> StockIncomeStatementResponse</code>
- <code title="get /api/v2/stocks/profile">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">profile</a>({ ...params }) -> StockProfileResponse</code>
- <code title="get /api/v2/stocks/quote">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">quote</a>({ ...params }) -> StockQuoteResponse</code>
- <code title="get /api/v2/stocks/statistics">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">statistics</a>({ ...params }) -> StockStatisticsResponse</code>
- <code title="get /api/v2/stocks/value-added">client.v2.stocks.<a href="./src/resources/v2/stocks.ts">valueAdded</a>({ ...params }) -> StockValueAddedResponse</code>

## Tickers

Types:

- <code><a href="./src/resources/v2/tickers.ts">TickerListResponse</a></code>
- <code><a href="./src/resources/v2/tickers.ts">TickerCoverageResponse</a></code>
- <code><a href="./src/resources/v2/tickers.ts">TickerRenamesResponse</a></code>
- <code><a href="./src/resources/v2/tickers.ts">TickerResolveResponse</a></code>

Methods:

- <code title="get /api/v2/tickers">client.v2.tickers.<a href="./src/resources/v2/tickers.ts">list</a>({ ...params }) -> TickerListResponse</code>
- <code title="get /api/v2/tickers/coverage">client.v2.tickers.<a href="./src/resources/v2/tickers.ts">coverage</a>({ ...params }) -> TickerCoverageResponse</code>
- <code title="get /api/v2/tickers/renames">client.v2.tickers.<a href="./src/resources/v2/tickers.ts">renames</a>({ ...params }) -> TickerRenamesResponse</code>
- <code title="get /api/v2/tickers/resolve">client.v2.tickers.<a href="./src/resources/v2/tickers.ts">resolve</a>({ ...params }) -> TickerResolveResponse</code>

## Fii

Types:

- <code><a href="./src/resources/v2/fii/fii.ts">PaginationMeta</a></code>
- <code><a href="./src/resources/v2/fii/fii.ts">FiiListResponse</a></code>
- <code><a href="./src/resources/v2/fii/fii.ts">FiiAnnualReportsResponse</a></code>
- <code><a href="./src/resources/v2/fii/fii.ts">FiiDividendsResponse</a></code>
- <code><a href="./src/resources/v2/fii/fii.ts">FiiFinancialsResponse</a></code>
- <code><a href="./src/resources/v2/fii/fii.ts">FiiHistoricalResponse</a></code>
- <code><a href="./src/resources/v2/fii/fii.ts">FiiReportsResponse</a></code>

Methods:

- <code title="get /api/v2/fii/list">client.v2.fii.<a href="./src/resources/v2/fii/fii.ts">list</a>({ ...params }) -> FiiListResponse</code>
- <code title="get /api/v2/fii/annual-reports">client.v2.fii.<a href="./src/resources/v2/fii/fii.ts">annualReports</a>({ ...params }) -> FiiAnnualReportsResponse</code>
- <code title="get /api/v2/fii/dividends">client.v2.fii.<a href="./src/resources/v2/fii/fii.ts">dividends</a>({ ...params }) -> FiiDividendsResponse</code>
- <code title="get /api/v2/fii/financials">client.v2.fii.<a href="./src/resources/v2/fii/fii.ts">financials</a>({ ...params }) -> FiiFinancialsResponse</code>
- <code title="get /api/v2/fii/historical">client.v2.fii.<a href="./src/resources/v2/fii/fii.ts">historical</a>({ ...params }) -> FiiHistoricalResponse</code>
- <code title="get /api/v2/fii/reports">client.v2.fii.<a href="./src/resources/v2/fii/fii.ts">reports</a>({ ...params }) -> FiiReportsResponse</code>

### Indicators

Types:

- <code><a href="./src/resources/v2/fii/indicators.ts">IndicatorRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/fii/indicators.ts">IndicatorHistoryResponse</a></code>

Methods:

- <code title="get /api/v2/fii/indicators">client.v2.fii.indicators.<a href="./src/resources/v2/fii/indicators.ts">retrieve</a>({ ...params }) -> IndicatorRetrieveResponse</code>
- <code title="get /api/v2/fii/indicators/history">client.v2.fii.indicators.<a href="./src/resources/v2/fii/indicators.ts">history</a>({ ...params }) -> IndicatorHistoryResponse</code>

### Portfolio

Types:

- <code><a href="./src/resources/v2/fii/portfolio.ts">FiiFinancialAsset</a></code>
- <code><a href="./src/resources/v2/fii/portfolio.ts">FiiPortfolioAllocation</a></code>
- <code><a href="./src/resources/v2/fii/portfolio.ts">FiiPortfolioSummary</a></code>
- <code><a href="./src/resources/v2/fii/portfolio.ts">FiiProperty</a></code>
- <code><a href="./src/resources/v2/fii/portfolio.ts">PortfolioRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/fii/portfolio.ts">PortfolioHistoryResponse</a></code>

Methods:

- <code title="get /api/v2/fii/portfolio">client.v2.fii.portfolio.<a href="./src/resources/v2/fii/portfolio.ts">retrieve</a>({ ...params }) -> PortfolioRetrieveResponse</code>
- <code title="get /api/v2/fii/portfolio/history">client.v2.fii.portfolio.<a href="./src/resources/v2/fii/portfolio.ts">history</a>({ ...params }) -> PortfolioHistoryResponse</code>

### Properties

Types:

- <code><a href="./src/resources/v2/fii/properties.ts">FiiPropertySummary</a></code>
- <code><a href="./src/resources/v2/fii/properties.ts">PropertyRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/fii/properties.ts">PropertyHistoryResponse</a></code>

Methods:

- <code title="get /api/v2/fii/properties">client.v2.fii.properties.<a href="./src/resources/v2/fii/properties.ts">retrieve</a>({ ...params }) -> PropertyRetrieveResponse</code>
- <code title="get /api/v2/fii/properties/history">client.v2.fii.properties.<a href="./src/resources/v2/fii/properties.ts">history</a>({ ...params }) -> PropertyHistoryResponse</code>

## Funds

Types:

- <code><a href="./src/resources/v2/funds/funds.ts">FundHolding</a></code>
- <code><a href="./src/resources/v2/funds/funds.ts">FundPaginationMeta</a></code>
- <code><a href="./src/resources/v2/funds/funds.ts">FundListResponse</a></code>
- <code><a href="./src/resources/v2/funds/funds.ts">FundDividendsResponse</a></code>
- <code><a href="./src/resources/v2/funds/funds.ts">FundIndicatorsResponse</a></code>
- <code><a href="./src/resources/v2/funds/funds.ts">FundPortfolioResponse</a></code>
- <code><a href="./src/resources/v2/funds/funds.ts">FundProfileResponse</a></code>

Methods:

- <code title="get /api/v2/funds/list">client.v2.funds.<a href="./src/resources/v2/funds/funds.ts">list</a>({ ...params }) -> FundListResponse</code>
- <code title="get /api/v2/funds/dividends">client.v2.funds.<a href="./src/resources/v2/funds/funds.ts">dividends</a>({ ...params }) -> FundDividendsResponse</code>
- <code title="get /api/v2/funds/indicators">client.v2.funds.<a href="./src/resources/v2/funds/funds.ts">indicators</a>({ ...params }) -> FundIndicatorsResponse</code>
- <code title="get /api/v2/funds/portfolio">client.v2.funds.<a href="./src/resources/v2/funds/funds.ts">portfolio</a>({ ...params }) -> FundPortfolioResponse</code>
- <code title="get /api/v2/funds/profile">client.v2.funds.<a href="./src/resources/v2/funds/funds.ts">profile</a>({ ...params }) -> FundProfileResponse</code>

### Nav

Types:

- <code><a href="./src/resources/v2/funds/nav.ts">NavHistoryResponse</a></code>

Methods:

- <code title="get /api/v2/funds/nav/history">client.v2.funds.nav.<a href="./src/resources/v2/funds/nav.ts">history</a>({ ...params }) -> NavHistoryResponse</code>

### Fiagro

Types:

- <code><a href="./src/resources/v2/funds/fiagro.ts">FiagroPortfolioResponse</a></code>
- <code><a href="./src/resources/v2/funds/fiagro.ts">FiagroReportsResponse</a></code>

Methods:

- <code title="get /api/v2/funds/fiagro/portfolio">client.v2.funds.fiagro.<a href="./src/resources/v2/funds/fiagro.ts">portfolio</a>({ ...params }) -> FiagroPortfolioResponse</code>
- <code title="get /api/v2/funds/fiagro/reports">client.v2.funds.fiagro.<a href="./src/resources/v2/funds/fiagro.ts">reports</a>({ ...params }) -> FiagroReportsResponse</code>

### Fidc

Types:

- <code><a href="./src/resources/v2/funds/fidc.ts">FidcPortfolioResponse</a></code>
- <code><a href="./src/resources/v2/funds/fidc.ts">FidcReportsResponse</a></code>

Methods:

- <code title="get /api/v2/funds/fidc/portfolio">client.v2.funds.fidc.<a href="./src/resources/v2/funds/fidc.ts">portfolio</a>({ ...params }) -> FidcPortfolioResponse</code>
- <code title="get /api/v2/funds/fidc/reports">client.v2.funds.fidc.<a href="./src/resources/v2/funds/fidc.ts">reports</a>({ ...params }) -> FidcReportsResponse</code>

### Fip

Types:

- <code><a href="./src/resources/v2/funds/fip.ts">FipReportsResponse</a></code>

Methods:

- <code title="get /api/v2/funds/fip/reports">client.v2.funds.fip.<a href="./src/resources/v2/funds/fip.ts">reports</a>({ ...params }) -> FipReportsResponse</code>

## Options

Types:

- <code><a href="./src/resources/v2/options/options.ts">OptionSeries</a></code>
- <code><a href="./src/resources/v2/options/options.ts">OptionChainResponse</a></code>
- <code><a href="./src/resources/v2/options/options.ts">OptionExpirationsResponse</a></code>
- <code><a href="./src/resources/v2/options/options.ts">OptionHistoricalResponse</a></code>
- <code><a href="./src/resources/v2/options/options.ts">OptionStrikesResponse</a></code>

Methods:

- <code title="get /api/v2/options/chain">client.v2.options.<a href="./src/resources/v2/options/options.ts">chain</a>({ ...params }) -> OptionChainResponse</code>
- <code title="get /api/v2/options/expirations">client.v2.options.<a href="./src/resources/v2/options/options.ts">expirations</a>({ ...params }) -> OptionExpirationsResponse</code>
- <code title="get /api/v2/options/historical">client.v2.options.<a href="./src/resources/v2/options/options.ts">historical</a>({ ...params }) -> OptionHistoricalResponse</code>
- <code title="get /api/v2/options/strikes">client.v2.options.<a href="./src/resources/v2/options/options.ts">strikes</a>({ ...params }) -> OptionStrikesResponse</code>

### Positions

Types:

- <code><a href="./src/resources/v2/options/positions.ts">PositionRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/options/positions.ts">PositionHistoryResponse</a></code>

Methods:

- <code title="get /api/v2/options/positions">client.v2.options.positions.<a href="./src/resources/v2/options/positions.ts">retrieve</a>({ ...params }) -> PositionRetrieveResponse</code>
- <code title="get /api/v2/options/positions/history">client.v2.options.positions.<a href="./src/resources/v2/options/positions.ts">history</a>({ ...params }) -> PositionHistoryResponse</code>

### Analytics

Types:

- <code><a href="./src/resources/v2/options/analytics.ts">AnalyticsRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/options/analytics.ts">AnalyticsHistoryResponse</a></code>

Methods:

- <code title="get /api/v2/options/analytics">client.v2.options.analytics.<a href="./src/resources/v2/options/analytics.ts">retrieve</a>({ ...params }) -> AnalyticsRetrieveResponse</code>
- <code title="get /api/v2/options/analytics/history">client.v2.options.analytics.<a href="./src/resources/v2/options/analytics.ts">history</a>({ ...params }) -> AnalyticsHistoryResponse</code>

## Futures

Types:

- <code><a href="./src/resources/v2/futures/futures.ts">FutureQuote</a></code>
- <code><a href="./src/resources/v2/futures/futures.ts">FutureSpecs</a></code>
- <code><a href="./src/resources/v2/futures/futures.ts">FutureListResponse</a></code>
- <code><a href="./src/resources/v2/futures/futures.ts">FutureHistoricalResponse</a></code>
- <code><a href="./src/resources/v2/futures/futures.ts">FutureQuoteResponse</a></code>
- <code><a href="./src/resources/v2/futures/futures.ts">FutureSpecsResponse</a></code>
- <code><a href="./src/resources/v2/futures/futures.ts">FutureTermStructureResponse</a></code>

Methods:

- <code title="get /api/v2/futures/list">client.v2.futures.<a href="./src/resources/v2/futures/futures.ts">list</a>({ ...params }) -> FutureListResponse</code>
- <code title="get /api/v2/futures/historical">client.v2.futures.<a href="./src/resources/v2/futures/futures.ts">historical</a>({ ...params }) -> FutureHistoricalResponse</code>
- <code title="get /api/v2/futures/quote">client.v2.futures.<a href="./src/resources/v2/futures/futures.ts">quote</a>({ ...params }) -> FutureQuoteResponse</code>
- <code title="get /api/v2/futures/specs">client.v2.futures.<a href="./src/resources/v2/futures/futures.ts">specs</a>({ ...params }) -> FutureSpecsResponse</code>
- <code title="get /api/v2/futures/term-structure">client.v2.futures.<a href="./src/resources/v2/futures/futures.ts">termStructure</a>({ ...params }) -> FutureTermStructureResponse</code>

### Options

Types:

- <code><a href="./src/resources/v2/futures/options/options.ts">FutureOptionSpecs</a></code>
- <code><a href="./src/resources/v2/futures/options/options.ts">OptionChainResponse</a></code>
- <code><a href="./src/resources/v2/futures/options/options.ts">OptionExpirationsResponse</a></code>
- <code><a href="./src/resources/v2/futures/options/options.ts">OptionHistoricalResponse</a></code>
- <code><a href="./src/resources/v2/futures/options/options.ts">OptionStrikesResponse</a></code>

Methods:

- <code title="get /api/v2/futures/options/chain">client.v2.futures.options.<a href="./src/resources/v2/futures/options/options.ts">chain</a>({ ...params }) -> OptionChainResponse</code>
- <code title="get /api/v2/futures/options/expirations">client.v2.futures.options.<a href="./src/resources/v2/futures/options/options.ts">expirations</a>({ ...params }) -> OptionExpirationsResponse</code>
- <code title="get /api/v2/futures/options/historical">client.v2.futures.options.<a href="./src/resources/v2/futures/options/options.ts">historical</a>({ ...params }) -> OptionHistoricalResponse</code>
- <code title="get /api/v2/futures/options/strikes">client.v2.futures.options.<a href="./src/resources/v2/futures/options/options.ts">strikes</a>({ ...params }) -> OptionStrikesResponse</code>

#### Positions

Types:

- <code><a href="./src/resources/v2/futures/options/positions.ts">PositionRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/futures/options/positions.ts">PositionHistoryResponse</a></code>

Methods:

- <code title="get /api/v2/futures/options/positions">client.v2.futures.options.positions.<a href="./src/resources/v2/futures/options/positions.ts">retrieve</a>({ ...params }) -> PositionRetrieveResponse</code>
- <code title="get /api/v2/futures/options/positions/history">client.v2.futures.options.positions.<a href="./src/resources/v2/futures/options/positions.ts">history</a>({ ...params }) -> PositionHistoryResponse</code>

#### Analytics

Types:

- <code><a href="./src/resources/v2/futures/options/analytics.ts">AnalyticsRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/futures/options/analytics.ts">AnalyticsHistoryResponse</a></code>

Methods:

- <code title="get /api/v2/futures/options/analytics">client.v2.futures.options.analytics.<a href="./src/resources/v2/futures/options/analytics.ts">retrieve</a>({ ...params }) -> AnalyticsRetrieveResponse</code>
- <code title="get /api/v2/futures/options/analytics/history">client.v2.futures.options.analytics.<a href="./src/resources/v2/futures/options/analytics.ts">history</a>({ ...params }) -> AnalyticsHistoryResponse</code>

## Macro

Types:

- <code><a href="./src/resources/v2/macro.ts">MacroSeriesAliasWarning</a></code>
- <code><a href="./src/resources/v2/macro.ts">MacroSeriesError</a></code>
- <code><a href="./src/resources/v2/macro.ts">MacroSeriesObservation</a></code>
- <code><a href="./src/resources/v2/macro.ts">MacroSeriesPublic</a></code>
- <code><a href="./src/resources/v2/macro.ts">MacroRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/macro.ts">MacroLatestResponse</a></code>
- <code><a href="./src/resources/v2/macro.ts">MacroListAvailableResponse</a></code>

Methods:

- <code title="get /api/v2/macro">client.v2.macro.<a href="./src/resources/v2/macro.ts">retrieve</a>({ ...params }) -> MacroRetrieveResponse</code>
- <code title="get /api/v2/macro/latest">client.v2.macro.<a href="./src/resources/v2/macro.ts">latest</a>({ ...params }) -> MacroLatestResponse</code>
- <code title="get /api/v2/macro/available">client.v2.macro.<a href="./src/resources/v2/macro.ts">listAvailable</a>({ ...params }) -> MacroListAvailableResponse</code>

## Treasury

Types:

- <code><a href="./src/resources/v2/treasury/treasury.ts">TreasuryListItem</a></code>
- <code><a href="./src/resources/v2/treasury/treasury.ts">TreasuryListResponse</a></code>

Methods:

- <code title="get /api/v2/treasury/list">client.v2.treasury.<a href="./src/resources/v2/treasury/treasury.ts">list</a>({ ...params }) -> TreasuryListResponse</code>

### Indicators

Types:

- <code><a href="./src/resources/v2/treasury/indicators.ts">IndicatorRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/treasury/indicators.ts">IndicatorHistoryResponse</a></code>

Methods:

- <code title="get /api/v2/treasury/indicators">client.v2.treasury.indicators.<a href="./src/resources/v2/treasury/indicators.ts">retrieve</a>({ ...params }) -> IndicatorRetrieveResponse</code>
- <code title="get /api/v2/treasury/indicators/history">client.v2.treasury.indicators.<a href="./src/resources/v2/treasury/indicators.ts">history</a>({ ...params }) -> IndicatorHistoryResponse</code>

## User

Types:

- <code><a href="./src/resources/v2/user.ts">UserUsageResponse</a></code>

Methods:

- <code title="get /api/v2/user/usage">client.v2.user.<a href="./src/resources/v2/user.ts">usage</a>({ ...params }) -> UserUsageResponse</code>
