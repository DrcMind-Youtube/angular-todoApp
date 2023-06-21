import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="form-container" [formGroup]="addTodoForm">
      <input type="text" placeholder="Titre" formControlName="title" />
      <input
        type="text"
        placeholder="Déscription"
        formControlName="description"
      />
      <button
        class="auth-btn"
        [ngClass]="{ 'active-btn': !addTodoForm.invalid }"
        [disabled]="addTodoForm.invalid"
        (click)="onSubmit()"
      >
        Ajouter
      </button>
    </form>
  `,
  styles: [
    `
      .form-container {
        display: flex;
        padding: 0;
        border: none;

        & > * {
          margin: 0 0.5rem;
        }
      }
    `,
  ],
})
export class AddTodoComponent {
  private ts = inject(TodoService);

  addTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  onSubmit() {
    const todo: Todo = {
      title: this.addTodoForm.value.title!,
      description: this.addTodoForm.value.description!,
      done: false,
    };

    this.ts.newTodo(todo);
    this.addTodoForm.reset();
  }
}
