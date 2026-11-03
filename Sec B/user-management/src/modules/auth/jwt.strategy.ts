import { appConfig } from "@/src/config";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig.env.JWT_BEARER_SECRET,
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email,
        };
    }
}