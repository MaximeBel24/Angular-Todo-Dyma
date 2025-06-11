import { Component, input, output } from '@angular/core';
import { Todo } from '../../shared/interfaces';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todo = input.required<Todo>();
  updateTodo = output<Todo>();
  selectTodo = output<string>();
  deleteTodo = output<string>();
  toggleTodo() {
    this.updateTodo.emit({...this.todo(), done: !this.todo().done})
  }
}
