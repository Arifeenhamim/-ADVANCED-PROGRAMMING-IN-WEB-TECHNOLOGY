import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Test } from "./entities/test.entity";
import { CreateTestDto, UpdateTestDto } from "./dto/test.dto";

@Injectable()
export class TestService {
constructor
(@InjectRepository(Test)
private readonly testRepository: Repository<Test>,
){}

async getTests(){

    try{
        const tests = await this.testRepository.find();
        return tests    ;
    }
    catch (error){
        throw error;
    }
}

async createTest(dto: CreateTestDto){
    try{
        if(!dto.password.includes("@")){
            throw new BadRequestException("The password must contain @");
        }
        const responce = await this.testRepository.create(dto);
        return await this.testRepository.save(responce);
    }
    catch(error){
        throw error;
    }
}

async updateTest (id: string, dto: UpdateTestDto){
    try{
        console.log("id",id);
        if(!id)
        {
            throw new NotFoundException("Test not found");
        }
        const test= await this.testRepository.findOne(
            {
                where: {
                    id:id,
                },
            }        );
            if(!test){
                throw new NotFoundException("Test not found");
            }
            Object.assign(test,dto);
            const{id: uid, ...rest } =test  ;
            return await this.testRepository.update({id:id}, rest);
    } catch (error){
        throw error;
    }
}

async deleteTest(id: string){
    try{
        const test = await this.testRepository.findOne({
            where: {
                id:id,
    },
        });
        if (!test) {
            throw new NotFoundException("Test not found");
        }
        return await this.testRepository.delete({ id:id });
    } catch (error) {
        throw error;
    }
}
}
