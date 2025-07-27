import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-register',
  template: `
    <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div class="p-8">
          <h1 class="text-2xl font-bold text-center text-blue-400 mb-6">
            <span class="text-green-400">></span> Register
          </h1>
          
          <form #registerForm="ngForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label class="block text-gray-300 mb-2">Username*</label>
              <input 
                type="text" 
                [(ngModel)]="username" 
                name="username"
                required
                minlength="3"
                maxlength="20"
                pattern="^[a-zA-Z0-9_]+$"
                placeholder="Enter your username"
                class="w-full p-3 border border-gray-700 rounded bg-gray-900 text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
                [class.border-red-500]="errors.username">
              <div *ngIf="errors.username" class="text-red-400 text-sm mt-1">
                {{ errors.username }}
              </div>
            </div>
            
            <div>
              <label class="block text-gray-300 mb-2">Email*</label>
              <input 
                type="email" 
                [(ngModel)]="email" 
                name="email"
                required
                placeholder="Enter your email"
                class="w-full p-3 border border-gray-700 rounded bg-gray-900 text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
                [class.border-red-500]="errors.email">
              <div *ngIf="errors.email" class="text-red-400 text-sm mt-1">
                {{ errors.email }}
              </div>
            </div>
            
            <div>
              <label class="block text-gray-300 mb-2">Password*</label>
              <input 
                type="password" 
                [(ngModel)]="password" 
                name="password"
                required
                minlength="6"
                placeholder="Enter your password"
                class="w-full p-3 border border-gray-700 rounded bg-gray-900 text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
                [class.border-red-500]="errors.password">
              <div *ngIf="errors.password" class="text-red-400 text-sm mt-1">
                {{ errors.password }}
              </div>
            </div>
            
            <div>
              <label class="block text-gray-300 mb-2">Confirm Password*</label>
              <input 
                type="password" 
                [(ngModel)]="confirmPassword" 
                name="confirmPassword"
                required
                placeholder="Confirm your password"
                class="w-full p-3 border border-gray-700 rounded bg-gray-900 text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
                [class.border-red-500]="errors.confirmPassword">
              <div *ngIf="errors.confirmPassword" class="text-red-400 text-sm mt-1">
                {{ errors.confirmPassword }}
              </div>
            </div>
            
            <div *ngIf="errorMessage" class="text-red-400 text-sm">
              {{ errorMessage }}
            </div>
            
            <button 
              type="submit" 
              class="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-500 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">
              Register
            </button>
          </form>
          
          <div class="mt-6 text-center text-gray-400">
            Already have an account? 
            <a routerLink="/login" class="text-blue-400 hover:underline">Login</a>
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
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errors = {};
  errorMessage = '';

  authService = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    this.errors = {};
    this.errorMessage = '';

    // username validation
    if (!this.username) {
      this.errors.username = 'Username is required';
    } else if (this.username.length < 3) {
      this.errors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(this.username)) {
      this.errors.username = 'Username can only contain letters, numbers and underscores';
    }

    // email validation
    if (!this.email) {
      this.errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errors.email = 'Please enter a valid email';
    }

    // password validation
    if (!this.password) {
      this.errors.password = 'Password is required';
    } else if (this.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters';
    }

    // confirm password validation
    if (!this.confirmPassword) {
      this.errors.confirmPassword = 'Please confirm your password';
    } else if (this.password !== this.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    try {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      
      this.authService.register(user);
      this.router.navigate(['/tasks']);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}