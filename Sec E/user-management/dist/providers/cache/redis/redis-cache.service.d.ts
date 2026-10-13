import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import type { RedisClientType } from "redis";
export declare class RedisCacheService implements OnModuleInit, OnModuleDestroy {
    private readonly redisClient;
    private readonly logger;
    constructor();
    onModuleDestroy(): Promise<void>;
    onModuleInit(): Promise<void>;
    getClient(): RedisClientType;
    getIfCached<T>(key: string, ttl: number, callback: () => Promise<T>): Promise<T>;
    getCachedOr<T>(key: string, defaultValue: T, updateOptions?: {
        callback: () => Promise<T>;
        ttl: number;
    }): Promise<T>;
    cachedFetch({ ttl, url }: {
        ttl: number;
        url: string;
    }): Promise<any>;
}
