
import { User } from "@/modules/user/entities/user.entity";
import { UserService } from "@/modules/user/user.service";
import { InjectQueue } from "@nestjs/bull";
import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { Queue } from "bull";
import { randomBytes } from "crypto";
import { AuthDto } from "./dto/auth.dto";
import { appConfig } from "@/src/config/app.config";
 
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}
 
  async signIn(dto: AuthDto) {
    const user = await this.checkUserByEmail(dto.email);
    if(!user){
        throw new NotFoundException("User or password not found");
    }
    await this.validateUser(user, dto.password);
    const { access_token, refresh_token, expires_in } =
      await this.signTokens(user);
    return {
      access_token,
      refresh_token,
      expires_in,
      // profile: await this.profileService.findOneByUserId(user.id),
    };
  }


 
  // /**
  //  * sign tokens for user
  //  * @date 2022-07-27
  //  * @param {any} user:User
  //  * @returns {Promise<object>}
  //  */
  async signTokens(user: User): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    permissions?: any;
  }> {
    const expires_in = Date.now() + 365 * 24 * 60 * 60;
 
    const accessPayload = {
      user_id: user.id,
      name: user?.name,
      email: user.email,
    };
    const refreshPayload = {
      user_id: user.id,
    };
    const bearerSecret = appConfig.env.JWT_BEARER_SECRET;
    const refreshSecret = appConfig.env.JWT_REFRESH_SECRET;
 
    //generate a bearer token
    const accessToken = await this.jwt.signAsync(accessPayload, {
      expiresIn: "30d",
      secret: bearerSecret,
    });
 
    //generate a refresh token
    const refreshToken = await this.jwt.signAsync(refreshPayload, {
      expiresIn: "60d",
      secret: refreshSecret,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in,

    };
  }
 
  // /**
  //  * get user by email if exists
  //  * @date 2022-07-19
  //  * @param {string} email:string
  //  * @returns {User}
  //  */
  async checkUserByEmail(email: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      // if user does not exist throw exception
      return user;
    } catch (e: any) {
      throw new NotFoundException("User not found");
    }
    // find the user by email
  }
 
  // /**
  //  * get user by email if exists
  //  * @date 2022-07-19
  //  * @param {string} email:string
  //  * @returns {User}
  //  */

 
  // /**
  //  * validate user against password
  //  * @date 2022-07-19
  //  * @param {any} user:UserDto
  //  * @param {any} password:string
  //  * @returns {boolean}
  //  */
  async validateUser(user: AuthDto, password: string) {
    // compare password
    // const passwordMatches = await argon.verify(user.password, password);
    // if password incorrect throw exception
    const passwordMatches = user.password === password;
    if (!passwordMatches)
      throw new UnauthorizedException("Incorrect Credentials");
    return true;
  }
 

}