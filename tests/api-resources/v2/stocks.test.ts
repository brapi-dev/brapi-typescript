// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource stocks', () => {
  test('balanceSheet: only required params', async () => {
    const responsePromise = client.v2.stocks.balanceSheet({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('balanceSheet: required and optional params', async () => {
    const response = await client.v2.stocks.balanceSheet({
      symbols: 'PETR4,VALE3',
      endDate: '2024-12-31',
      period: 'annual',
      startDate: '2024-01-01',
    });
  });

  test('cashFlow: only required params', async () => {
    const responsePromise = client.v2.stocks.cashFlow({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cashFlow: required and optional params', async () => {
    const response = await client.v2.stocks.cashFlow({
      symbols: 'PETR4,VALE3',
      endDate: '2024-12-31',
      period: 'annual',
      startDate: '2024-01-01',
    });
  });

  test('dividends: only required params', async () => {
    const responsePromise = client.v2.stocks.dividends({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('dividends: required and optional params', async () => {
    const response = await client.v2.stocks.dividends({
      symbols: 'PETR4,VALE3',
      endDate: '2024-12-31',
      includeRaw: 'true',
      sortBy: 'paymentDate',
      sortOrder: 'desc',
      startDate: '2024-01-01',
    });
  });

  test('financialData: only required params', async () => {
    const responsePromise = client.v2.stocks.financialData({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('financialData: required and optional params', async () => {
    const response = await client.v2.stocks.financialData({
      symbols: 'PETR4,VALE3',
      endDate: '2024-12-31',
      mode: 'current',
      period: 'annual',
      startDate: '2024-01-01',
    });
  });

  test('historical: only required params', async () => {
    const responsePromise = client.v2.stocks.historical({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('historical: required and optional params', async () => {
    const response = await client.v2.stocks.historical({
      symbols: 'PETR4,VALE3',
      endDate: '2024-12-31',
      includeRaw: 'true',
      interval: '1d',
      range: '1y',
      sortOrder: 'desc',
      startDate: '2024-01-01',
    });
  });

  test('incomeStatement: only required params', async () => {
    const responsePromise = client.v2.stocks.incomeStatement({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('incomeStatement: required and optional params', async () => {
    const response = await client.v2.stocks.incomeStatement({
      symbols: 'PETR4,VALE3',
      endDate: '2024-12-31',
      period: 'annual',
      startDate: '2024-01-01',
    });
  });

  test('insiderTransactions: only required params', async () => {
    const responsePromise = client.v2.stocks.insiderTransactions({ symbols: 'VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('insiderTransactions: required and optional params', async () => {
    const response = await client.v2.stocks.insiderTransactions({
      symbols: 'VALE3',
      allVersions: 'true',
      companyRelation: 'company',
      direction: 'credit',
      endDate: '2026-08-31',
      limit: 1,
      movementType: 'Compra à vista',
      page: 1,
      roleGroup: 'controller',
      startDate: '2026-08-01',
    });
  });

  test('profile: only required params', async () => {
    const responsePromise = client.v2.stocks.profile({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('profile: required and optional params', async () => {
    const response = await client.v2.stocks.profile({ symbols: 'PETR4,VALE3' });
  });

  test('quote: only required params', async () => {
    const responsePromise = client.v2.stocks.quote({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('quote: required and optional params', async () => {
    const response = await client.v2.stocks.quote({ symbols: 'PETR4,VALE3' });
  });

  test('screener', async () => {
    const responsePromise = client.v2.stocks.screener();
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
      client.v2.stocks.screener(
        {
          bookValuePerShareMax: 0,
          bookValuePerShareMin: 0,
          changePercentMax: 0,
          changePercentMin: 0,
          currentRatioMax: 0,
          currentRatioMin: 0,
          debtToEquityMax: 0,
          debtToEquityMin: 0,
          dividendYieldMax: 0,
          dividendYieldMin: 0,
          earningsGrowthAnnualMax: 0,
          earningsGrowthAnnualMin: 0,
          earningsGrowthMax: 0,
          earningsGrowthMin: 0,
          earningsPerShareMax: 0,
          earningsPerShareMin: 0,
          ebitdaMarginMax: 0,
          ebitdaMarginMin: 0,
          ebitdaMax: 0,
          ebitdaMin: 0,
          enterpriseToEbitdaMax: 0,
          enterpriseToEbitdaMin: 0,
          enterpriseToRevenueMax: 0,
          enterpriseToRevenueMin: 0,
          enterpriseValueMax: 0,
          enterpriseValueMin: 0,
          fiftyTwoWeekChangeMax: 0,
          fiftyTwoWeekChangeMin: 0,
          freeCashflowMax: 0,
          freeCashflowMin: 0,
          grossMarginMax: 0,
          grossMarginMin: 0,
          lastPriceMax: 0,
          lastPriceMin: 0,
          limit: 20,
          marketCapMax: 0,
          marketCapMin: 0,
          netDebtToEbitdaMax: 0,
          netDebtToEbitdaMin: 0,
          netMarginMax: 0,
          netMarginMin: 0,
          operatingMarginMax: 0,
          operatingMarginMin: 0,
          page: 1,
          pegRatioMax: 0,
          pegRatioMin: 0,
          priceToBookMax: 0,
          priceToBookMin: 0,
          quickRatioMax: 0,
          quickRatioMin: 0,
          returnOnAssetsMax: 0,
          returnOnAssetsMin: 0,
          returnOnEquityMax: 0,
          returnOnEquityMin: 0,
          revenueGrowthAnnualMax: 0,
          revenueGrowthAnnualMin: 0,
          revenueGrowthMax: 0,
          revenueGrowthMin: 0,
          search: 'BANCO',
          sector: 'Finance',
          sortBy: 'dividendYield',
          sortOrder: 'desc',
          subsector: 'Energia Elétrica',
          subType: 'unit',
          totalCashMax: 0,
          totalCashMin: 0,
          totalDebtMax: 0,
          totalDebtMin: 0,
          totalRevenueMax: 0,
          totalRevenueMin: 0,
          trailingPEMax: 0,
          trailingPEMin: 0,
          type: 'stock',
          volumeMax: 0,
          volumeMin: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('statistics: only required params', async () => {
    const responsePromise = client.v2.stocks.statistics({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('statistics: required and optional params', async () => {
    const response = await client.v2.stocks.statistics({
      symbols: 'PETR4,VALE3',
      endDate: '2024-12-31',
      mode: 'current',
      period: 'annual',
      startDate: '2024-01-01',
    });
  });

  test('valueAdded: only required params', async () => {
    const responsePromise = client.v2.stocks.valueAdded({ symbols: 'PETR4,VALE3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('valueAdded: required and optional params', async () => {
    const response = await client.v2.stocks.valueAdded({
      symbols: 'PETR4,VALE3',
      endDate: '2024-12-31',
      period: 'annual',
      startDate: '2024-01-01',
    });
  });
});
