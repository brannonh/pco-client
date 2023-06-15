import { HttpClient } from '../http-client/index.js';
import { Application, ApplicationConfig } from './application.js';

export class CheckIns extends Application {
  constructor(
    client: HttpClient,
    apiVersion: string,
    options: ApplicationConfig
  ) {
    super(client, apiVersion, 'check-ins', options);
  }
}
