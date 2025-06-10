import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../../shared/interfaces';
import { TodoFilterComponent } from "../todo-filter/todo-filter.component";

@Component({
  selector: 'app-todos-list',
  imports: [TodoComponent, TodoFilterComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  filter = signal<string>('');
  todosList = input<Todo[]>([]);
  todosLength = computed(() => this.todosList().length);
  filteredTodosList = computed(() =>
    this.todosList().filter((t) => t.name.toLowerCase().includes(this.filter()))
  );
  toggleTodo = output<string>();

  constructor() {
    effect(() => {
      console.log(this.todosList());
    });
  }
}
