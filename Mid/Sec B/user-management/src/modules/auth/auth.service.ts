import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "@/modules/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import { User } from "../user/entities/user.entity";
import { appConfig } from "@/src/config";



@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}


  async signIn(dto: AuthDto) {
    const user = await this.checkUserByEmail(dto.email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.validateUser(user, dto.password);
    const { access_token, refresh_token, expires_in } = await this.signTokens(user);
    return {
      access_token,
      refresh_token,
      expires_in
    };
  }
    
async signTokens(user: User): Promise<{
  access_token: string,
  refresh_token: string,
  expires_in: number
  permission?: any
}> {
  const expires_in = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days  
  const accessPayload = {
    user_id: user.id,
    name: user?.name,
    email: user.email,
  }
  
  const refreshPayload = {
    user_id: user.id,
  };
  const bearerSecret = appConfig.env.JWT_BEARER_SECRET;
  const refreshSecret = appConfig.env.JWT_REFRESH_SECRET;

  const accessToken = await this.jwt.signAsync(accessPayload, {
    expiresIn: "30d",
    secret: bearerSecret,
  });
  const refreshToken = await this.jwt.signAsync(refreshPayload, {
    expiresIn: "30d",
    secret: refreshSecret,
  });
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expires_in,
  };
}

async checkUserByEmail(email:string){
  try{
    const user=await this.userService.findOneByEmail(email);
    return user;
  }
  catch(e:any){
    throw new NotFoundException("User not found") ;
  }
}

async validateUser(user:User, password:string){
  const passwordMatch= user.password===password;
  if(!passwordMatch){
    throw new NotFoundException("Invalid password");
  }
  return true;
}

}
