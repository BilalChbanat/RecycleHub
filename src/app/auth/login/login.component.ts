import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupUsers: any[] = [];
  signUpObjects: any = {
    userName: '',
    email: '',
    address: '',
    telephone: '',
    DateOfBirth: '',
    password: '',
  };

  loginObjects: any = {
    email: '',
    password: '',
  };

  loginFormSubmitted: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    const storedUsers = localStorage.getItem('signupUsers');
    if (storedUsers) {
      this.signupUsers = JSON.parse(storedUsers);
    }
  }

  onSignUp() {
    this.signupUsers.push({...this.signUpObjects});

    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));

    this.signUpObjects = {
      userName: '',
      email: '',
      address: '',
      telephone: '',
      DateOfBirth: '',
      password: '',
    };

    alert('Registration successful!');
  }

  onLogin() {
    this.loginFormSubmitted = true;

    const isUserExist = this.signupUsers.find(
      (user) =>
        user.email === this.loginObjects.email &&
        user.password === this.loginObjects.password
    );

    if (isUserExist) {
      const currentUser = isUserExist.loginObjects;
      console.log('currentUser', currentUser);
        localStorage.setItem('isUserLoggedIn', 'true');

      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid email or password');
    }
  }
}
