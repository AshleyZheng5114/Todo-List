import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreationFormComponent } from './todo-creation-form.component';

describe('TodoCreationFormComponent', () => {
  let component: TodoCreationFormComponent;
  let fixture: ComponentFixture<TodoCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCreationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoCreationFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
