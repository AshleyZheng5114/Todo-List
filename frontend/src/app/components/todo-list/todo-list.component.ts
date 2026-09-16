import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TodoItem, TodoService } from '../../service/todo.service';
import { DatePipe } from '@angular/common';
import { TodoCreationFormComponent } from '../todo-creation-form/todo-creation-form.component';

@Component({
  selector: 'app-todo-list',
  imports: [DatePipe, TodoCreationFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService);

  todoList: WritableSignal<TodoItem[]> = signal([]);
  showForm: WritableSignal<boolean> = signal(false);
  isEdit: WritableSignal<boolean> = signal(false);
  selectedTodo: WritableSignal<TodoItem | undefined> = signal(undefined);

  ngOnInit(): void {
    this.getAllTodo();
  }
  getAllTodo() {
    this.todoService.getTodoList().subscribe((res) => {
      console.log(res);
      this.todoList.set(res);
    });
  }
  openModal(isEdit: boolean, todo?: TodoItem) {
    if (this.showForm()) {
      return;
    }
    this.isEdit.set(isEdit);
    if (this.isEdit() && todo) {
      this.selectedTodo.set(todo as TodoItem);
    }
    this.showForm.set(true);
  }

  closeModal(needRefresh: boolean) {
    if (!this.showForm()) {
      return;
    }
    this.showForm.set(false);
    if (needRefresh) {
      this.getAllTodo();
    }
  }

  modifyTodoItem() {}

  markAsCompleted(id: string) {
    this.todoService.markAsCompleted(id).subscribe({
      next: (res) => {
        this.getAllTodo();
      },
    });
  }

  deleteTodoItem(id: string) {
    console.log('delete:', id);
    this.todoService.deleteTodoItem(id).subscribe({
      next: (res) => {
        this.getAllTodo();
      },
    });
  }
}
