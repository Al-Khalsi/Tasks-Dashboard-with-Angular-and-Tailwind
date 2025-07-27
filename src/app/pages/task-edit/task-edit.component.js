import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { TaskFormComponent } from '../../../components/task-form/task-form.component';

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

  constructor(taskService, route, router) {
    this.taskService = taskService;
    this.route = route;
    this.router = router;
  }

  async ngOnInit() {
    this.users = await this.taskService.fetchUsers();
    const taskId = this.route.snapshot.paramMap.get('id');
    this.task = this.taskService.getTaskById(taskId);
    
    if (!this.task) {
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit(updatedTask) {
    this.taskService.updateTask(this.task.id, updatedTask);
    this.router.navigate(['/tasks']);
  }
}