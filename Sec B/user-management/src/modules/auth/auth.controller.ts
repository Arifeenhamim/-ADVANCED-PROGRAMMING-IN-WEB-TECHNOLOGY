
import { ValidationPipe } from "@/common/pipes/validation.pipe";
import { AuthService } from "@/modules/auth/auth.service";

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";


@Controller("auth")

export class AuthController {

  constructor(private authService: AuthService) {}
 
  @HttpCode(HttpStatus.OK)

  @Post("login")

  login(@Body(new ValidationPipe()) dto: AuthDto) {

    return this.authService.signIn(dto);

  }
 
 

}
 