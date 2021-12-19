import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from '@/src/users/inputs/create-user.input';
import { User, UserDocument } from '@/src/users/models/user.model';

@Injectable()
export class UsersService implements UsersService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

	async findAll(): Promise<Array<User>> {
		return this.userModel.find().exec();
	}

	async findById(id: string): Promise<User> {
		return this.userModel.findById(id).exec();
	}

	async findByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ email }).exec();
	}

	async create(createUserInput: CreateUserInput): Promise<User> {
		const customer: Partial<User> = {
			...createUserInput,
			createdAt: new Date()
		};
		return this.userModel.create(customer);
	}

	async findByEmailAndPassword(email: string, password: string): Promise<User> {
		return this.userModel.findOne({ email, password }).exec();
	}
}
