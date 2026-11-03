import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{UserService} from "./user.service";
import { CreateUserDto } from "./dto/user.dto";
import { JwtGuard } from "@/src/common/guard/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("users")
@ApiBearerAuth()
@UseGuards(JwtGuard) // apply guard to this controller
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
        async updateUser(@Param("id") id: string , @Body() dto: CreateUserDto) {    
    }

    @Delete(":id")
        async deleteUser(@Param("id") id: string) {
            return await this.userService.deleteUser(id);
    }

}