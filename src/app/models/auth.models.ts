export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: AuthUser;
}

export interface AuthUser {
  id?: string;
  email: string;
  name?: string;
}
