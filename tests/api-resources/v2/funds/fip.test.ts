// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource fip', () => {
  test('reports', async () => {
    const responsePromise = client.v2.funds.fip.reports();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reports: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v2.funds.fip.reports(
        {
          cnpjs: '06033235000166',
          endDate: '2026-06-30',
          limit: 20,
          page: 1,
          reportType: 'trimestral',
          sortBy: 'sortBy',
          sortOrder: 'desc',
          startDate: '2026-01-01',
          symbols: 'symbols',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });
});
