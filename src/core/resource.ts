// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Brapi } from '../client';

export abstract class APIResource {
  protected _client: Brapi;

  constructor(client: Brapi) {
    this._client = client;
  }
}
