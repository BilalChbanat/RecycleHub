import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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

  constructor() {}

  ngOnInit() {}

  onSginUp() {
    this.signUpObjects.push(this.signUpObjects);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    this.signUpObjects = {
      userName: '',
      email: '',
      address: '',
      telephone: '',
      DateOfBirth: '',
      password: '',
    };
  }
}
