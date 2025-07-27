import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service.js';
import { TaskFormComponent } from '../../../components/task-form/task-form.component.js';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TaskFormComponent],
  selector: 'app-task-edit',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Edit Task</h1>
      
      <app-task-form 
        [task]="task"
        [users]="users"
        submitText="Update Task"
        (formSubmit)="onSubmit($event)">
      </app-task-form>
    </div>
  `
})
export class TaskEditComponent {
  task = null;
  users = [];

  TaskService = inject(TaskService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  async ngOnInit() {
    this.users = await this.TaskService.fetchUsers();
    const taskId = this.route.snapshot.paramMap.get('id');
    this.task = this.TaskService.getTaskById(taskId);
    
    if (!this.task) {
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit(updatedTask) {
    this.TaskService.updateTask(this.task.id, updatedTask);
    this.router.navigate(['/tasks']);
  }
}