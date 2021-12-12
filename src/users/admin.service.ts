import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '@/src/users/models/admin.model';
import { CreateAdminInput } from '@/src/users/dto/create-admin.input';

@Injectable()
export class AdminService {
	constructor(@InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>) {}

	async findAll(): Promise<Array<Admin>> {
		return this.adminModel.find().exec();
	}

	async findById(id: string): Promise<Admin> {
		return this.adminModel.findById(id).exec();
	}

	async createAdmin(createAdminInput: CreateAdminInput): Promise<Admin> {
		const customer: Partial<Admin> = {
			...createAdminInput,
			createdAt: new Date()
		};
		return this.adminModel.create(customer);
	}
}
