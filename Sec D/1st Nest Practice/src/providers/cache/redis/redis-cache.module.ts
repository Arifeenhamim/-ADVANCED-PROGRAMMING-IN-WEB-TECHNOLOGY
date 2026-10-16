import { RedisCacheService } from "@/providers/cache/redis/redis-cache.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
