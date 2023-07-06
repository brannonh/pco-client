import { PathFactoryFunction } from '../pco-api-client/types.js';
import { ApplicationConfig } from './application.js';

const paths = new Map<string, PathFactoryFunction>([]);

export const PeopleConfigDefault: ApplicationConfig = {
  apiVersion: 'v2',
  appVersion: '2023-03-21',
  name: 'people',
  paths,
};
