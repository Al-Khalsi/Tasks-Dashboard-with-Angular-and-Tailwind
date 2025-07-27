import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  template: `
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label class="block">Title*</label>
        <input 
          type="text" 
          formControlName="title"
          class="w-full p-2 border rounded">
        <div *ngIf="taskForm.get('title').invalid && taskForm.get('title').touched" 
             class="text-red-500 text-sm">
          Title is required
        </div>
      </div>
      
      <div>
        <label class="block">Description</label>
        <textarea 
          formControlName="description"
          class="w-full p-2 border rounded"></textarea>
      </div>
      
      <div>
        <label class="block">Assigned User</label>
        <select 
          formControlName="assignedUser"
          class="w-full p-2 border rounded">
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
          class="mr-2">
        <label for="completed">Completed</label>
      </div>
      
      <button 
        type="submit" 
        [disabled]="taskForm.invalid"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400">
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
    assignedUser: new FormControl(null),
    completed: new FormControl(false)
  });

  ngOnChanges() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.formSubmit.emit(this.taskForm.value);
    }
  }
}