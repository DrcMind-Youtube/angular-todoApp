import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../shared/toolbar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule, RouterModule],
  template: `
    <app-toolbar [isLoginBtnShown]="true"></app-toolbar>
    <form [formGroup]="registerForm" class="form-container">
      <h2 class="title">Enregistrez-vous</h2>
      <h3 class="sub-title">
        Veillez entrer votre email et mot de passe
        <a routerLink="/login">Se connecter</a>
      </h3>
      <br />
      <input placeholder="Email" type="email" formControlName="email" />
      <input
        placeholder="Mot de passe"
        type="password"
        formControlName="password"
      />
      <br />
      <button
        [ngClass]="{ 'active-btn': !registerForm.invalid }"
        class="auth-btn"
        [disabled]="registerForm.invalid"
        (click)="onSubmit()"
      >
        S'inscrire
      </button>
    </form>
  `,
  styles: [],
})
export default class RegisterComponent {
  private ts = inject(TodoService);
  private router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async onSubmit() {
    const user: User = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };
    localStorage.setItem('email', user.email);
    await this.ts.newUser(user);
    this.router.navigateByUrl('/todos');
  }
}
