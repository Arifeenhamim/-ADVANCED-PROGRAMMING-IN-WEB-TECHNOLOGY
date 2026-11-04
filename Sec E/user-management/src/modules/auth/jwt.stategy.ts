import { appConfig } from "@/src/config";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
    validate(...args: any[]): unknown {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig.env.JWT_BEARER_SECRET,
        });
    }
}