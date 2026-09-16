import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoItem, TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-creation-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-creation-form.component.html',
  styleUrl: './todo-creation-form.component.css',
})
export class TodoCreationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);
  isEdit = input.required<boolean>();
  oldTodo = input<TodoItem>();
  closeEvent = output<boolean>();

  todoForm = this.fb.nonNullable.group({
    itemName: ['', Validators.required],
    targetDueDate: [this.getTodayString(), Validators.required],
    completed: [false, Validators.required],
  });

  ngOnInit(): void {
    console.log(this.oldTodo());
    if (this.isEdit() && this.oldTodo()) {
      const old = this.oldTodo()!;
      this.todoForm.patchValue({
        itemName: old.itemName,
        targetDueDate: new Date(old.targetDueDate).toISOString().split('T')[0],
        completed: old.completed,
      });
    }
  }

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  closeModal(needRefresh: boolean) {
    this.closeEvent.emit(needRefresh);
  }

  createTodo() {
    if (this.todoForm.invalid) {
      return;
    }
    const todoItem = {
      ...this.todoForm.value,
      targetDueDate: new Date(this.todoForm.value.targetDueDate!),
    };
    console.log(todoItem);
    this.todoService.createTodoItem(todoItem as TodoItem).subscribe({
      next: (res) => {
        this.closeModal(true);
      },
    });
  }

  editTodo() {
    if (this.todoForm.invalid) {
      return;
    }
    const todoItem = {
      ...this.todoForm.value,
      targetDueDate: new Date(this.todoForm.value.targetDueDate!),
      id: this.oldTodo()?.id,
    };

    this.todoService.modifyTodoItem(todoItem as TodoItem).subscribe({
      next: (res) => {
        this.closeModal(true);
      },
    });
  }
}
