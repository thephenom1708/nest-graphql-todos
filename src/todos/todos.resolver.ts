import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodosService } from '@/src/todos/todos.service';
import { CreateTodoInput, Todo, UpdateTodoStatusInput } from '@/src/todos/models/todo.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/src/auth/guards/gql-auth.guard';

@Resolver(() => Todo)
@UseGuards(GqlAuthGuard)
export class TodosResolver {
	constructor(private readonly todosService: TodosService) {}

	@Query(() => [Todo])
	async todos(): Promise<Array<Todo>> {
		return this.todosService.findAll();
	}

	@Query(() => Todo, { nullable: true })
	async todo(@Args('id', { type: () => ID }) id: string): Promise<Todo> {
		return this.todosService.findById(id);
	}

	@Mutation(() => Todo)
	async addTodo(@Args('todo') todo: CreateTodoInput) {
		return this.todosService.create(todo);
	}

	@Mutation(() => Todo)
	async updateTodoStatus(@Args('updateTodoStatusInput') updateTodoStatusInput: UpdateTodoStatusInput): Promise<Todo> {
		return this.todosService.updateStatus(updateTodoStatusInput.id, updateTodoStatusInput.completed);
	}
}
