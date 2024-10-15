import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus',
  standalone: true,
})
export class FilterByStatusPipe implements PipeTransform {
  transform(todos: Todo[], done: boolean): Todo[] {
    return todos.filter((t) => t.done === done);
  }
}
