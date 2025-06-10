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
  toggleTodo = output<string>();
}
