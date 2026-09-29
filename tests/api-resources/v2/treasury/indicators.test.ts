// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource indicators', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.v2.treasury.indicators.retrieve({
      symbols: 'tesouro-selic-01032031,tesouro-ipca-15052035',
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
    const response = await client.v2.treasury.indicators.retrieve({
      symbols: 'tesouro-selic-01032031,tesouro-ipca-15052035',
    });
  });

  test('history: only required params', async () => {
    const responsePromise = client.v2.treasury.indicators.history({
      symbols: 'tesouro-selic-01032031,tesouro-ipca-15052035',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('history: required and optional params', async () => {
    const response = await client.v2.treasury.indicators.history({
      symbols: 'tesouro-selic-01032031,tesouro-ipca-15052035',
      endDate: '2026-05-15',
      sortBy: 'baseDate',
      sortOrder: 'desc',
      startDate: '2025-01-01',
    });
  });
});
