import { PCOApiClient } from './pco-api-client/pco-api-client.js';
import { token, secret } from '../.env.js';

const client = new PCOApiClient({
  auth: {
    token,
    secret,
  },
});

console.log(client.getAppPaths('giving'));
// const json = { data: { type: 'Batch', attributes: { description: 'PCO API Client Test' } } };
// client.callAppPath('giving', 'createBatch', { id: '123' }, { json }).then((value) => {
//   console.dir(value);
// }, undefined);
client.giving('readDonations').then((value) => {
  console.dir(value);
}, undefined);
