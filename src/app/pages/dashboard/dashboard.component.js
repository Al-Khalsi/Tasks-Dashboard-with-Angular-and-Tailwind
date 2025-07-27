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
    </div>
  `
})
export class DashboardComponent {
  tasks = [];
  filteredTasks = [];
  filters = {
    status: '',
    searchTerm: ''
  };

  taskService = inject(TaskService);

  async ngOnInit() {
    await this.taskService.fetchUsers();
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks];
  }

  onFilterChange(filters) {
    this.filters = filters;
    this.filteredTasks = this.taskService.filterTasks(this.filters);
  }
}