import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreateTestDto{
    @IsString()
    @IsNotEmpty({message:"Name is mandatory"})
    name!:string;
    
    @IsEmail()
    @IsNotEmpty()
    email!:string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,{message:'Password must be match with the foramat'})
    password!:string;

    @IsOptional()
    created_at?:Date=new Date()

    @IsOptional()
    updated_at?:Date=new Date()

}

export class UpdateTestDto{
    @IsString()
    @IsNotEmpty({message:"Name is mandatory"})
    name!:string;
    
    @IsEmail()
    @IsNotEmpty()
    email!:string;

    @IsString()
    @IsNotEmpty()
    password!:string;

    @IsOptional()
    created_at?:Date=new Date()

    @IsOptional()
    updated_at?:Date=new Date()

}