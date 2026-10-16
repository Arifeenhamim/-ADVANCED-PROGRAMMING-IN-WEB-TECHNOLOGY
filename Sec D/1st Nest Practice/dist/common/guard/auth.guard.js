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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const redis_cache_service_1 = require("../../providers/cache/redis/redis-cache.service");
const common_1 = require("@nestjs/common");
let AuthGuard = class AuthGuard {
    constructor(redisCacheService) {
        this.redisCacheService = redisCacheService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const bearerToken = req.headers.authorization;
        const token = bearerToken?.split("Bearer ")[1] || bearerToken?.split(" ")[1];
        if (!token)
            throw new common_1.UnauthorizedException("You are not authenticated, missing bearer token");
        const redisValue = await this.redisCacheService.getClient().get(token);
        if (redisValue === "blacklisted") {
            throw new common_1.UnauthorizedException("Session expired or logged out. Please login again.");
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_cache_service_1.RedisCacheService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map