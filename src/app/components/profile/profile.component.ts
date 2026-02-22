import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  email: string | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.email = this.auth.getUserEmail();
    this.user = token ? { email: this.email ?? 'usuario@demo' } : null;
  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
