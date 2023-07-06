export interface AuthPAT {
  token: string;
  secret: string;
}

export interface HttpClientConfig {
  auth?: AuthPAT;
}
