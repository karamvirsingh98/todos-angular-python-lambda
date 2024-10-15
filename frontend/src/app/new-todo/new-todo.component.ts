import { booleanAttribute, Component, Input } from '@angular/core';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [],
  templateUrl: './new-todo.component.html',
})
export class NewTodoComponent {
  service: TodosService;
  disabled = false;

  constructor(service: TodosService) {
    this.service = service;
  }

  createTodo() {
    this.disabled = true;
    const input = document.getElementById('todo-input') as HTMLInputElement;
    this.service.create(input.value).add(() => {
      input.value = '';
      this.disabled = false;
    });
  }
}
