import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '@/src/users/users.service';
import { UsersResolver } from '@/src/users/users.resolver';
import { User, UserSchema } from '@/src/users/models/user.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema
			}
		])
	],
	providers: [UsersService, UsersResolver],
	exports: [UsersService]
})
export class UsersModule {}
