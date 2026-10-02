// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CryptoAPI from './crypto';
import {
  Crypto,
  CryptoListAvailableParams,
  CryptoListAvailableResponse,
  CryptoRetrieveParams,
  CryptoRetrieveResponse,
} from './crypto';
import * as CurrencyAPI from './currency';
import {
  Currency,
  CurrencyHistoricalParams,
  CurrencyHistoricalResponse,
  CurrencyListAvailableParams,
  CurrencyListAvailableResponse,
  CurrencyRetrieveParams,
  CurrencyRetrieveResponse,
} from './currency';
import * as DictionaryAPI from './dictionary';
import { Dictionary, DictionaryRetrieveParams, DictionaryRetrieveResponse } from './dictionary';
import * as InflationAPI from './inflation';
import {
  Inflation,
  InflationListAvailableParams,
  InflationListAvailableResponse,
  InflationRetrieveParams,
  InflationRetrieveResponse,
} from './inflation';
import * as MacroAPI from './macro';
import {
  Macro,
  MacroLatestParams,
  MacroLatestResponse,
  MacroListAvailableParams,
  MacroListAvailableResponse,
  MacroRetrieveParams,
  MacroRetrieveResponse,
  MacroSeriesAliasWarning,
  MacroSeriesError,
  MacroSeriesObservation,
  MacroSeriesPublic,
} from './macro';
import * as PrimeRateAPI from './prime-rate';
import {
  PrimeRate,
  PrimeRateListAvailableParams,
  PrimeRateListAvailableResponse,
  PrimeRateRetrieveParams,
  PrimeRateRetrieveResponse,
} from './prime-rate';
import * as StocksAPI from './stocks';
import {
  StockBalanceSheetParams,
  StockBalanceSheetResponse,
  StockCashFlowParams,
  StockCashFlowResponse,
  StockDividendsParams,
  StockDividendsResponse,
  StockFinancialDataParams,
  StockFinancialDataResponse,
  StockFundamentalsSeries,
  StockHistoricalParams,
  StockHistoricalResponse,
  StockIncomeStatementParams,
  StockIncomeStatementResponse,
  StockInsiderTransactionsParams,
  StockInsiderTransactionsResponse,
  StockProfileParams,
  StockProfileResponse,
  StockQuoteParams,
  StockQuoteResponse,
  StockStatisticsParams,
  StockStatisticsResponse,
  StockValueAddedParams,
  StockValueAddedResponse,
  Stocks,
} from './stocks';
import * as TickersAPI from './tickers';
import {
  TickerCoverageParams,
  TickerCoverageResponse,
  TickerListParams,
  TickerListResponse,
  TickerRenamesParams,
  TickerRenamesResponse,
  TickerResolveParams,
  TickerResolveResponse,
  Tickers,
} from './tickers';
import * as UserAPI from './user';
import { User, UserUsageParams, UserUsageResponse } from './user';
import * as FiiAPI from './fii/fii';
import {
  Fii,
  FiiAnnualReportsParams,
  FiiAnnualReportsResponse,
  FiiDividendsParams,
  FiiDividendsResponse,
  FiiFinancialsParams,
  FiiFinancialsResponse,
  FiiHistoricalParams,
  FiiHistoricalResponse,
  FiiListParams,
  FiiListResponse,
  FiiReportsParams,
  FiiReportsResponse,
  PaginationMeta,
} from './fii/fii';
import * as FundsAPI from './funds/funds';
import {
  FundDividendsParams,
  FundDividendsResponse,
  FundHolding,
  FundIndicatorsParams,
  FundIndicatorsResponse,
  FundListParams,
  FundListResponse,
  FundPaginationMeta,
  FundPortfolioParams,
  FundPortfolioResponse,
  FundProfileParams,
  FundProfileResponse,
  Funds,
} from './funds/funds';
import * as FuturesAPI from './futures/futures';
import {
  FutureHistoricalParams,
  FutureHistoricalResponse,
  FutureListParams,
  FutureListResponse,
  FutureQuote,
  FutureQuoteParams,
  FutureQuoteResponse,
  FutureSpecs,
  FutureSpecsParams,
  FutureSpecsResponse,
  FutureTermStructureParams,
  FutureTermStructureResponse,
  Futures,
} from './futures/futures';
import * as OptionsAPI from './options/options';
import {
  OptionChainParams,
  OptionChainResponse,
  OptionExpirationsParams,
  OptionExpirationsResponse,
  OptionHistoricalParams,
  OptionHistoricalResponse,
  OptionSeries,
  OptionStrikesParams,
  OptionStrikesResponse,
  Options,
} from './options/options';
import * as TreasuryAPI from './treasury/treasury';
import { Treasury, TreasuryListItem, TreasuryListParams, TreasuryListResponse } from './treasury/treasury';

export class V2 extends APIResource {
  crypto: CryptoAPI.Crypto = new CryptoAPI.Crypto(this._client);
  currency: CurrencyAPI.Currency = new CurrencyAPI.Currency(this._client);
  inflation: InflationAPI.Inflation = new InflationAPI.Inflation(this._client);
  primeRate: PrimeRateAPI.PrimeRate = new PrimeRateAPI.PrimeRate(this._client);
  dictionary: DictionaryAPI.Dictionary = new DictionaryAPI.Dictionary(this._client);
  stocks: StocksAPI.Stocks = new StocksAPI.Stocks(this._client);
  tickers: TickersAPI.Tickers = new TickersAPI.Tickers(this._client);
  fii: FiiAPI.Fii = new FiiAPI.Fii(this._client);
  funds: FundsAPI.Funds = new FundsAPI.Funds(this._client);
  options: OptionsAPI.Options = new OptionsAPI.Options(this._client);
  futures: FuturesAPI.Futures = new FuturesAPI.Futures(this._client);
  macro: MacroAPI.Macro = new MacroAPI.Macro(this._client);
  treasury: TreasuryAPI.Treasury = new TreasuryAPI.Treasury(this._client);
  user: UserAPI.User = new UserAPI.User(this._client);
}

V2.Crypto = Crypto;
V2.Currency = Currency;
V2.Inflation = Inflation;
V2.PrimeRate = PrimeRate;
V2.Dictionary = Dictionary;
V2.Stocks = Stocks;
V2.Tickers = Tickers;
V2.Fii = Fii;
V2.Funds = Funds;
V2.Options = Options;
V2.Futures = Futures;
V2.Macro = Macro;
V2.Treasury = Treasury;
V2.User = User;

export declare namespace V2 {
  export {
    Crypto as Crypto,
    type CryptoRetrieveResponse as CryptoRetrieveResponse,
    type CryptoListAvailableResponse as CryptoListAvailableResponse,
    type CryptoRetrieveParams as CryptoRetrieveParams,
    type CryptoListAvailableParams as CryptoListAvailableParams,
  };

  export {
    Currency as Currency,
    type CurrencyRetrieveResponse as CurrencyRetrieveResponse,
    type CurrencyHistoricalResponse as CurrencyHistoricalResponse,
    type CurrencyListAvailableResponse as CurrencyListAvailableResponse,
    type CurrencyRetrieveParams as CurrencyRetrieveParams,
    type CurrencyHistoricalParams as CurrencyHistoricalParams,
    type CurrencyListAvailableParams as CurrencyListAvailableParams,
  };

  export {
    Inflation as Inflation,
    type InflationRetrieveResponse as InflationRetrieveResponse,
    type InflationListAvailableResponse as InflationListAvailableResponse,
    type InflationRetrieveParams as InflationRetrieveParams,
    type InflationListAvailableParams as InflationListAvailableParams,
  };

  export {
    PrimeRate as PrimeRate,
    type PrimeRateRetrieveResponse as PrimeRateRetrieveResponse,
    type PrimeRateListAvailableResponse as PrimeRateListAvailableResponse,
    type PrimeRateRetrieveParams as PrimeRateRetrieveParams,
    type PrimeRateListAvailableParams as PrimeRateListAvailableParams,
  };

  export {
    Dictionary as Dictionary,
    type DictionaryRetrieveResponse as DictionaryRetrieveResponse,
    type DictionaryRetrieveParams as DictionaryRetrieveParams,
  };

  export {
    Stocks as Stocks,
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
    type StockStatisticsParams as StockStatisticsParams,
    type StockValueAddedParams as StockValueAddedParams,
  };

  export {
    Tickers as Tickers,
    type TickerListResponse as TickerListResponse,
    type TickerCoverageResponse as TickerCoverageResponse,
    type TickerRenamesResponse as TickerRenamesResponse,
    type TickerResolveResponse as TickerResolveResponse,
    type TickerListParams as TickerListParams,
    type TickerCoverageParams as TickerCoverageParams,
    type TickerRenamesParams as TickerRenamesParams,
    type TickerResolveParams as TickerResolveParams,
  };

  export {
    Fii as Fii,
    type PaginationMeta as PaginationMeta,
    type FiiListResponse as FiiListResponse,
    type FiiAnnualReportsResponse as FiiAnnualReportsResponse,
    type FiiDividendsResponse as FiiDividendsResponse,
    type FiiFinancialsResponse as FiiFinancialsResponse,
    type FiiHistoricalResponse as FiiHistoricalResponse,
    type FiiReportsResponse as FiiReportsResponse,
    type FiiListParams as FiiListParams,
    type FiiAnnualReportsParams as FiiAnnualReportsParams,
    type FiiDividendsParams as FiiDividendsParams,
    type FiiFinancialsParams as FiiFinancialsParams,
    type FiiHistoricalParams as FiiHistoricalParams,
    type FiiReportsParams as FiiReportsParams,
  };

  export {
    Funds as Funds,
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
    Options as Options,
    type OptionSeries as OptionSeries,
    type OptionChainResponse as OptionChainResponse,
    type OptionExpirationsResponse as OptionExpirationsResponse,
    type OptionHistoricalResponse as OptionHistoricalResponse,
    type OptionStrikesResponse as OptionStrikesResponse,
    type OptionChainParams as OptionChainParams,
    type OptionExpirationsParams as OptionExpirationsParams,
    type OptionHistoricalParams as OptionHistoricalParams,
    type OptionStrikesParams as OptionStrikesParams,
  };

  export {
    Futures as Futures,
    type FutureQuote as FutureQuote,
    type FutureSpecs as FutureSpecs,
    type FutureListResponse as FutureListResponse,
    type FutureHistoricalResponse as FutureHistoricalResponse,
    type FutureQuoteResponse as FutureQuoteResponse,
    type FutureSpecsResponse as FutureSpecsResponse,
    type FutureTermStructureResponse as FutureTermStructureResponse,
    type FutureListParams as FutureListParams,
    type FutureHistoricalParams as FutureHistoricalParams,
    type FutureQuoteParams as FutureQuoteParams,
    type FutureSpecsParams as FutureSpecsParams,
    type FutureTermStructureParams as FutureTermStructureParams,
  };

  export {
    Macro as Macro,
    type MacroSeriesAliasWarning as MacroSeriesAliasWarning,
    type MacroSeriesError as MacroSeriesError,
    type MacroSeriesObservation as MacroSeriesObservation,
    type MacroSeriesPublic as MacroSeriesPublic,
    type MacroRetrieveResponse as MacroRetrieveResponse,
    type MacroLatestResponse as MacroLatestResponse,
    type MacroListAvailableResponse as MacroListAvailableResponse,
    type MacroRetrieveParams as MacroRetrieveParams,
    type MacroLatestParams as MacroLatestParams,
    type MacroListAvailableParams as MacroListAvailableParams,
  };

  export {
    Treasury as Treasury,
    type TreasuryListItem as TreasuryListItem,
    type TreasuryListResponse as TreasuryListResponse,
    type TreasuryListParams as TreasuryListParams,
  };

  export {
    User as User,
    type UserUsageResponse as UserUsageResponse,
    type UserUsageParams as UserUsageParams,
  };
}
