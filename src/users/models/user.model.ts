import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class User {
	@Field(() => ID)
	id: string;

	@Field()
	mobile: string;

	@Field({ nullable: true })
	email: string;

	@Field({ nullable: true })
	firstName: string;

	@Field({ nullable: true })
	lastName: string;

	@Field({ defaultValue: true })
	isActive: boolean;

	@Field()
	createdAt: Date;
}
