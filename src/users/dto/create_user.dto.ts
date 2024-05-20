import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;
}