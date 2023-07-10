import got from 'got';
import { HttpClientConfig } from './types.js';

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
            console.log(`[Response] ${method ?? '?'} ${url}`);
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
  });
