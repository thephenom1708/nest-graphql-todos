import { Args, Query, Resolver, ID, Mutation } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { CreateTodoInput, Todo, UpdateTodoStatusInput } from './models/todo.model';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo])
  async todos() {
    return this.todosService.findAll();
  }

  @Query(() => Todo)
  async todo(@Args('id', { type: () => ID }) id: string) {
    return this.todosService.findById(id);
  }

  @Mutation(() => Todo)
  async addTodo(@Args('todo') todo: CreateTodoInput) {
    return this.todosService.create(todo);
  }

  @Mutation(() => Todo)
  async updateTodoStatus(@Args('updateTodoStatusInput') updateTodoStatusInput: UpdateTodoStatusInput) {
    return this.todosService.updateStatus(updateTodoStatusInput.id, updateTodoStatusInput.completed);
  }
}