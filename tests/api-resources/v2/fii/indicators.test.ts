// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource indicators', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.v2.fii.indicators.retrieve({ symbols: 'HGLG11,MXRF11' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.v2.fii.indicators.retrieve({ symbols: 'HGLG11,MXRF11' });
  });

  test('history: only required params', async () => {
    const responsePromise = client.v2.fii.indicators.history({ symbols: 'HGLG11,MXRF11' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('history: required and optional params', async () => {
    const response = await client.v2.fii.indicators.history({
      symbols: 'HGLG11,MXRF11',
      endDate: '2025-12-31',
      sortBy: 'referenceDate',
      sortOrder: 'desc',
      startDate: '2024-01-01',
    });
  });
});
