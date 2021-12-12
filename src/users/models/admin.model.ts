import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@/src/users/models/user.model';
import { isValidEmail, isValidMobileNumber } from '@/src/utils/validators';

export type AdminDocument = Admin & Document;

@Schema()
@ObjectType({ implements: () => [User] })
export class Admin implements User {
	id: string;

	@Prop({ trim: true, validate: isValidMobileNumber })
	mobile: string;

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
		validate: isValidEmail
	})
	email: string;

	@Field()
	@Prop({
		required: true,
		trim: true,
		validate: isValidEmail
	})
	password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
