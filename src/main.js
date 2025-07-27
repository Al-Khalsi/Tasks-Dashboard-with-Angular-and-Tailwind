import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component.js';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes.js';
import { TaskService } from './services/task.service.js';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    TaskService
  ]
}).catch(err => console.error(err));