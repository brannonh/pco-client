import { PCOApiClient } from './pco-api-client/pco-api-client.js';
import { token, secret } from '../.env.js';

const client = new PCOApiClient({
  auth: {
    token,
    secret,
  },
  log: {
    request: true,
    response: true,
  },
  retry: {
    base: 1,
    limit: 1,
  },
});

client
  .people('people', undefined, {
    searchParams: { 'where[id]': '116361550' },
  })
  .then((value) => {
    console.dir(value);
  }, undefined);
