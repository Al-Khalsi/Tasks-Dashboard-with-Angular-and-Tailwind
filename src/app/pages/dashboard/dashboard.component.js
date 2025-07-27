import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { TaskFilterComponent } from '../../../components/task-filter/task-filter.component';
import { TaskListComponent } from '../../../components/task-list/task-list.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TaskFilterComponent,
    TaskListComponent
  ],
  selector: 'app-dashboard',
  template: `
    <div class="container mx-auto p-4 sm:p-6">
      <h1 class="text-xl sm:text-2xl font-bold mb-6 text-blue-400">
        <span class="text-green-400">></span> Team Tasks
      </h1>
      
      <div class="mb-6">
        <a 
          routerLink="/tasks/new"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors
                 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 text-sm sm:text-base">
          + Add New Task
        </a>
      </div>
      
      <app-task-filter (filterChange)="onFilterChange($event)"></app-task-filter>
      
      <app-task-list [tasks]="filteredTasks"></app-task-list>
      
      <!-- بخش نمایش کاربران -->
      <div class="mt-8">
        <h2 class="text-lg sm:text-xl font-bold mb-4 text-blue-400">
          <span class="text-green-400">></span> Team Members ({{users.length}})
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div *ngFor="let user of users" 
               class="p-3 sm:p-4 border border-gray-700 rounded bg-gray-800 shadow hover:border-blue-400 transition-all">
            <div class="flex items-center space-x-2 sm:space-x-3">
              <div class="avatar bg-blue-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-base">
                {{ user.name.charAt(0) }}
              </div>
              <div class="min-w-0">
                <h3 class="font-medium text-white text-sm sm:text-base truncate">{{ user.name }}</h3>
                <p class="text-gray-400 text-xs sm:text-sm truncate">{{ user.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .avatar {
      font-weight: bold;
    }
  `]
})
export class DashboardComponent {
  tasks = [];
  filteredTasks = [];
  users = [];
  filters = {
    status: '',
    searchTerm: ''
  };

  taskService = inject(TaskService);

  async ngOnInit() {
    this.users = await this.taskService.fetchUsers();
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks];
  }

  onFilterChange(filters) {
    this.filters = filters;
    this.filteredTasks = this.taskService.filterTasks(this.filters);
  }
}