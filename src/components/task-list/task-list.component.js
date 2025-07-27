import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-task-list',
  template: `
    <div class="grid gap-4">
      <div *ngFor="let task of tasks" 
           class="p-4 border border-gray-700 rounded bg-gray-800 shadow-lg
                  hover:border-blue-400 transition-colors">
        <h3 class="font-bold text-blue-400">{{ task.title }}</h3>
        <p class="text-gray-400 mt-2">{{ task.description || 'No description' }}</p>
        <div class="flex justify-between items-center mt-3">
          <span class="text-sm font-mono" 
                [class.text-green-400]="task.completed" 
                [class.text-yellow-400]="!task.completed">
            {{ task.completed ? '✓ Completed' : '◉ Pending' }}
          </span>
          <span class="text-sm text-blue-400 font-mono">
            {{ task.assignedUser?.name || 'Unassigned' }}
          </span>
        </div>
        <a [routerLink]="['/tasks', task.id, 'edit']" 
           class="text-blue-400 text-sm mt-2 inline-block hover:text-blue-300">
          Edit
        </a>
      </div>
    </div>
  `
})
export class TaskListComponent {
  @Input() tasks = [];
}