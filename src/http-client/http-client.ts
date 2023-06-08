import got, { Got, GotRequestFunction } from 'got';
import { auth, logging, pcoApi } from './got.js';

export interface HttpClientConfig {
  auth: {
    token?: string;
    secret?: string;
  }
}

export class HttpClient {
  client: Got;
  delete: GotRequestFunction;
  get: GotRequestFunction;
  head: GotRequestFunction;
  patch: GotRequestFunction;
  post: GotRequestFunction;
  put: GotRequestFunction;

  constructor(config: HttpClientConfig) {
    this.client = got.extend(logging(), pcoApi(), auth(config.auth.token ?? '', config.auth.secret ?? '' ));

    this.delete = this.client.delete;
    this.get = this.client.get;
    this.head = this.client.head;
    this.patch = this.client.patch;
    this.post = this.client.post;
    this.put = this.client.put;
  }
}
