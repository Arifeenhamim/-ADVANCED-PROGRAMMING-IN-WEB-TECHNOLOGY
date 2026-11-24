import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string = "";

  @IsNotEmpty()
  email: string = "";

  @IsNotEmpty()
  password: string = "";

  @IsOptional()
  created_at?: Date = new Date();

  @IsOptional()
  updated_at?: Date = new Date();
}

export class UpdateUserDto {
  @IsOptional()
  name: string = "";

  @IsOptional()
  email: string = "";

  @IsOptional()
  password: string = "";

  @IsOptional()
  created_at?: Date = new Date();

  @IsOptional()
  updated_at?: Date = new Date();
}

