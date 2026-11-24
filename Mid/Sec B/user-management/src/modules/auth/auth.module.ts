import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }), 
    JwtModule.register({
        secret:"mySecretKey",
        signOptions: { expiresIn: "1h" },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}