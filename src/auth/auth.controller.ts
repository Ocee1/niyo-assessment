import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { Response } from 'express';
import { SigninDto } from 'src/users/dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor ( 
        private authService: AuthService
    ) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup (@Body() signupDto: CreateUserDto, @Res() res: Response): Promise<void> {
        const data = await this.authService.signUp(signupDto);
        res.json(data)
    }

    @Post('signin')
    @HttpCode(HttpStatus.ACCEPTED)
    async signin(@Body() signinDto: SigninDto, @Res() res: Response): Promise<void> {
        const { accessToken, refreshToken } = await this.authService.signin(signinDto,);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        const payload = {
            message: 'Success',
            
            token: accessToken
        }
        res.json(payload);
    }
}
