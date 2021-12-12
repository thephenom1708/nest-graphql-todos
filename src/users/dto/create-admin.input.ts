import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	mobile: string;

	@Field()
	password: string;
}
