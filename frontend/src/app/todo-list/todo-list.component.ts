import { NgFor } from '@angular/common';
import { booleanAttribute, Component, Input, OnInit } from '@angular/core';
import { FilterByStatusPipe } from '../filter-by-status.pipe';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, FilterByStatusPipe],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  service: TodosService;

  @Input({ transform: booleanAttribute }) done = false;

  constructor(service: TodosService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.service.fetch();
  }
}
