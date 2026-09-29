// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource treasury', () => {
  test('list', async () => {
    const responsePromise = client.v2.treasury.list();
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
      client.v2.treasury.list(
        {
          couponType: 'zero',
          indexer: 'selic',
          limit: 20,
          page: 1,
          search: 'tesouro-selic-01032031',
          sortBy: 'maturityDate',
          sortOrder: 'asc',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });
});
