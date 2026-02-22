import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private notify: NotificationService) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) return true;
    // clear local session, notify and redirect to login
    this.auth.logout();
    this.notify.info('Acceso denegado — por favor inicia sesión');
    this.router.navigate(['/login']);
    return false;
  }
}
