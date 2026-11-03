import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: "jwt",
        }),

        JwtModule.register({
            secret: "mySecretKey",
            signOptions: { expiresIn: "1d" },
        }),
        UserModule,
    ],

    providers: [JwtStrategy, AuthService],
    controllers: [AuthController],

    exports: [PassportModule, JwtModule],
})
export class AuthModule {}