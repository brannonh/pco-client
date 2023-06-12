import { HttpClient } from '../http-client/index.js';
import { Application, ApplicationConfig } from './application.js';

export class Giving extends Application {
  constructor(
    client: HttpClient,
    apiVersion: string,
    options: ApplicationConfig
  ) {
    super(client, apiVersion, options);
  }
}
