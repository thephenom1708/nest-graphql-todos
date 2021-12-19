// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { isValidEmail, isValidMobileNumber } from '@/src/utils/validators';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
	@Field(() => ID)
	id: string;

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
		trim: true
	})
	password?: string;

	@Field()
	@Prop({ trim: true, validate: isValidMobileNumber })
	mobile: string;

	@Field({ nullable: true })
	@Prop({ trim: true })
	firstName: string;

	@Field({ nullable: true })
	@Prop({ trim: true })
	lastName: string;

	@Field({ defaultValue: true })
	@Prop()
	isActive: boolean;

	@Field()
	@Prop({ required: true })
	createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', function (next: CallableFunction) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const user: any = this;
	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) {
			return next(err);
		}
		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) {
				return next(err);
			}
			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return bcrypt.compareSync(candidatePassword, this?.password);
};
