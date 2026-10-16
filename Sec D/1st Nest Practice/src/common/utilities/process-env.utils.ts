export class ProcessEnv {
  public static get<T extends string | number>(
    key: keyof NodeJS.ProcessEnv,
  ): T {
    return process.env[key] as T;
  }

  public static isProduction(): boolean {
    return this.get<string>("NODE_ENV") === "production";
  }
}
