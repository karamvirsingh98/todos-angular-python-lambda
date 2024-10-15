import { Component, OnInit } from '@angular/core';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NewTodoComponent, TodoListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'todos-angular';

  constructor() {}

  ngOnInit(): void {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark');
    }
  }
}
