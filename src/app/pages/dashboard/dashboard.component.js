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
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6 text-blue-400">
        <span class="text-green-400">></span> Team Tasks
      </h1>
      
      <div class="mb-6">
        <a 
          routerLink="/tasks/new"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors
                 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
          + Add New Task
        </a>
      </div>
      
      <app-task-filter (filterChange)="onFilterChange($event)"></app-task-filter>
      
      <app-task-list [tasks]="filteredTasks"></app-task-list>
      
      <!-- بخش جدید نمایش کاربران -->
      <div class="mt-8">
        <h2 class="text-xl font-bold mb-4 text-blue-400">
          <span class="text-green-400">></span> Team Members ({{users.length}})
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div *ngFor="let user of users" 
               class="p-4 border border-gray-700 rounded bg-gray-800 shadow hover:border-blue-400 transition-all">
            <div class="flex items-center space-x-3">
              <div class="avatar bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                {{ user.name.charAt(0) }}
              </div>
              <div>
                <h3 class="font-medium text-white">{{ user.name }}</h3>
                <p class="text-gray-400 text-sm">{{ user.email }}</p>
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