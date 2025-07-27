import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-login',
  template: `
    <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div class="p-8">
          <h1 class="text-2xl font-bold text-center text-blue-400 mb-6">
            <span class="text-green-400">></span> Login
          </h1>
          
          <form #loginForm="ngForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label class="block text-gray-300 mb-2">Email or Username</label>
              <input 
                type="text" 
                [(ngModel)]="identifier" 
                name="identifier"
                required
                placeholder="Enter your email or username"
                class="w-full p-3 border border-gray-700 rounded bg-gray-900 text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
                [class.border-red-500]="errors.identifier">
              <div *ngIf="errors.identifier" class="text-red-400 text-sm mt-1">
                {{ errors.identifier }}
              </div>
            </div>
            
            <div>
              <label class="block text-gray-300 mb-2">Password</label>
              <input 
                type="password" 
                [(ngModel)]="password" 
                name="password"
                required
                placeholder="Enter your password"
                class="w-full p-3 border border-gray-700 rounded bg-gray-900 text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
                [class.border-red-500]="errors.password">
              <div *ngIf="errors.password" class="text-red-400 text-sm mt-1">
                {{ errors.password }}
              </div>
            </div>
            
            <div *ngIf="errorMessage" class="text-red-400 text-sm">
              {{ errorMessage }}
            </div>
            
            <button 
              type="submit" 
              class="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-500 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
              Login
            </button>
          </form>
          
          <div class="mt-6 text-center text-gray-400">
            Don't have an account? 
            <a routerLink="/register" class="text-blue-400 cursor-pointer hover:underline">Register</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-input:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
  `]
})
export class LoginComponent {
  identifier = '';
  password = '';
  errors = {};
  errorMessage = '';

  authService = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    this.errors = {};
    this.errorMessage = '';

    // basic validation
    if (!this.identifier) {
      this.errors.identifier = 'Email or username is required';
      return;
    }

    if (!this.password) {
      this.errors.password = 'Password is required';
      return;
    }

    try {
      this.authService.login(this.identifier, this.password);
      this.router.navigate(['/tasks']);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}