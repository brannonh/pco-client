export interface HttpClientConfig {
  auth?: AuthPAT;
  log?: LogConfig;
}

export interface AuthPAT {
  token: string;
  secret: string;
}

export interface LogConfig {
  request?: boolean;
  response?: boolean;
}
