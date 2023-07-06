import { PathFactoryFunction } from '../pco-api-client/types.js';
import { ApplicationConfig } from './application.js';

const paths = new Map<string, PathFactoryFunction>([]);

export const GroupsConfigDefault: ApplicationConfig = {
  apiVersion: 'v2',
  appVersion: '2018-08-01',
  name: 'groups',
  paths,
};
