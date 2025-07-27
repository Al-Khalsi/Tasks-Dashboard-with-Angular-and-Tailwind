import { DashboardComponent } from './pages/dashboard/dashboard.component.js';
import { TaskNewComponent } from './pages/task-new/task-new.component.js';
import { TaskEditComponent } from './pages/task-edit/task-edit.component.js';

export const routes = [
  { 
    path: 'tasks', 
    component: DashboardComponent 
  },
  { 
    path: 'tasks/new', 
    component: TaskNewComponent 
  },
  { 
    path: 'tasks/:id/edit', 
    component: TaskEditComponent 
  },
  { 
    path: '', 
    redirectTo: '/tasks', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/tasks' 
  }
];