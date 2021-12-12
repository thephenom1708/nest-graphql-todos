import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '@/src/users/models/customer.model';
import { Admin, AdminSchema } from '@/src/users/models/admin.model';
import { CustomerService } from '@/src/users/customer.service';
import { AdminService } from '@/src/users/admin.service';
import { UsersService } from '@/src/users/users.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Customer.name,
				schema: CustomerSchema
			},
			{
				name: Admin.name,
				schema: AdminSchema
			}
		])
	],
	providers: [CustomerService, AdminService],
	exports: [UsersService, CustomerService, AdminService]
})
export class UsersModule {}
