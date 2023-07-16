export interface PCOApiClientConfig {
  auth: PCOApiClientAuthPAT;
  log?: {
    request?: boolean;
    response?: boolean;
  };
  retry?: {
    base?: number;
    limit?: number;
  };
}

export interface PCOApiClientAuthPAT {
  secret: string;
  token: string;
}
