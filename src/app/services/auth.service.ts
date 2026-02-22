import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/users/login`, credentials).pipe(
      tap((res) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          // store email for UI (avatar / profile)
          if (credentials?.email) localStorage.setItem('userEmail', credentials.email);
        }
      })
    );
  }

  register(payload: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.base}/users/register`, payload);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  }

  getUserEmail() {
    return localStorage.getItem('userEmail') || null;
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
