import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@/src/users/models/user.model';
import { isValidEmail, isValidMobileNumber } from '@/src/utils/validators';

export type CustomerDocument = Customer & Document;

@Schema()
@ObjectType({ implements: () => [User] })
export class Customer implements User {
	id: string;

	@Prop({ trim: true, validate: isValidEmail })
	email: string;

	@Prop({ trim: true })
	firstName: string;

	@Prop({ trim: true })
	lastName: string;

	@Prop({ default: true })
	isActive: boolean;

	@Prop({ required: true })
	createdAt: Date;

	@Field()
	@Prop({
		required: true,
		trim: true,
		validate: isValidMobileNumber
	})
	mobile: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
