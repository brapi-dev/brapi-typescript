// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource quote', () => {
  test('retrieve', async () => {
    const responsePromise = client.quote.retrieve('PETR4,VALE3');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.quote.retrieve(
        'PETR4,VALE3',
        {
          token: 'token',
          dividends: 'true',
          endDate: '2024-12-31',
          includeRaw: 'true',
          interval: '1m',
          modules: 'summaryProfile,balanceSheetHistory,financialData',
          range: '1d',
          startDate: '2024-01-01',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.quote.list();
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
      client.quote.list(
        {
          token: 'token',
          limit: 'limit',
          page: 'page',
          search: 'search',
          sector: 'sector',
          sortBy: 'name',
          sortOrder: 'asc',
          subsector: 'subsector',
          subType: 'stock',
          type: 'stock',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });
});
