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
        <label class="block text-gray-300">Title*</label>
        <input 
          type="text" 
          formControlName="title"
          class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-400">
        <div *ngIf="taskForm.get('title').invalid && taskForm.get('title').touched" 
             class="text-red-400 text-sm mt-1">
          Title is required
        </div>
      </div>
      
      <div>
        <label class="block text-gray-300">Description</label>
        <textarea 
          formControlName="description"
          class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"></textarea>
      </div>
      
      <div>
        <label class="block text-gray-300">Priority</label>
        <select 
          formControlName="priority"
          class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="high">High</option>
          <option value="medium" selected>Medium</option>
          <option value="low">Low</option>
          <option value="none">None</option>
        </select>
      </div>
      
      <div>
        <label class="block text-gray-300">Assigned User</label>
        <select 
          formControlName="assignedUser"
          class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option [ngValue]="null">Unassigned</option>
          <option *ngFor="let user of users" [ngValue]="user">
            {{ user.name }}
          </option>
        </select>
      </div>
      
      <div class="flex items-center">
        <input 
          type="checkbox" 
          id="completed"
          formControlName="completed"
          class="mr-2 h-5 w-5 text-blue-400 rounded bg-gray-800 border-gray-700
                 focus:ring-blue-400 focus:ring-2">
        <label for="completed" class="text-gray-300">Completed</label>
      </div>
      
      <button 
        type="submit" 
        [disabled]="taskForm.invalid"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 
               disabled:bg-gray-700 disabled:text-gray-500 transition-colors
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
        {{ submitText }}
      </button>
    </form>
  `
})
export class TaskFormComponent {
  @Input() task = null;
  @Input() users = [];
  @Input() submitText = 'Submit';
  @Output() formSubmit = new EventEmitter();

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    priority: new FormControl('medium'),
    assignedUser: new FormControl(null),
    completed: new FormControl(false)
  });

  ngOnChanges() {
    if (this.task) {
      this.taskForm.patchValue({
        ...this.task,
        priority: this.task.priority || 'medium'
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.formSubmit.emit(this.taskForm.value);
    }
  }
}