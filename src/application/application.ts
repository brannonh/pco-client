import { PathFactoryFunction } from '../pco-api-client/types.js';

export type ApplicationName =
  | 'calendar'
  | 'checkIns'
  | 'giving'
  | 'groups'
  | 'people'
  | 'services';

export interface ApplicationConfig {
  apiVersion: string;
  appVersion: string;
  name: ApplicationName;
  paths: Map<string, PathFactoryFunction>;
}

export interface ApplicationResponse {
  data: unknown;
  included: unknown;
  links: Record<string, string>[];
  meta: unknown;
}

export type AppConfigurations = Record<ApplicationName, ApplicationConfig>;
