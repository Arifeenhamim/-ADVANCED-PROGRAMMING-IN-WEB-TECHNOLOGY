import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthDto } from "./DTO/auth.dto";
import { User } from "../user/entities/user.entity";
import { appConfig } from "@/src/config/app.config";
import { email } from "zod";

@Injectable()
export class AuthService {
    constructor( 
        private userService: UserService;
        private jwt: JwtService;
    ){}

    async signIn(dto:AuthDto){
        const user = await this.checkUserByEmail(dto.email);
        if(!user){  
            throw new NotFoundException("User or Password not found") ;  
    }
    await this.validateUser(user,dto.password);
    const {access_token,refresh_token,expires_in} 
    = await this.signTokens(user);
    return {access_token,refresh_token,expires_in};

}
  
async signTokens(user:User):Promise<{
    access_token:string;
    refresh_token:string;
    expires_in:number;
    permissions?:any;}>{
        const expires_in=Date.now()+1000*60*60*24*7; // 30 din 
        const accessPayload={
            user_id:user.id,
            name:user?.name,
            email:user?.email,}
const refreshPayload={
    user_id:user.id,};

  const bearerSecret=appConfig.env.JWT_BEARER_SECRET;
  const refreshSecret=appConfig.env.JWT_REFRESH_SECRET;

  const accesSToken=await this.jwt.signAsync(accessPayload,{
    secret:bearerSecret,
    expiresIn:'15d',
    });

const refresh_token=await this.jwt.signAsync(refreshPayload,{
    secret:refreshSecret,
    expiresIn:'7d',
    });

    return {access_token:accesSToken,
        refresh_token:refresh_token,
        expires_in:expires_in,
    };}


async checkUserByEmail(email:string){

    try{
        const user=await this.userService.findOneByEmail(email);
        return user;
    }
    catch(e:any){
        throw new NotFoundException("User not found");
    }
}

async validateUser(user:AuthDto,password:string){
    const PasswordMatch=user.password===password;
    if(!PasswordMatch){
        throw new NotFoundException("User or Password not found");
        return true;
    }
}
}
