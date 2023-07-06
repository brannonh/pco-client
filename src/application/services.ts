import { PathFactoryFunction } from '../pco-api-client/types.js';
import { ApplicationConfig } from './application.js';

const paths = new Map<string, PathFactoryFunction>([]);

export const ServicesConfigDefault: ApplicationConfig = {
  apiVersion: 'v2',
  appVersion: '2018-11-01',
  name: 'services',
  paths,
};
