import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from "@nestjs/common";
import { TestService } from "./test.service";
import { CreateTestDto, UpdateTestDto } from "./dto/test.dto";

@Controller("tests")
export class TestController {

    constructor(private readonly testService: TestService) {}

    @Get()
    async getTests() {
        return await this.testService.getTests();
    }

    @Post()
    //  async createTest(@Body(ValidationPipe) dto: any)
        async createTest(@Body(ValidationPipe) dto: CreateTestDto) {
            return await this.testService.createTest(dto);
    }
    
    @Patch(":id")
        async updateTest(@Param("id") id: string , @Body() dto: UpdateTestDto) {    
    }

    @Delete(":id")
        async deleteTest(@Param("id") id: string) {
            return await this.testService.deleteTest(id);
    }

}
