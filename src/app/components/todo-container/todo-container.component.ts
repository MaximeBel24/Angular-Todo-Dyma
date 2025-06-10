import { Component, inject, signal } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodosListComponent } from '../todos-list/todos-list.component';
import { Todo, TodoForm } from '../../shared/interfaces';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-todo-container',
  imports: [TodoFormComponent, TodosListComponent],
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.scss',
})
export class TodoContainerComponent {
  todosList = signal<Todo[]>([]);
  todosService = inject(TodoService)

  addTodo(todo: TodoForm) {
    this.todosService.addTodo(todo);
  }

  toggleTodo(todoId: string) {
    this.todosList.update((todos) => 
      todos.map((todo) => {
        if(todoId === todo._id) {
          return {
            ...todo,
            done: !todo.done,
          };
        } else {
          return todo;
        }
      })
    )
  }
}
