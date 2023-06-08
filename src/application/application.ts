import { paramCase } from "change-case";
import { HttpClient } from "../http-client/index.js";

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
  constructorName: string;
  defaultHeaders: Record<string, string>;

  constructor(protected readonly client: HttpClient, protected readonly apiVersion: string, protected readonly config: ApplicationConfig) {
    this.constructorName = this.constructor.name;
    this.defaultHeaders = {
      'x-pco-api-version': this.config.version,
    };
  }

  prefixedPath(suffix?: string): string {
    if (suffix && suffix[0] === '/') {
      suffix = suffix.slice(1);
    }
    return `${paramCase(this.constructorName)}/${this.apiVersion}${suffix ? '/' + suffix : ''}`;
  };

  async get(path?: string): Promise<ApplicationResponse> {
    const headers = this.defaultHeaders;
    return this.client.get<ApplicationResponse>(this.prefixedPath(path), { headers }).json();
  }
}
