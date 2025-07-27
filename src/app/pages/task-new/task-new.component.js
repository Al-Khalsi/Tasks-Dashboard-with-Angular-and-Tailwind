import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { TaskFormComponent } from '../../../components/task-form/task-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TaskFormComponent],
  selector: 'app-task-new',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">New Task</h1>
      
      <app-task-form 
        [users]="users"
        submitText="Create Task"
        (formSubmit)="onSubmit($event)">
      </app-task-form>
    </div>
  `
})
export class TaskNewComponent {
  users = [];

  taskService = inject(TaskService);
  router = inject(Router);

  async ngOnInit() {
    this.users = await this.taskService.fetchUsers();
  }

  onSubmit(taskData) {
    const newTask = this.taskService.addTask(taskData);
    this.router.navigate(['/tasks']);
  }
}