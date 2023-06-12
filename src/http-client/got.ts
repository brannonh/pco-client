import got from 'got';

export const auth = (token: string, secret: string) =>
  got.extend({
    headers: {
      Authorization: `Basic ${Buffer.from(token + ':' + secret).toString(
        'base64'
      )}`,
    },
  });

export const logging = () =>
  got.extend({
    hooks: {
      beforeRequest: [
        (options) => {
          const method = options.method;
          const url = options.url?.toString() ?? '';
          const headers = JSON.stringify(options.headers);
          const body = JSON.stringify(options.body ?? '');
          console.log(`[Request] ${method} ${url}`);
          console.log(`  headers: ${headers}`);
          console.log(`  body: ${body}`);
        },
      ],
    },
  });

export const pcoApi = () =>
  got.extend({
    prefixUrl: 'https://api.planningcenteronline.com',
  });
