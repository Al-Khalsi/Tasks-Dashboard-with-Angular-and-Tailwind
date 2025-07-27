import { DashboardComponent } from './pages/dashboard/dashboard.component.js';
import { TaskNewComponent } from './pages/task-new/task-new.component.js';
import { TaskEditComponent } from './pages/task-edit/task-edit.component.js';
import { authGuard } from '../middleware/auth.guard.js';

export const routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/authentication/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/authentication/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'tasks/new',
    loadComponent: () => import('./pages/task-new/task-new.component').then(m => m.TaskNewComponent),
    canActivate: [authGuard]
  },
  {
    path: 'tasks/:id/edit',
    loadComponent: () => import('./pages/task-edit/task-edit.component').then(m => m.TaskEditComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];