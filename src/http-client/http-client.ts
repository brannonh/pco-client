import got, { Got, GotRequestFunction } from 'got';
import { auth, logging, pcoApi } from './got.js';
import { HttpClientConfig } from './types.js';

export class HttpClient {
  private client: Got;
  delete: GotRequestFunction;
  get: GotRequestFunction;
  head: GotRequestFunction;
  patch: GotRequestFunction;
  post: GotRequestFunction;
  put: GotRequestFunction;

  constructor(config: HttpClientConfig) {
    this.client = got.extend(
      logging(config.log?.request, config.log?.response),
      pcoApi(),
      auth(config.auth?.token ?? '', config.auth?.secret ?? '')
    );

    this.delete = this.client.delete;
    this.get = this.client.get;
    this.head = this.client.head;
    this.patch = this.client.patch;
    this.post = this.client.post;
    this.put = this.client.put;
  }
}
