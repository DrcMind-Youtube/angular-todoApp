import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="toolbar">
      <a class="app-title" routerLink="/">TodoApp</a>
      <button
        class="toolbar-btn"
        routerLink="/register"
        *ngIf="isRegisterBtnShown"
      >
        S'inscrire
      </button>
      <button class="toolbar-btn" routerLink="/login" *ngIf="isLoginBtnShown">
        Se connecter
      </button>
      <div class="avatar-logout-btn" *ngIf="isLogoutBtnShown">
        <div class="user-avatar">
          {{ firstEmailLetter![0] | uppercase }}
        </div>
        <button class="toolbar-btn" routerLink="/login" (click)="logOut()">
          Se déconnecter
        </button>
      </div>
    </nav>
  `,
  styles: [
    `
      .toolbar {
        height: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        border-bottom: 0.1px #2828281a solid;
        position: sticky;
        top: 0;
      }

      .app-title {
        text-decoration: none;
        color: inherit;
        font-size: 1.4rem;
        font-weight: bold;
      }

      .toolbar-btn {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background: #252525;
        color: white;
        font-size: 1.1em;
        transition: transform 250ms;

        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }

      .avatar-logout-btn {
        display: flex;
        align-items: center;

        & > * {
          margin-left: 1rem;
        }
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: lightpink;
        font-size: 1.3em;
        font-weight: bolder;
      }
    `,
  ],
})
export class ToolbarComponent {
  @Input() isLoginBtnShown!: boolean;
  @Input() isRegisterBtnShown!: boolean;
  @Input() isLogoutBtnShown!: boolean;

  firstEmailLetter = localStorage.getItem('email');

  logOut = () => localStorage.removeItem('email');
}
