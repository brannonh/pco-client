import { PCOApiClient } from './pco-api-client.js';
import { token, secret } from '../.env.js';

const client = new PCOApiClient({
  auth: {
    token,
    secret,
  },
});

client.calendar.get().then((response: unknown) => {
  console.dir(response);
}, undefined);
client.checkIns.get().then((response: unknown) => {
  console.dir(response);
}, undefined);
client.giving.get().then((response: unknown) => {
  console.dir(response);
}, undefined);
client.groups.get().then((response: unknown) => {
  console.dir(response);
}, undefined);
client.people.get().then((response: unknown) => {
  console.dir(response);
}, undefined);
client.services.get().then((response: unknown) => {
  console.dir(response);
}, undefined);
