import { ApplicationConfig } from './application/application.js';
import { Giving } from './application/giving.js';
import { defaultsDeep } from 'lodash-es';
import { HttpClient } from './http-client/index.js';
import { Calendar } from './application/calendar.js';
import { CheckIns } from './application/check-ins.js';
import { Groups } from './application/groups.js';
import { People } from './application/people.js';
import { Services } from './application/services.js';

export interface PCOApiClientConfig {
  apiVersion: string;
  applications: PCOApiClientAppConfig;
  auth: PCOApiClientAuthPAT; // TODO: Add support for OAuth2.
}

export interface PCOApiClientAuthPAT {
  secret: string;
  token: string;
}

export interface PCOApiClientAppConfig {
  calendar: ApplicationConfig;
  checkIns: ApplicationConfig;
  giving: ApplicationConfig;
  groups: ApplicationConfig;
  people: ApplicationConfig;
  services: ApplicationConfig;
}

export const PCOApiClientConfigDefaults: Omit<PCOApiClientConfig, 'auth'> = {
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
};

export class PCOApiClient {
  private client: HttpClient;
  calendar: Calendar;
  checkIns: CheckIns;
  giving: Giving;
  groups: Groups;
  people: People;
  services: Services;

  constructor(options: PCOApiClientConfig) {
    const token = 'token' in options.auth ? options.auth.token : '';
    const secret = 'secret' in options.auth ? options.auth.secret : '';
    this.client = new HttpClient({ auth: { token, secret } });

    defaultsDeep(options, PCOApiClientConfigDefaults);

    this.calendar = new Calendar(
      this.client,
      options.apiVersion,
      options.applications.calendar
    );

    this.checkIns = new CheckIns(
      this.client,
      options.apiVersion,
      options.applications.checkIns
    );

    this.giving = new Giving(
      this.client,
      options.apiVersion,
      options.applications.giving
    );

    this.groups = new Groups(
      this.client,
      options.apiVersion,
      options.applications.groups
    );

    this.people = new People(
      this.client,
      options.apiVersion,
      options.applications.people
    );

    this.services = new Services(
      this.client,
      options.apiVersion,
      options.applications.services
    );
  }

  setDefaults(options: PCOApiClientConfig) {
    defaultsDeep(options, PCOApiClientConfigDefaults);
  }
}
