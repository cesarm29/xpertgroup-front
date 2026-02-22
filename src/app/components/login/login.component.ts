import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private notify: NotificationService) {}

  submit(e: Event) {
    e.preventDefault();
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.notify.success('Inicio de sesión correcto');
        this.router.navigate(['/home']);
      },
      error: () => this.notify.error('Login failed')
    });
  }
}
