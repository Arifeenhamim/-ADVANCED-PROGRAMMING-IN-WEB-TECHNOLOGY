import { isNotEmpty, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class CreateTestDto{
    @IsNotEmpty({message:'Name is a mandatory Field'})
    name!:string;
    @IsNotEmpty()
    email!:string;

     @IsNotEmpty()
     @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'Password must be match with the format'})
     password!:string;

    @IsOptional()
    create_at?:Date=new Date();

    @IsOptional()
    updated_at?:Date= new Date();


}

export class UpdateTestDto{
    @IsNotEmpty({message:'Name is a mandatory Field'})
    name!:string;
    @IsNotEmpty()
    email!:string;

     @IsNotEmpty()
     //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'Password must be match with the format'})
     password!:string;

    @IsOptional()
    create_at?:Date=new Date();

    @IsOptional()
    updated_at?:Date= new Date();


}


