import { BadRequestException, HttpStatus, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Http2ServerResponse } from 'http2';
import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { SigninDto } from 'src/users/dto/signin.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
    constructor (
        private jwtService: JwtService,
        private userService: UsersService,
        private configService: ConfigService,
    ) {}

	async signUp(dto: CreateUserDto): Promise<any> {
	
		const user = await this.userService.getUserByEmail(dto.email);

		if(user) {
			throw new UnprocessableEntityException({
				status: HttpStatus.UNPROCESSABLE_ENTITY,
				errors: {
					email: 'emailAlreadyExists'
				}

			})
		}

		const salt = await bcrypt.genSalt();

		dto.password = await bcrypt.hash(dto.password, salt);

		await this.userService.create(dto);

		return "User created Successfully";
	}

	async signin (dto: SigninDto) {
		const user = await this.userService.getUserByEmail(dto.email);

		if (!user) {
			throw new BadRequestException({
				status: HttpStatus.BAD_REQUEST,
				errors: 'Invalid email!'
			});
		}
		// await console.log('printtttt:', user)
		const isValidPassword = await bcrypt.compare(
				dto.password,
				user.password,
		);

		if (!isValidPassword) {
			throw new UnprocessableEntityException({
				status: HttpStatus.UNPROCESSABLE_ENTITY,
				errors: {
					password: 'Incorrect sign-in credentials',
				},
			});
		}
		const data = {
			id: user.id,
		}
		const accessToken = await this.generateAccessToken(user);
		const refreshToken = await this.createRefreshToken(user.id)

		return {
			accessToken,
			refreshToken
		}
	}

	async generateAccessToken (user: any): Promise<string> {
		const tokenId = randomUUID();
		const accessToken = await this.jwtService.sign(
			{ 
				id: user.id, 
				email: user.email, 
				tokenId 
			},
			{ expiresIn: this.configService.get('EXPIRES_IN') }
		)
		 
		return accessToken;
	}

	async createRefreshToken(userId: string): Promise<string> {
    const tokenId = randomUUID();
		const refreshToken = await this.jwtService.sign(
			{ 
				id: userId, 
				tokenId 
			},
			{ expiresIn: this.configService.get('REFRESH_EXPIRES_IN') }
		)
    return refreshToken;
  }

	decodeRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
