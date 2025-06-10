import { Component, output } from '@angular/core';
import { Todo, TodoForm } from '../../shared/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  todoName = '';
  addTodo = output<TodoForm>();

  addTodoInput() {
    if (this.todoName) {
      const newTodo: TodoForm = {
        name: this.todoName,
        done: false,
      };
      this.todoName = '';
      this.addTodo.emit(newTodo);
    }
  }
}
