import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";


export class SigninDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

}