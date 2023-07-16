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
      auth(config.auth?.token ?? '', config.auth?.secret ?? ''),
      {
        retry: {
          calculateDelay: ({ attemptCount, retryOptions, error }) => {
            if (
              retryOptions.methods.includes(error.options.method) &&
              retryOptions.statusCodes.includes(
                error.response?.statusCode ?? 0
              ) &&
              attemptCount <= retryOptions.limit
            ) {
              const base = config.retry?.base ?? 2;
              return base ** attemptCount * 1000 + retryOptions.noise;
            }

            return 0;
          },
          limit: config.retry?.limit ?? 3,
          methods: [
            'delete',
            'get',
            'head',
            'options',
            'patch',
            'post',
            'put',
            'trace',
          ],
          statusCodes: [408, 413, 429, 500, 502, 503, 504, 521, 522, 524],
        },
      }
    );

    this.delete = this.client.delete;
    this.get = this.client.get;
    this.head = this.client.head;
    this.patch = this.client.patch;
    this.post = this.client.post;
    this.put = this.client.put;
  }
}
