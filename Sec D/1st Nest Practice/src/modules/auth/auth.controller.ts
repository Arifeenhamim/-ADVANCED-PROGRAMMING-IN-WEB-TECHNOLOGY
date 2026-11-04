import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from "@nestjs/common";
import { Authservice } from "@/modules/auth/auth.service";
import { AuthDto } from "./dto/auth.dto";


@Controller("auth")
export class AuthController {
  constructor(private authService: Authservice) {}
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body(new ValidationPipe()) dto: AuthDto) {
    return this.authService.signIn(dto);
}
}