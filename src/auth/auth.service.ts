import { Injectable } from '@nestjs/common';
import { CustomerService } from '@/src/users/customer.service';
import { AdminService } from '@/src/users/admin.service';

@Injectable()
export class AuthService {
	constructor(private readonly customerService: CustomerService, private readonly adminService: AdminService) {}
}
