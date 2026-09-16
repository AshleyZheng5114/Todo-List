import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface TodoItem {
  id?: string;
  itemName: string;
  targetDueDate: Date;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/todo';

  getTodoList(): Observable<TodoItem[]> {
    return this.http
      .get<{
        todoList: {
          _id: string;
          itemName: string;
          targetDueDate: Date;
          completed: boolean;
        }[];
      }>(this.baseUrl)
      .pipe(map((res) => res.todoList.map((item) => ({ ...item, id: item._id }))));
  }

  createTodoItem(todo: TodoItem) {
    return this.http.post(this.baseUrl, todo);
  }

  markAsCompleted(id: string): Observable<TodoItem> {
    return this.http
      .put<{ updatedTodo: TodoItem }>(`${this.baseUrl}/${id}`, { completed: true })
      .pipe(map((res) => res.updatedTodo));
  }

  modifyTodoItem(todo: TodoItem): Observable<TodoItem> {
    return this.http
      .put<{ updatedTodo: TodoItem }>(`${this.baseUrl}/${todo.id}`, todo)
      .pipe(map((res) => res.updatedTodo));
  }

  deleteTodoItem(id: string): Observable<TodoItem> {
    console.log('Test');
    return this.http
      .delete<{ deletedTodo: TodoItem }>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.deletedTodo));
  }
}
