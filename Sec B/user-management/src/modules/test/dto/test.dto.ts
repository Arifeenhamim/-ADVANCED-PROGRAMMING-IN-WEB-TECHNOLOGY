import { IsNotEmpty , IsOptional, IsAlphanumeric, Matches } from "class-validator";

export class CreateTestDto{
    @IsNotEmpty({message:"Name is a mandatory Field"})
    name!: string;

    @IsNotEmpty()
    email!: string; 

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    password!: string;

    @IsOptional()
    created_at?: Date = new Date();
    
    @IsOptional()
    updated_at?: Date = new Date();
}

export class UpdateTestDto{
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    email!: string; 

    @IsNotEmpty()
    password!: string;

    @IsOptional()
    created_at?: Date = new Date();
    
    @IsOptional()
    updated_at?: Date = new Date();
}