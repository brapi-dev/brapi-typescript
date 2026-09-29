// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource options', () => {
  test('chain: only required params', async () => {
    const responsePromise = client.v2.options.chain({ expirationDate: '2026-12-18', underlying: 'PETR4' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('chain: required and optional params', async () => {
    const response = await client.v2.options.chain({
      expirationDate: '2026-12-18',
      underlying: 'PETR4',
      date: '2026-06-01',
      maxStrike: 0,
      minStrike: 0,
      side: 'call',
    });
  });

  test('expirations: only required params', async () => {
    const responsePromise = client.v2.options.expirations({ underlying: 'PETR4' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('expirations: required and optional params', async () => {
    const response = await client.v2.options.expirations({ underlying: 'PETR4', includeExpired: 'true' });
  });

  test('historical: only required params', async () => {
    const responsePromise = client.v2.options.historical({
      expirationDate: '2026-12-18',
      symbol: 'PETRF783',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('historical: required and optional params', async () => {
    const response = await client.v2.options.historical({
      expirationDate: '2026-12-18',
      symbol: 'PETRF783',
      endDate: '2026-06-01',
      sortOrder: 'asc',
      startDate: '2026-05-01',
      strike: 7.29,
    });
  });

  test('strikes: only required params', async () => {
    const responsePromise = client.v2.options.strikes({ expirationDate: '2026-12-18', underlying: 'PETR4' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('strikes: required and optional params', async () => {
    const response = await client.v2.options.strikes({
      expirationDate: '2026-12-18',
      underlying: 'PETR4',
      side: 'call',
    });
  });
});
