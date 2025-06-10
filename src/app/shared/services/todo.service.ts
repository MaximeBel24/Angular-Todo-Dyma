import { Injectable, resource, signal } from '@angular/core';
import { Todo, TodoForm } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  BASE_URL = 'https://restapi.fr/api/todos';

  // todosRessource = resource({
  //   loader: async (): Promise<Todo[]> => (await fetch(this.BASE_URL)).json(),
  // });

  // selectedTodoId = signal<string | null>(null);

  // selectedTodoRessource = resource({
  //   // params: () => ({ id: this.selectedTodoId() }),
  //   par
  //   loader: async ({ params, abortSignal }): Promise<Todo | undefined> => {
  //     if (params.id) {
  //       return (
  //         await fetch(`${this.BASE_URL}/${params.id}`, { signal: abortSignal})
  //       ).json();
  //     } else {
  //       return;
  //     }
  //   }
  // })

  constructor() {}

  async addTodo(todo: TodoForm) {
    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const body = await response.json();
      if (response.ok) {
        console.log(body);
      } else {
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }
}
