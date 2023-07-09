import { PCOApiClient } from './pco-api-client/pco-api-client.js';
import { token, secret } from '../.env.js';

const client = new PCOApiClient({
  auth: {
    token,
    secret,
  },
});

console.log(client.getAppPaths('people'));
client.people('readEmails', undefined, { searchParams: { 'where[address]': 'brannon.hall@gmail.com' } }).then((value) => {
  console.dir(value);
}, undefined);
