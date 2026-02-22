import { Routes } from '@angular/router';
import { BreedsComponent } from './components/breeds/breeds.component';
import { BreedsTableComponent } from './components/breeds-table/breeds-table.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'breeds', component: BreedsComponent, canActivate: [AuthGuard] },
	{ path: 'table', component: BreedsTableComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '' }
];
