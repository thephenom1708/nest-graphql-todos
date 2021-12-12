import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from '@/src/users/models/customer.model';
import { CreateCustomerInput } from '@/src/users/dto/create-customer.input';
import { UsersService } from '@/src/users/users.service';

@Injectable()
export class CustomerService extends UsersService {
	constructor(@InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>) {
		super();
	}

	async findAll(): Promise<Array<Customer>> {
		return this.customerModel.find().exec();
	}

	async findById(id: string): Promise<Customer> {
		return this.customerModel.findById(id).exec();
	}

	async getOrCreateCustomer(createCustomerInput: CreateCustomerInput): Promise<Customer> {
		const customer: Customer = await this.customerModel.findOne({ mobile: createCustomerInput.mobile }).exec();

		if (!customer) {
			const newCustomer: Partial<Customer> = {
				...createCustomerInput,
				createdAt: new Date()
			};
			return this.customerModel.create(newCustomer);
		}
		return customer;
	}
}
