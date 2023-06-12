import { HttpClient } from '../http-client/index.js';
import { Application, ApplicationConfig } from './application.js';

export class Services extends Application {
  constructor(
    client: HttpClient,
    apiVersion: string,
    options: ApplicationConfig
  ) {
    super(client, apiVersion, options);
  }
}
