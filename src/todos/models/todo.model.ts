import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

export type TodoDocument = Todo & Document;

@Schema()
@ObjectType()
export class Todo {
	@Field(() => ID)
	id: string;

	@Field()
	@Prop({ required: true })
	title: string;

	@Field({ nullable: true })
	@Prop()
	description?: string;

	@Field({ defaultValue: false })
	@Prop({ default: (): boolean => false })
	completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

@InputType()
export class CreateTodoInput {
	@Field()
	title: string;

	@Field({ nullable: true })
	description?: string;
}

@InputType()
export class UpdateTodoStatusInput {
	@Field(() => ID)
	id: string;

	@Field()
	completed: boolean;
}
