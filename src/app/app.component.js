import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="bg-white shadow">
        <div class="container mx-auto p-4">
          <h1 class="text-xl font-bold">Team Tasks Dashboard</h1>
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