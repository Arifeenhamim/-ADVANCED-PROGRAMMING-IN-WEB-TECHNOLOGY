import { getCurrentUser } from "@/common/helpers/auth.helper";
import { IRequest } from "@/common/interfaces/request.interface";
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: IRequest = context.switchToHttp().getRequest();

    // Debug logging
    console.log("[CurrentUser Decorator] Request headers:", {
      authorization: req.headers.authorization ? "Present" : "Missing",
      user: req.user ? "Present" : "Missing",
      userData: req.user,
    });

    const user = getCurrentUser(req);

    console.log("[CurrentUser Decorator] getCurrentUser result:", user);

    if (typeof user === "string") {
      console.log("[CurrentUser Decorator] Error:", user);
      throw new UnauthorizedException(user);
    }

    if (!user) {
      console.log("[CurrentUser Decorator] No user found");
      throw new UnauthorizedException("User not authenticated");
    }

    return user;
  },
);

export const OptionalCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: IRequest = context.switchToHttp().getRequest();
    const user = getCurrentUser(req);
    if (typeof user === "string") return null;
    return user;
  },
);
