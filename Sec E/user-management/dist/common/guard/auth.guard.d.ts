import { RedisCacheService } from "../../providers/cache/redis/redis-cache.service";
import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class AuthGuard implements CanActivate {
    private readonly redisCacheService;
    constructor(redisCacheService: RedisCacheService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
