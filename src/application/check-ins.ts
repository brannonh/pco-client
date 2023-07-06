import { PathFactoryFunction } from '../pco-api-client/types.js';
import { ApplicationConfig } from './application.js';

const paths = new Map<string, PathFactoryFunction>([]);

export const CheckInsConfigDefault: ApplicationConfig = {
  apiVersion: 'v2',
  appVersion: '2023-04-05',
  name: 'checkIns',
  paths,
};
