import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {ProfileComponent} from './auth/profile/profile.component';
import {CollectionRequestComponent} from './collection-request/collection-request.component';
import {CollecteurComponent} from './collecteur/collecteur.component';

export const routes: Routes = [

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'collection-request', component: CollectionRequestComponent },
  { path: 'collection', component: CollecteurComponent },

];
