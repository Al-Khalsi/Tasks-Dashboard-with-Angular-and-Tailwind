import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  template: ''
})
export class LogoutComponent {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}