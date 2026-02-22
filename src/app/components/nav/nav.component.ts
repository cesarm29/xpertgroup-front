import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
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
    const e = this.auth.getUserEmail() || '';
    return e ? e.charAt(0).toUpperCase() : 'U';
  }

  goToProfile() {
    this.profileMenu.set(false);
    this.router.navigate(['/profile']);
  }
}
