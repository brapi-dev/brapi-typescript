// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tickers', () => {
  test('list', async () => {
    const responsePromise = client.v2.tickers.list();
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
      client.v2.tickers.list(
        {
          limit: 20,
          page: 1,
          search: 'PETR',
          sector: 'Finance',
          sortBy: 'volume',
          sortOrder: 'desc',
          subsector: 'Comércio',
          subType: 'fii',
          type: 'stock',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('coverage: only required params', async () => {
    const responsePromise = client.v2.tickers.coverage({ symbols: 'PETR4,MXRF11,VVAR3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('coverage: required and optional params', async () => {
    const response = await client.v2.tickers.coverage({ symbols: 'PETR4,MXRF11,VVAR3' });
  });

  test('renames', async () => {
    const responsePromise = client.v2.tickers.renames();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('renames: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.tickers.renames(
        {
          endDate: '2026-12-31',
          search: 'BHIA',
          startDate: '2024-01-01',
          symbols: 'VVAR3,BHIA3',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('resolve: only required params', async () => {
    const responsePromise = client.v2.tickers.resolve({ symbols: 'VVAR3,PETR4' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('resolve: required and optional params', async () => {
    const response = await client.v2.tickers.resolve({ symbols: 'VVAR3,PETR4' });
  });
});
