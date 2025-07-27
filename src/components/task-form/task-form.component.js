import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-task-form',
  template: `
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label class="block text-gray-300 mb-1">Title*</label>
        <input 
          type="text" 
          formControlName="title"
          placeholder="Enter task title"
          class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
          [class.border-red-500]="taskForm.get('title').invalid && taskForm.get('title').touched">
        <div *ngIf="taskForm.get('title').invalid && taskForm.get('title').touched" 
             class="text-red-400 text-sm mt-1">
          Title is required
        </div>
      </div>
      
      <div>
        <label class="block text-gray-300 mb-1">Description</label>
        <textarea 
          formControlName="description"
          placeholder="Enter task description (optional)"
          class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-400 h-24 placeholder-gray-500"></textarea>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-300 mb-1">Priority</label>
          <select 
            formControlName="priority"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="high" class="bg-gray-800">High</option>
            <option value="medium" selected class="bg-gray-800">Medium</option>
            <option value="low" class="bg-gray-800">Low</option>
            <option value="none" class="bg-gray-800">None</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-300 mb-1">Assigned To</label>
          <select 
            formControlName="assignedUser"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option [ngValue]="null" class="bg-gray-800">Unassigned</option>
            <option *ngFor="let user of users" [ngValue]="user" class="bg-gray-800">
              {{ user.name }} ({{ user.email.split('@')[0] }})
            </option>
          </select>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id="completed"
          formControlName="completed"
          class="h-5 w-5 text-blue-400 rounded bg-gray-800 border-gray-700
                 focus:ring-blue-400 focus:ring-2">
        <label for="completed" class="text-gray-300">Mark as completed</label>
      </div>
      
      <div class="pt-2">
        <button 
          type="submit" 
          [disabled]="taskForm.invalid"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 
                 disabled:bg-gray-700 disabled:text-gray-500 transition-colors
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          {{ submitText }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    select option {
      background-color: #1f2937;
    }
    select option:hover {
      background-color: #3b82f6 !important;
    }
  `]
})
export class TaskFormComponent {
  @Input() task = null;
  @Input() users = [];
  @Input() submitText = 'Submit';
  @Output() formSubmit = new EventEmitter();

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.maxLength(200)]),
    priority: new FormControl('medium'),
    assignedUser: new FormControl(null),
    completed: new FormControl(false)
  });

  ngOnChanges() {
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title || '',
        description: this.task.description || '',
        priority: this.task.priority || 'medium',
        assignedUser: this.task.assignedUser || null,
        completed: this.task.completed || false
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = {
        ...this.taskForm.value,
        assignedUser: this.taskForm.value.assignedUser || null
      };
      this.formSubmit.emit(formValue);
    }
  }
}