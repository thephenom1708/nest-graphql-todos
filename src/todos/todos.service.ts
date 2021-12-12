import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateTodoInput, Todo, TodoDocument } from '@/src/todos/models/todo.model';

@Injectable()
export class TodosService {
	constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

	async findAll(): Promise<Todo[]> {
		return this.todoModel.find().exec();
	}

	async findById(id: string): Promise<Todo> {
		return this.todoModel.findById(id);
	}

	async create(todo: CreateTodoInput): Promise<Todo> {
		return this.todoModel.create(todo);
	}

	async updateStatus(id: string, completed: boolean): Promise<Todo> {
		return this.todoModel.findByIdAndUpdate(id, { completed }, { new: true });
	}
}
