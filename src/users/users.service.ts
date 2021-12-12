import { Injectable } from '@nestjs/common';
import { User } from '@/src/users/models/user.model';

@Injectable()
export abstract class UsersService {
	abstract findById(id: string): Promise<User | null>;
}
