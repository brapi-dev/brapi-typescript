// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource debentures', () => {
  test('list', async () => {
    const responsePromise = client.v2.debentures.list();
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
      client.v2.debentures.list(
        {
          cnpjs: '02421421000111',
          incentivized: 'true',
          index: 'ipca',
          limit: 50,
          maturityFrom: '2027-01-01',
          maturityTo: '2030-12-31',
          page: 1,
          search: 'tim',
          sortBy: 'symbol',
          sortOrder: 'asc',
          status: 'active',
          symbols: 'TIMS12',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Brapi.NotFoundError);
  });

  test('profile: only required params', async () => {
    const responsePromise = client.v2.debentures.profile({ symbols: 'TIMS12' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('profile: required and optional params', async () => {
    const response = await client.v2.debentures.profile({ symbols: 'TIMS12' });
  });
});
