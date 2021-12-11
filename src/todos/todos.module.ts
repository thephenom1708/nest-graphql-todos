import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosResolver } from './todos.resolver';
import { Todo, TodoSchema } from './models/todo.model';
import { TodosService } from './todos.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}
