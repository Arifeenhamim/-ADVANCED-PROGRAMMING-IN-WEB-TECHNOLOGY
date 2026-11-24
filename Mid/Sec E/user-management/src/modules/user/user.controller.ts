import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Patch(":id")
  async updateUser(@Param("id") id: string, @Body() dto: CreateUserDto) {
    return await this.userService.updateUser(id, dto);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return await this.userService.deleteUser(id);
  }
}

