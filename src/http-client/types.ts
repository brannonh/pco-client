export interface HttpClientConfig {
  auth?: AuthPAT;
  log?: LogConfig;
  retry?: RetryConfig;
}

export interface AuthPAT {
  token: string;
  secret: string;
}

export interface LogConfig {
  request?: boolean;
  response?: boolean;
}

export interface RetryConfig {
  base?: number;
  limit?: number;
}
