// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource analytics', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.v2.futures.options.analytics.retrieve({
      expirationDate: '2027-08-31',
      underlying: 'BGI',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.v2.futures.options.analytics.retrieve({
      expirationDate: '2027-08-31',
      underlying: 'BGI',
      date: 'date',
      limit: 50,
      maxStrike: 0,
      minStrike: 0,
      side: 'call',
    });
  });

  test('history: only required params', async () => {
    const responsePromise = client.v2.futures.options.analytics.history({ symbol: 'BGIM26C028000' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('history: required and optional params', async () => {
    const response = await client.v2.futures.options.analytics.history({
      symbol: 'BGIM26C028000',
      endDate: '2026-06-01',
      sortOrder: 'asc',
      startDate: '2026-05-01',
    });
  });
});
