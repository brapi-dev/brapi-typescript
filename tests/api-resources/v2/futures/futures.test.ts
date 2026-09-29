// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource futures', () => {
  test('list', async () => {
    const responsePromise = client.v2.futures.list();
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
      client.v2.futures.list(
        {
          asset: 'BGI',
          includeExpired: 'true',
          limit: 1,
          page: 1,
          segment: 'financial',
          sortBy: 'symbol',
          sortOrder: 'asc',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('historical: only required params', async () => {
    const responsePromise = client.v2.futures.historical({ symbol: 'WINM26' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('historical: required and optional params', async () => {
    const response = await client.v2.futures.historical({
      symbol: 'WINM26',
      endDate: 'endDate',
      sortOrder: 'asc',
      startDate: 'startDate',
    });
  });

  test('quote: only required params', async () => {
    const responsePromise = client.v2.futures.quote({ symbols: 'WINM26,BGIF27,DI1F27' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('quote: required and optional params', async () => {
    const response = await client.v2.futures.quote({ symbols: 'WINM26,BGIF27,DI1F27' });
  });

  test('specs: only required params', async () => {
    const responsePromise = client.v2.futures.specs({ symbols: 'WINM26,BGIF27,DI1F27' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('specs: required and optional params', async () => {
    const response = await client.v2.futures.specs({ symbols: 'WINM26,BGIF27,DI1F27' });
  });

  test('termStructure: only required params', async () => {
    const responsePromise = client.v2.futures.termStructure({ asset: 'BGI' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('termStructure: required and optional params', async () => {
    const response = await client.v2.futures.termStructure({ asset: 'BGI', includeExpired: 'true' });
  });
});
