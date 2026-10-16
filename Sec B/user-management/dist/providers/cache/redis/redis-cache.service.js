"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RedisCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheService = void 0;
const config_1 = require("../../../config");
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let RedisCacheService = RedisCacheService_1 = class RedisCacheService {
    constructor() {
        this.logger = new common_1.Logger(RedisCacheService_1.name);
        this.redisClient = (0, redis_1.createClient)({
            url: config_1.appConfig.env.REDIS_URL,
        });
    }
    async onModuleDestroy() {
        await this.redisClient.disconnect();
    }
    async onModuleInit() {
        this.redisClient.on("error", (err) => this.logger.error(`Redis Error : ${err}`));
        this.redisClient.on("ready", () => this.logger.log("Redis client connected"));
        this.redisClient.on("end", () => this.logger.log("Redis client disconnected"));
        await this.redisClient.connect();
    }
    getClient() {
        return this.redisClient;
    }
    async getIfCached(key, ttl, callback) {
        const updateCacheAndGetData = async () => {
            const data = await callback();
            this.redisClient.set(key, JSON.stringify(data), ttl === -1 ? undefined : { EX: ttl });
            return data;
        };
        const cachedData = await this.redisClient.get(key);
        if (!!cachedData && typeof cachedData === "string")
            return JSON.parse(cachedData);
        return await updateCacheAndGetData();
    }
    async getCachedOr(key, defaultValue, updateOptions) {
        const cachedData = await this.redisClient.get(key);
        if (updateOptions)
            (async () => {
                const { callback, ttl } = updateOptions;
                const data = await callback();
                this.redisClient.set(key, JSON.stringify(data), ttl === -1 ? undefined : { EX: ttl });
                return data;
            })();
        if (!!cachedData && typeof cachedData === "string") {
            return JSON.parse(cachedData);
        }
        return defaultValue;
    }
    async cachedFetch({ ttl, url }) {
        return await this.getIfCached(url, ttl, async () => {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
            throw response.text();
        });
    }
};
exports.RedisCacheService = RedisCacheService;
exports.RedisCacheService = RedisCacheService = RedisCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisCacheService);
//# sourceMappingURL=redis-cache.service.js.map