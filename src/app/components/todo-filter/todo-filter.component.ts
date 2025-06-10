import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-filter',
  imports: [FormsModule],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.scss'
})
export class TodoFilterComponent {

  filter = model<string>('');
}
