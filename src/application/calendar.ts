import { PathFactoryFunction } from '../pco-api-client/types.js';
import { ApplicationConfig } from './application.js';

const paths = new Map<string, PathFactoryFunction>([]);

export const CalendarConfigDefault: ApplicationConfig = {
  apiVersion: 'v2',
  appVersion: '2022-07-07',
  name: 'calendar',
  paths,
};
