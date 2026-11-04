import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport/dist/passport.module";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.stategy";
import { AuthService } from "./auth.service";

@Module({
    imports: [PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
        secret:"mySecretKey",
        signOptions: { expiresIn: "1h" },
    }),
    UserModule,
    ],
    controllers: [AuthController],
    providers: [JwtStrategy,AuthService],
    exports: [PassportModule,JwtModule],
})
export class AuthModule {}