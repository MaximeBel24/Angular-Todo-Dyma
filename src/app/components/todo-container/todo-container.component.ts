import { Component, computed, inject, signal } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodosListComponent } from '../todos-list/todos-list.component';
import { Todo, TodoForm } from '../../shared/interfaces';
import { TodoService } from '../../shared/services/todo.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todo-container',
  imports: [TodoFormComponent, TodosListComponent, JsonPipe],
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.scss',
})
export class TodoContainerComponent {
  todosService = inject(TodoService);
  todosList = computed(() => this.todosService.todosResource.value() || []);
  todosIsLoading = this.todosService.todosResource.isLoading;
  selectedTodo = this.todosService.selectedTodoResource.value;

  addTodo(todo: TodoForm) {
    this.todosService.addTodo(todo);
  }

  selectTodo(todoId: string) {
    this.todosService.selectTodo(todoId);
  }

  updateTodo(todo: Todo) {
    this.todosService.updateTodo(todo);
  }

  deleteTodo(todoId: string) {
    this.todosService.deleteTodo(todoId);
  }
}
