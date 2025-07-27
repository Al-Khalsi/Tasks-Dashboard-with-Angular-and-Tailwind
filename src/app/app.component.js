import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-900 text-gray-100 font-mono">
      <div class="bg-gray-800 shadow-lg">
        <div class="container mx-auto p-4">
          <h1 class="text-xl font-bold text-blue-400">
            <span class="text-green-400">></span> Team Tasks Dashboard
          </h1>
        </div>
      </div>
      
      <main class="container mx-auto p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
   title = 'team-tasks-dashboard';
}