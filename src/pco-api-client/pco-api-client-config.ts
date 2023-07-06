export interface PCOApiClientConfig {
  auth: PCOApiClientAuthPAT;
}

export interface PCOApiClientAuthPAT {
  secret: string;
  token: string;
}
