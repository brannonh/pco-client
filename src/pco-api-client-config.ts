import { ApplicationConfig } from './application/application.js';

export interface PCOApiClientConfig {
  apiVersion: string;
  applications: PCOApiClientAppConfig;
  auth: PCOApiClientAuthPAT; // TODO: Add support for OAuth2.
}

export interface PCOApiClientAuthPAT {
  secret: string;
  token: string;
}

// TODO: Make configs optional.
export interface PCOApiClientAppConfig {
  calendar: ApplicationConfig;
  checkIns: ApplicationConfig;
  giving: ApplicationConfig;
  groups: ApplicationConfig;
  people: ApplicationConfig;
  services: ApplicationConfig;
}

export const PCOApiClientConfigDefaults: PCOApiClientConfig = {
  apiVersion: 'v2',
  applications: {
    calendar: {
      version: '2021-07-20',
    },
    checkIns: {
      version: '2023-04-05',
    },
    giving: {
      version: '2019-10-18',
    },
    groups: {
      version: '2018-08-01',
    },
    people: {
      version: '2023-02-15',
    },
    services: {
      version: '2018-11-01',
    },
  },
  auth: {
    token: '',
    secret: '',
  },
};
