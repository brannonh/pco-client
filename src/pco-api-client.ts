import { ApplicationConfig, ApplicationResponse } from './application/application.js';
import { Giving } from './application/giving.js';
import { defaultsDeep } from 'lodash-es';
import { HttpClient } from './http-client/index.js';
import { Calendar } from './application/calendar.js';
import { CheckIns } from './application/check-ins.js';
import { Groups } from './application/groups.js';
import { People } from './application/people.js';
import { Services } from './application/services.js';

export interface PCOApiClientConfig {
  apiVersion?: string;
  applications?: PCOApiClientAppConfig;
  auth: PCOApiClientAuthPAT | PCOApiClientAuthOAuth2;
}

export interface PCOApiClientAuthPAT {
  secret: string;
  token: string;
}

export type PCOApiClientAuthOAuth2 = {
  // TODO: Change to interface and define.
}

export interface PCOApiClientAppConfig {
  calendar?: ApplicationConfig;
  checkIns?: ApplicationConfig;
  giving?: ApplicationConfig;
  groups?: ApplicationConfig;
  people?: ApplicationConfig;
  services?: ApplicationConfig;
}

export const PCOApiClientConfigDefaults: Required<Omit<PCOApiClientConfig, 'auth'>> = {
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
    this.client = new HttpClient({ auth: { token, secret } })

    defaultsDeep(options, PCOApiClientConfigDefaults);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.calendar = new Calendar(this.client, options.apiVersion!, options.applications!.calendar!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.checkIns = new CheckIns(this.client, options.apiVersion!, options.applications!.checkIns!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.giving = new Giving(this.client, options.apiVersion!, options.applications!.giving!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.groups = new Groups(this.client, options.apiVersion!, options.applications!.groups!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.people = new People(this.client, options.apiVersion!, options.applications!.people!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.services = new Services(this.client, options.apiVersion!, options.applications!.services!);
  }
}
