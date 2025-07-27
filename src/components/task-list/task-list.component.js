import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  template: `
    <div class="grid gap-4">
      <div *ngFor="let task of tasks" class="p-4 border rounded shadow">
        <h3 class="font-bold">{{ task.title }}</h3>
        <p class="text-gray-600">{{ task.description || 'No description' }}</p>
        <div class="flex justify-between items-center mt-2">
          <span class="text-sm" [class.text-green-500]="task.completed" [class.text-red-500]="!task.completed">
            {{ task.completed ? 'Completed' : 'Pending' }}
          </span>
          <span class="text-sm text-blue-500">{{ task.assignedUser?.name || 'Unassigned' }}</span>
        </div>
        <a [routerLink]="['/tasks', task.id, 'edit']" class="text-blue-500 text-sm mt-2 inline-block">Edit</a>
      </div>
    </div>
  `
})
export class TaskListComponent {
  @Input() tasks = [];
}