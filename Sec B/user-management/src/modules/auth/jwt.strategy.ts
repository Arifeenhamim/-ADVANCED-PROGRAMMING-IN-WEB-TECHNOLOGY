import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { appConfig } from "@/src/config";
import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig.env.JWT_BEARER_SECRET,
        })
    }

    async validate(payload:any){
        return payload;
    }
}