# Quote

Types:

- <code><a href="./src/resources/quote.ts">BalanceSheetEntry</a></code>
- <code><a href="./src/resources/quote.ts">CashflowEntry</a></code>
- <code><a href="./src/resources/quote.ts">DefaultKeyStatisticsEntry</a></code>
- <code><a href="./src/resources/quote.ts">FinancialDataEntry</a></code>
- <code><a href="./src/resources/quote.ts">IncomeStatementEntry</a></code>
- <code><a href="./src/resources/quote.ts">ValueAddedEntry</a></code>
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
- <code><a href="./src/resources/v2/currency.ts">CurrencyListAvailableResponse</a></code>

Methods:

- <code title="get /api/v2/currency">client.v2.currency.<a href="./src/resources/v2/currency.ts">retrieve</a>({ ...params }) -> CurrencyRetrieveResponse</code>
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
