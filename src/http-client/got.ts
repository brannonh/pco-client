import got, { Headers, Options } from 'got';

export const auth = (token: string, secret: string) =>
  got.extend({
    headers: {
      Authorization: `Basic ${Buffer.from(token + ':' + secret).toString(
        'base64'
      )}`,
    },
  });

export const logging = (logRequest = false, logResponse = false) =>
  got.extend({
    hooks: {
      beforeRequest: [
        (options) => {
          if (logRequest) {
            const method = options.method;
            const url = options.url?.toString() ?? '';
            const headers = JSON.stringify(options.headers);
            const body = JSON.stringify(options.body ?? '');
            console.log(`[Request] ${method} ${url}`);
            console.log(`  headers: ${headers}`);
            console.log(`  body: ${body}`);
          }
        },
      ],
      afterResponse: [
        (response) => {
          if (logResponse) {
            const method = response.method;
            const url = response.url?.toString() ?? '';
            const body = JSON.stringify(response.body);
            const headers = JSON.stringify(response.headers);
            console.log(`[Response] ${method ?? '?'} ${url}`);
            console.log(`  headers: ${headers}`);
            console.log(`  body: ${body}`);
          }

          return response;
        },
      ],
    },
  });

export const pcoApi = () =>
  got.extend({
    prefixUrl: 'https://api.planningcenteronline.com',
    /* eslint-disable */
    handlers: [
      (options: Options, next: (options: Options) => any) => {
        return (async () => {
          try {
            const response = await next(options);
            response.rateLimit = getRateLimit(response.headers as Headers);
            return response;
          } catch (error: any) {
            const { response } = error;
            if (response) {
              error.rateLimit = getRateLimit(response.headers);
            }

            throw error;
          }
        })();
      },
    ],
    /* eslint-enable */
  });

function getRateLimit(headers: Headers) {
  return {
    count: +(headers['x-pco-api-request-rate-count'] as string),
    limit: +(headers['x-pco-api-request-rate-limit'] as string),
    period: +(headers['x-pco-api-request-rate-period'] as string),
    retryAfter: +(headers['retry-after'] as string),
  };
}
