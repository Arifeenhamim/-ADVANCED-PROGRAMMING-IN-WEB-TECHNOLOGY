import { appConfig } from "@/src/config";
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import type { RedisClientType } from "redis";
import { createClient } from "redis";

@Injectable()
export class RedisCacheService implements OnModuleInit, OnModuleDestroy {
  private readonly redisClient: RedisClientType;
  private readonly logger = new Logger(RedisCacheService.name);

  constructor() {
    this.redisClient = createClient({
      url: appConfig.env.REDIS_URL,
    });
  }
  async onModuleDestroy() {
    await this.redisClient.disconnect();
  }

  async onModuleInit() {
    this.redisClient.on("error", (err: any) =>
      this.logger.error(`Redis Error : ${err}`),
    );
    this.redisClient.on("ready", () =>
      this.logger.log("Redis client connected"),
    );
    this.redisClient.on("end", () =>
      this.logger.log("Redis client disconnected"),
    );
    await this.redisClient.connect();
  }

  getClient() {
    return this.redisClient;
  }

  async getIfCached<T>(key: string, ttl: number, callback: () => Promise<T>) {
    const updateCacheAndGetData = async () => {
      const data = await callback();
      this.redisClient.set(
        key,
        JSON.stringify(data),
        ttl === -1 ? undefined : { EX: ttl },
      );
      return data;
    };
    const cachedData = await this.redisClient.get(key);
    if (!!cachedData && typeof cachedData === "string")
      return JSON.parse(cachedData) as T;
    return await updateCacheAndGetData();
  }

  async getCachedOr<T>(
    key: string,
    defaultValue: T,
    updateOptions?: { callback: () => Promise<T>; ttl: number },
  ) {
    const cachedData = await this.redisClient.get(key);
    if (updateOptions)
      (async () => {
        const { callback, ttl } = updateOptions;
        const data = await callback();
        this.redisClient.set(
          key,
          JSON.stringify(data),
          ttl === -1 ? undefined : { EX: ttl },
        );
        return data;
      })();
    if (!!cachedData && typeof cachedData === "string") {
      return JSON.parse(cachedData) as T;
    }
    return defaultValue;
  }

  async cachedFetch({ ttl, url }: { ttl: number; url: string }) {
    return await this.getIfCached(url, ttl, async () => {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw response.text();
    });
  }
}
