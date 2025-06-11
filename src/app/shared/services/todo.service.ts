import { Injectable, resource, signal } from '@angular/core';
import { Todo, TodoForm } from '../interfaces';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  BASE_URL = 'https://restapi.fr/api/atodos';

  // todosResource = resource({
  //   loader: async (): Promise<Todo[]> => (await fetch(`${this.BASE_URL}?delay=1`)).json(),
  // });

  // Depuis Angular 20, possibilité d'utiliser httpResource
  todosResource = httpResource<Todo[]>(() => ({
    url: this.BASE_URL,
    defaultValue: [],
    params: { delay: 1 },
  }));

  selectedTodoId = signal<string | null>(null);

  // selectedTodoResource = resource({
  //   params: () => ({ id: this.selectedTodoId() }),
  //   loader: async ({ params, abortSignal }): Promise<Todo | undefined> => {
  //     if (params.id) {
  //       return (
  //         await fetch(`${this.BASE_URL}/${params.id}`, { signal: abortSignal })
  //       ).json();
  //     } else {
  //       return;
  //     }
  //   },
  // });

  // Depuis Angular 20, possibilité d'utiliser httpResource pour la selection
  selectedTodoResource = httpResource<Todo | undefined>(() => {
    const todoId = this.selectedTodoId();

    if (!todoId) {
      return undefined;
    }

    return {
      url: `${this.BASE_URL}/${todoId}`,
      defaultValue: undefined,
    };
  });

  constructor() {}

  selectTodo(todoId: string) {
    this.selectedTodoId.set(todoId);
    console.log(this.selectedTodoId());
  }

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
        this.todosResource.update((todos) =>
          todos ? [...todos, body] : [body]
        );
        console.log({ body });
      } else {
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }

  async updateTodo(todo: Todo) {
    try {
      const { _id, ...restTodo } = todo;
      const response = await fetch(`${this.BASE_URL}/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify(restTodo),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const body = await response.json();
      if (response.ok) {
        console.log({ body });
        this.todosResource.update((todos) =>
          todos?.map((t) => (t._id === (body as Todo)._id ? body : t))
        );
        this.selectedTodoResource.reload();
      } else {
        const body = await response.json();
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }

  async deleteTodo(todoId: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/${todoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.todosResource.update((todos) =>
          todos?.filter(({ _id }) => _id !== todoId)
        );
        if (this.selectedTodoId() === todoId) {
          this.selectedTodoId.set(null);
        }
      } else {
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }
}
