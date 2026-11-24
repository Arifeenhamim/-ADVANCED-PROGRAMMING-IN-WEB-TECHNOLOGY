import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport/dist/passport.module";
import { UserModule } from "../user/user.module";
import{ JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { Authservice } from "./auth.service";
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
providers: [JwtStrategy,Authservice],
controllers: [AuthController],
exports: [PassportModule,JwtModule],
})
export class AuthModule {}
