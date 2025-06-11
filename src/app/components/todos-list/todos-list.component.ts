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
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';

@Component({
  selector: 'app-todos-list',
  imports: [TodoComponent, TodoFilterComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  filter = signal<string>('');
  todosList = input<Todo[]>([]);
  nbrOfFilteredTodos = computed(() => this.filteredTodosList()?.length);
  filteredTodosList = computed(() =>
    this.todosList().filter((t) => 
      t.name.toLowerCase().includes(this.filter())
    )
  );
  updateTodo = output<Todo>();
  selectTodo = output<string>();
  deleteTodo = output<string>()
}
