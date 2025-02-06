import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  loginObjects: any = {
    email: '',
    password: '',
  };

  loginFormSubmitted: boolean = false;

  constructor(private router: Router) {}

  onLogin() {
    this.loginFormSubmitted = true;

    if (this.loginObjects.email && this.loginObjects.password) {
      console.log('Login successful', this.loginObjects);

      this.router.navigate(['/dashboard']);
    } else {
      console.log('Please fill in all fields');
    }
  }

  onSignUp() {
    this.router.navigate(['/register']);
  }
}
