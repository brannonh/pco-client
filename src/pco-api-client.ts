import { defaultsDeep } from 'lodash-es';
import { PartialDeep } from 'type-fest';
import { HttpClient } from './http-client/index.js';
import { Calendar } from './application/calendar.js';
import { CheckIns } from './application/check-ins.js';
import { Giving } from './application/giving.js';
import { Groups } from './application/groups.js';
import { People } from './application/people.js';
import { Services } from './application/services.js';
import {
  PCOApiClientConfig,
  PCOApiClientConfigDefaults,
} from './pco-api-client-config.js';

export class PCOApiClient {
  private client: HttpClient;
  calendar: Calendar;
  checkIns: CheckIns;
  giving: Giving;
  groups: Groups;
  people: People;
  services: Services;

  constructor(options?: PartialDeep<PCOApiClientConfig>) {
    const config: PCOApiClientConfig = defaultsDeep(
      options,
      PCOApiClientConfigDefaults
    ) as PCOApiClientConfig;

    this.client = new HttpClient({
      auth: { token: config.auth.token, secret: config.auth.secret },
    });

    this.calendar = new Calendar(
      this.client,
      config.apiVersion,
      config.applications.calendar
    );

    this.checkIns = new CheckIns(
      this.client,
      config.apiVersion,
      config.applications.checkIns
    );

    this.giving = new Giving(
      this.client,
      config.apiVersion,
      config.applications.giving
    );

    this.groups = new Groups(
      this.client,
      config.apiVersion,
      config.applications.groups
    );

    this.people = new People(
      this.client,
      config.apiVersion,
      config.applications.people
    );

    this.services = new Services(
      this.client,
      config.apiVersion,
      config.applications.services
    );
  }
}
