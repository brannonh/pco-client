import { kebabCase, merge } from 'lodash-es';
import { HttpClient } from '../http-client/index.js';
import {
  ApplicationName,
  AppConfigurations,
  ApplicationConfig,
} from '../application/application.js';
import {
  GotRequestFunction,
  HTTPAlias,
  OptionsOfJSONResponseBody,
  Response,
} from 'got';
import { PCOApiClientConfig } from './pco-api-client-config.js';
import { GivingConfigDefault } from '../application/giving.js';
import { CalendarConfigDefault } from '../application/calendar.js';
import { CheckInsConfigDefault } from '../application/check-ins.js';
import { GroupsConfigDefault } from '../application/groups.js';
import { PeopleConfigDefault } from '../application/people.js';
import { ServicesConfigDefault } from '../application/services.js';
import { PathFactoryFunction } from './types.js';

type GotFunctions = Record<HTTPAlias, GotRequestFunction>;

export class PCOApiClient {
  private appConfig: AppConfigurations;
  private client: HttpClient;
  private functions: GotFunctions;

  constructor(options: PCOApiClientConfig) {
    this.appConfig = {
      calendar: CalendarConfigDefault,
      checkIns: CheckInsConfigDefault,
      giving: GivingConfigDefault,
      groups: GroupsConfigDefault,
      people: PeopleConfigDefault,
      services: ServicesConfigDefault,
    };

    this.client = new HttpClient({
      auth: {
        token: options.auth.token,
        secret: options.auth.secret,
      },
      log: {
        request: options.log?.request,
        response: options.log?.response,
      },
    });

    this.functions = {
      delete: this.client.delete.bind(this.client),
      get: this.client.get.bind(this.client),
      head: this.client.head.bind(this.client),
      patch: this.client.patch.bind(this.client),
      post: this.client.post.bind(this.client),
      put: this.client.put.bind(this.client),
    };
  }

  getAppPaths(app: ApplicationName): Map<string, PathFactoryFunction> {
    return this.appConfig[app].paths;
  }

  private async callAppPath(
    app: ApplicationName,
    pathName: string,
    pathArgs: Record<string, string>,
    options?: OptionsOfJSONResponseBody
  ): Promise<Response | undefined> {
    const config = this.appConfig[app];
    const factory: PathFactoryFunction | undefined = config.paths.get(pathName);

    options = normalizeOptions(options, config);

    if (factory) {
      const { method, path } = factory(pathArgs);
      const url = `${kebabCase(config.name)}/${config.apiVersion}/${path}`;

      return this.functions[method](url, options).json();
    }
  }

  async calendar(
    pathName: string,
    pathArgs: Record<string, string> = {},
    options?: OptionsOfJSONResponseBody
  ): Promise<Response | undefined> {
    return this.callAppPath('calendar', pathName, pathArgs, options);
  }

  async checkIns(
    pathName: string,
    pathArgs: Record<string, string> = {},
    options?: OptionsOfJSONResponseBody
  ): Promise<Response | undefined> {
    return this.callAppPath('checkIns', pathName, pathArgs, options);
  }

  async giving(
    pathName: string,
    pathArgs: Record<string, string> = {},
    options?: OptionsOfJSONResponseBody
  ): Promise<Response | undefined> {
    return this.callAppPath('giving', pathName, pathArgs, options);
  }

  async groups(
    pathName: string,
    pathArgs: Record<string, string> = {},
    options?: OptionsOfJSONResponseBody
  ): Promise<Response | undefined> {
    return this.callAppPath('groups', pathName, pathArgs, options);
  }

  async people(
    pathName: string,
    pathArgs: Record<string, string> = {},
    options?: OptionsOfJSONResponseBody
  ): Promise<Response | undefined> {
    return this.callAppPath('people', pathName, pathArgs, options);
  }

  async services(
    pathName: string,
    pathArgs: Record<string, string> = {},
    options?: OptionsOfJSONResponseBody
  ): Promise<Response | undefined> {
    return this.callAppPath('services', pathName, pathArgs, options);
  }
}

function normalizeOptions(
  options?: OptionsOfJSONResponseBody,
  appConfig?: ApplicationConfig
): OptionsOfJSONResponseBody {
  const normalized: OptionsOfJSONResponseBody = options ?? {};
  if (appConfig) {
    if (!normalized.headers) {
      normalized.headers = {};
    }
    merge(normalized.headers, { 'x-pco-api-version': appConfig.appVersion });
  }
  return normalized;
}
