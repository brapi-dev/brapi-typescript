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
    const responsePromise = client.v2.stocks.insiderTransactions({ symbols: 'PETR4,VALE3' });
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
      symbols: 'PETR4,VALE3',
      allVersions: 'true',
      companyRelation: 'company',
      direction: 'credit',
      endDate: '2026-08-31',
      limit: 1,
      movementType: 'Compra à vista',
      page: 1,
      roleGroup: 'controller',
      startDate: '2026-01-01',
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
