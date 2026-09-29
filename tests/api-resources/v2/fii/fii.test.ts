// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource fii', () => {
  test('list', async () => {
    const responsePromise = client.v2.fii.list();
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
      client.v2.fii.list(
        {
          cnpjs: '11728688000147',
          limit: 20,
          mandate: 'mandate',
          page: 1,
          search: 'hglg',
          segmentoAtuacao: 'segmentoAtuacao',
          segmentType: 'papel',
          sortBy: 'referenceDate',
          sortOrder: 'desc',
          symbols: 'HGLG11,MXRF11',
          tipoGestao: 'tipoGestao',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('annualReports', async () => {
    const responsePromise = client.v2.fii.annualReports();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('annualReports: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.fii.annualReports(
        {
          cnpjs: '11728688000147',
          endDate: '2025-12-31',
          include: 'summary,governance',
          limit: 1,
          page: 1,
          sortBy: 'referenceDate',
          sortOrder: 'asc',
          startDate: '2025-01-01',
          symbols: 'HGLG11,MXRF11',
          year: 2025,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('dividends: only required params', async () => {
    const responsePromise = client.v2.fii.dividends({ symbols: 'HGLG11,MXRF11' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('dividends: required and optional params', async () => {
    const response = await client.v2.fii.dividends({
      symbols: 'HGLG11,MXRF11',
      endDate: '2025-12-31',
      sortBy: 'referenceDate',
      sortOrder: 'desc',
      startDate: '2024-01-01',
    });
  });

  test('financials', async () => {
    const responsePromise = client.v2.fii.financials();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('financials: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.fii.financials(
        {
          cnpjs: '11728688000147',
          endDate: '2025-12-31',
          limit: 1,
          page: 1,
          sortBy: 'referenceDate',
          sortOrder: 'asc',
          startDate: '2025-01-01',
          symbols: 'HGLG11,MXRF11',
          year: 2025,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('historical: only required params', async () => {
    const responsePromise = client.v2.fii.historical({ symbols: 'HGLG11,MXRF11' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('historical: required and optional params', async () => {
    const response = await client.v2.fii.historical({
      symbols: 'HGLG11,MXRF11',
      endDate: '2025-12-31',
      sortOrder: 'desc',
      startDate: '2024-01-01',
    });
  });

  test('reports: only required params', async () => {
    const responsePromise = client.v2.fii.reports({ symbols: 'HGLG11,MXRF11' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reports: required and optional params', async () => {
    const response = await client.v2.fii.reports({
      symbols: 'HGLG11,MXRF11',
      allVersions: 'false',
      endDate: '2025-12-31',
      limit: 20,
      page: 1,
      sortBy: 'referenceDate',
      sortOrder: 'desc',
      startDate: '2024-01-01',
    });
  });
});
