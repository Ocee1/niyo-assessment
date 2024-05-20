import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor (
        @InjectModel('User') private userModel: Model<User>,
    ) {}

    async create (createUserDto: CreateUserDto): Promise<User> {

        return this.userModel.create(createUserDto);
    }

    async getUserByEmail(
		email: string
	): Promise<any> {
		const user = await this.userModel.findOne({email});
		if (!user) {
			return null;
		}

		return user;
	}


    async getOneUser(
		id: string
	): Promise<User> {
		const user = await this.userModel.findById(id);
		if (!user) {
			throw new Error('User not found')
		}

		return user;
	}

}
