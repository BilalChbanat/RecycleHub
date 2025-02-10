import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {ProfileComponent} from './auth/profile/profile.component';
import {CollectionRequestComponent} from './collection-request/collection-request.component';
import {CollecteurComponent} from './collecteur/collecteur.component';
import {notLogedInGuard} from './guards/notLogedIn/not-loged-in.guard';
import {isLogedinGuard} from './guards/isLogedin/is-logedin.guard';

export const routes: Routes = [

  {path: 'register', component: RegisterComponent, canActivate: [notLogedInGuard]},
  {path: 'login', component: LoginComponent, canActivate: [notLogedInGuard]},
  {path: '', component: HomeComponent},
  { path: 'profile', component: ProfileComponent , canActivate: [notLogedInGuard] },
  { path: 'collection-request', component: CollectionRequestComponent , canActivate: [isLogedinGuard]},
  { path: 'collection', component: CollecteurComponent , canActivate: [isLogedinGuard] },

];
