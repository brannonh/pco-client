import { paramCase } from 'change-case';
import { HttpClient } from '../http-client/index.js';
import { trim } from 'lodash-es';

export interface ApplicationConfig {
  version: string;
}

export interface ApplicationResponse {
  data: unknown;
  included: unknown;
  links: Record<string, string>[];
  meta: unknown;
}

export class Application {
  defaultHeaders: Record<string, string>;

  constructor(
    protected readonly client: HttpClient,
    protected readonly apiVersion: string,
    protected readonly appPath: string,
    protected readonly config: ApplicationConfig
  ) {
    this.defaultHeaders = {
      'x-pco-api-version': this.config.version,
    };

    this.appPath = trim(appPath, ' /');
  }

  prefixedPath(suffix?: string): string {
    return `${paramCase(this.appPath)}/${this.apiVersion}${
      suffix ? '/' + trim(suffix, ' /') : ''
    }`;
  }

  async get(path?: string): Promise<ApplicationResponse> {
    const headers = this.defaultHeaders;
    return this.client
      .get<ApplicationResponse>(this.prefixedPath(path), { headers })
      .json();
  }
}
