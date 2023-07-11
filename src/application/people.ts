import {
  PathFactoryFunction,
  pathFactoryProvider,
} from '../pco-api-client/types.js';
import { ApplicationConfig } from './application.js';

const paths = new Map<string, PathFactoryFunction>([
  // Root
  ['root', pathFactoryProvider('get', '')],

  // People
  ['people', pathFactoryProvider('get', 'people')],

  // Emails
  ['readEmails', pathFactoryProvider('get', 'emails')],

  // Phone Numbers
  ['readPhoneNumbers', pathFactoryProvider('get', 'phone_numbers')],
]);

export const PeopleConfigDefault: ApplicationConfig = {
  apiVersion: 'v2',
  appVersion: '2023-03-21',
  name: 'people',
  paths,
};
