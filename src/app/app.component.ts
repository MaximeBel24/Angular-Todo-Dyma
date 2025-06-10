import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoContainerComponent } from "./components/todo-container/todo-container.component";

@Component({
  selector: 'app-root',
  imports: [TodoContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todos';
}
