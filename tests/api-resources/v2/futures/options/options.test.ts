// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource options', () => {
  test('chain: only required params', async () => {
    const responsePromise = client.v2.futures.options.chain({
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

  test('chain: required and optional params', async () => {
    const response = await client.v2.futures.options.chain({
      expirationDate: '2027-08-31',
      underlying: 'BGI',
      date: 'date',
      maxStrike: 0,
      minStrike: 0,
      side: 'call',
    });
  });

  test('expirations: only required params', async () => {
    const responsePromise = client.v2.futures.options.expirations({ underlying: 'BGI' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('expirations: required and optional params', async () => {
    const response = await client.v2.futures.options.expirations({
      underlying: 'BGI',
      includeExpired: 'true',
    });
  });

  test('historical: only required params', async () => {
    const responsePromise = client.v2.futures.options.historical({ symbol: 'BGIM26C028000' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('historical: required and optional params', async () => {
    const response = await client.v2.futures.options.historical({
      symbol: 'BGIM26C028000',
      endDate: '2026-06-01',
      sortOrder: 'asc',
      startDate: '2026-05-01',
    });
  });

  test('strikes: only required params', async () => {
    const responsePromise = client.v2.futures.options.strikes({
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

  test('strikes: required and optional params', async () => {
    const response = await client.v2.futures.options.strikes({
      expirationDate: '2027-08-31',
      underlying: 'BGI',
      side: 'call',
    });
  });
});
