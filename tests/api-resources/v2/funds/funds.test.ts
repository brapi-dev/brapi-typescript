// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource funds', () => {
  test('list', async () => {
    const responsePromise = client.v2.funds.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.funds.list(
        {
          assetType: 'fii',
          cnpjs: '42730834000100',
          etfCategory: 'fixed-income',
          limit: 20,
          page: 1,
          search: 'search',
          sortBy: 'sortBy',
          sortOrder: 'desc',
          status: 'status',
          symbols: 'JURO11',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('dividends', async () => {
    const responsePromise = client.v2.funds.dividends();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('dividends: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.funds.dividends(
        {
          assetType: 'fiagro',
          cnpjs: '42730834000100',
          endDate: '2026-06-30',
          limit: 20,
          page: 1,
          sortBy: 'lastDatePrior',
          sortOrder: 'desc',
          startDate: '2026-01-01',
          symbols: 'JURO11',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('indicators', async () => {
    const responsePromise = client.v2.funds.indicators();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('indicators: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.funds.indicators(
        {
          assetType: 'fii',
          cnpjs: '42730834000100',
          symbols: 'JURO11',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('portfolio', async () => {
    const responsePromise = client.v2.funds.portfolio();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('portfolio: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.funds.portfolio(
        {
          cnpjs: '42730834000100',
          include: 'include',
          limit: 20,
          page: 1,
          referenceDate: 'referenceDate',
          symbols: 'JURO11',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('profile', async () => {
    const responsePromise = client.v2.funds.profile();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('profile: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.funds.profile(
        {
          cnpjs: '42730834000100',
          endDate: '2026-06-30',
          include: 'include',
          referenceDate: 'referenceDate',
          startDate: '2026-01-01',
          symbols: 'JURO11',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('screener', async () => {
    const responsePromise = client.v2.funds.screener();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('screener: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.funds.screener(
        {
          assetType: 'fii',
          averageDailyTradedValueMax: 0,
          averageDailyTradedValueMin: 0,
          changePercentMax: 0,
          changePercentMin: 0,
          dividendYieldMax: 0,
          dividendYieldMin: 0,
          equityMax: 0,
          equityMin: 0,
          etfCategory: 'fixed-income',
          incomeMonths12mMax: 0,
          incomeMonths12mMin: 0,
          lastDividendMax: 0,
          lastDividendMin: 0,
          lastDividendYieldMax: 0,
          lastDividendYieldMin: 0,
          lastPriceMax: 0,
          lastPriceMin: 0,
          limit: 20,
          marketCapMax: 0,
          marketCapMin: 0,
          navPerShareMax: 0,
          navPerShareMin: 0,
          page: 1,
          priceChange12mMax: 0,
          priceChange12mMin: 0,
          priceToNavMax: 0,
          priceToNavMin: 0,
          search: 'KINEA',
          segment: 'Logística',
          segmentType: 'papel',
          sortBy: 'dividendYield',
          sortOrder: 'desc',
          totalFeePercentMax: 0,
          totalFeePercentMin: 0,
          totalInvestorsMax: 0,
          totalInvestorsMin: 0,
          volumeMax: 0,
          volumeMin: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('screenerCnpj', async () => {
    const responsePromise = client.v2.funds.screenerCnpj();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('screenerCnpj: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.funds.screenerCnpj(
        {
          anbimaClassification: 'Previdência',
          classification: 'renda-fixa',
          equityMax: 0,
          equityMin: 0,
          limit: 20,
          manager: 'Itaú',
          navPerShareMax: 0,
          navPerShareMin: 0,
          netFlow1mMax: 0,
          netFlow1mMin: 0,
          page: 1,
          return12mMax: 0,
          return12mMin: 0,
          return1mMax: 0,
          return1mMin: 0,
          return36mMax: 0,
          return36mMin: 0,
          returnDayMax: 0,
          returnDayMin: 0,
          returnYtdMax: 0,
          returnYtdMin: 0,
          search: 'Itaú Previdência',
          sortBy: 'return12m',
          sortOrder: 'desc',
          totalInvestorsMax: 0,
          totalInvestorsMin: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });
});
