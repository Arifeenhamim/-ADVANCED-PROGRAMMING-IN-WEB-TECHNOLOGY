import { IRequest } from "@/common/interfaces/request.interface";

import { RedisCacheService } from "@/src/providers/cache/redis/redis-cache.service";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async canActivate(context: ExecutionContext) {
    const req: IRequest = context.switchToHttp().getRequest();
    const bearerToken = req.headers.authorization;

    const token =
      bearerToken?.split("Bearer ")[1] || bearerToken?.split(" ")[1];

    if (!token)
      throw new UnauthorizedException(
        "You are not authenticated, missing bearer token",
      );

    const redisValue = await this.redisCacheService.getClient().get(token);

    if (redisValue === "blacklisted") {
      throw new UnauthorizedException(
        "Session expired or logged out. Please login again.",
      );
    }

    // const authPayload = await this.authService.verifyAuthToken(token);

    // if (!authPayload)
    //   throw new UnauthorizedException(
    //     "You are not authenticated, invalid or expired token",
    //   );

    // req.user = authPayload;

    // if (!authPayload)
    //   throw new UnauthorizedException(
    //     "You are not authenticated, no logged in users",
    //   );

    return true;
  }
}
