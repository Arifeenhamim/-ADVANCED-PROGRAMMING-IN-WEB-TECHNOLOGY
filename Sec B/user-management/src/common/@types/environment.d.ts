declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      AUTH_SERVER_ISSUER?: string;
      AUTH_SERVER_JWKS_URI?: string;
      AUTH_SERVER_AUDIENCE?: string;
    }
  }
}
