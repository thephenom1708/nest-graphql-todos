import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@/src/users/models/user.model';
import { UsersService } from '@/src/users/users.service';
import { CreateUserInput } from '@/src/users/inputs/create-user.input';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly userService: UsersService) {}

	@Query(() => [User])
	async users(): Promise<Array<User>> {
		return this.userService.findAll();
	}

	@Query(() => User, { nullable: true })
	async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
		return this.userService.findById(id);
	}

	@Mutation(() => User)
	async createUser(@Args('user') user: CreateUserInput): Promise<User> {
		return this.userService.create(user);
	}
}
