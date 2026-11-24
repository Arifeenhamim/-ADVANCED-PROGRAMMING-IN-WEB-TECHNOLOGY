
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // onno module theke if i want to use the this let i have to use this , like inter connect 
})
export class UserModule {}
