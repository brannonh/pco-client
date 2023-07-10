export interface PCOApiClientConfig {
  auth: PCOApiClientAuthPAT;
  log?: {
    request?: boolean;
    response?: boolean;
  };
}

export interface PCOApiClientAuthPAT {
  secret: string;
  token: string;
}
