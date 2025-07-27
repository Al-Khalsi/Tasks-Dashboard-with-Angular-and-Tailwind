import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-900 text-gray-100 font-mono">
      <div class="bg-gray-800 shadow-lg">
        <div class="container mx-auto p-4 flex justify-between items-center">
          <h1 class="text-xl font-bold text-blue-400">
            <span class="text-green-400">></span> Team Tasks Dashboard
          </h1>
          
          <div *ngIf="authService.isLoggedIn()" class="flex items-center space-x-4">
            <span class="text-sm text-gray-300">
              Welcome, {{ authService.getCurrentUser()?.username }}
            </span>
            <button 
              (click)="logout()"
              class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-sm
                     transition-colors focus:outline-none focus:ring-2 focus:ring-red-400">
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <main class="container mx-auto p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}