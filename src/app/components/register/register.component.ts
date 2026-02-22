import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private notify: NotificationService, private router: Router) {}

  submit(e: Event) {
    e.preventDefault();
    this.auth.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.notify.success('Registro exitoso. Por favor ingresa.');
        this.router.navigate(['/login']);
      },
      error: () => this.notify.error('Registro fallido')
    });
  }
}
