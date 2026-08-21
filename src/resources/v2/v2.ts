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
  CurrencyListAvailableParams,
  CurrencyListAvailableResponse,
  CurrencyRetrieveParams,
  CurrencyRetrieveResponse,
} from './currency';
import * as InflationAPI from './inflation';
import {
  Inflation,
  InflationListAvailableParams,
  InflationListAvailableResponse,
  InflationRetrieveParams,
  InflationRetrieveResponse,
} from './inflation';
import * as PrimeRateAPI from './prime-rate';
import {
  PrimeRate,
  PrimeRateListAvailableParams,
  PrimeRateListAvailableResponse,
  PrimeRateRetrieveParams,
  PrimeRateRetrieveResponse,
} from './prime-rate';

export class V2 extends APIResource {
  crypto: CryptoAPI.Crypto = new CryptoAPI.Crypto(this._client);
  currency: CurrencyAPI.Currency = new CurrencyAPI.Currency(this._client);
  inflation: InflationAPI.Inflation = new InflationAPI.Inflation(this._client);
  primeRate: PrimeRateAPI.PrimeRate = new PrimeRateAPI.PrimeRate(this._client);
}

V2.Crypto = Crypto;
V2.Currency = Currency;
V2.Inflation = Inflation;
V2.PrimeRate = PrimeRate;

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
    type CurrencyListAvailableResponse as CurrencyListAvailableResponse,
    type CurrencyRetrieveParams as CurrencyRetrieveParams,
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
}
