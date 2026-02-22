import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('front-tailwind');

  profileMenu = signal(false);

  constructor(private auth: AuthService, private router: Router, private notify: NotificationService) {}

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
    this.notify.info('Sesión cerrada');
    this.router.navigate(['/login']);
  }

  showNav() {
    const url = this.router.url || '';
    const isAuthPage = url.startsWith('/login') || url.startsWith('/register');
    return this.isAuthenticated() && !isAuthPage;
  }

  toggleProfileMenu() {
    this.profileMenu.update(v => !v);
  }

  userInitial() {
    const e = localStorage.getItem('userEmail') || '';
    return e ? e.charAt(0).toUpperCase() : 'U';
  }
}
