import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Matches  } from "class-validator";

export class CreateTestDto{
    
    @IsString()
    @IsNotEmpty({message:"Name can not be empty"})
    name!:string;

    @IsEmail()
    @IsNotEmpty()
    email!:string;
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,{message:"Password should be matched with the format"})
    password!:string;

    @IsOptional()
    @IsDate()
    created_at?: Date= new Date()

    @IsOptional()
    @IsDate()
    updated_at?: Date= new Date()
}

export class UpdateTestDto{
    
    @IsString()
    @IsNotEmpty({message:"Name can not be empty"})
    name!:string;

    @IsEmail()
    @IsNotEmpty()
    email!:string;
    
    @IsString()
    @IsNotEmpty()
    password!:string;

    @IsOptional()
    @IsDate()
    created_at?: Date= new Date()

    @IsOptional()
    @IsDate()
    updated_at?: Date= new Date()
}