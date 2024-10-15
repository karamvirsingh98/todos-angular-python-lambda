import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private http: HttpClient;
  private url = environment.API_URL + '/todos';
  todos: Todo[] = [];

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetch() {
    return this.http
      .get<Todo[]>(this.url)
      .subscribe((todos) => (this.todos = todos));
  }

  create(title: string) {
    return this.http.post(this.url, { title }).subscribe(() => this.fetch());
  }

  update(todo: Todo) {
    return this.http
      .put(this.url, { ...todo, done: !todo.done })
      .subscribe(() => this.fetch());
  }

  delete(id: string) {
    return this.http.delete(this.url + `/${id}`).subscribe(() => this.fetch());
  }
}
