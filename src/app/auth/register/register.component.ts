import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formSubmitted: boolean = false;
  signupUsers: any[] = [];

  signUpObjects: any = {
    userName: '',
    email: '',
    address: '',
    telephone: '',
    DateOfBirth: '',
    password: '',
  };

  ngOnInit() {
    const storedUsers = localStorage.getItem('signupUsers');
    if (storedUsers) {
      this.signupUsers = JSON.parse(storedUsers);
    }
  }

  onSignUp() {
    this.formSubmitted = true;

    if (this.signUpObjects.userName && this.signUpObjects.email && this.signUpObjects.address &&
      this.signUpObjects.telephone && this.signUpObjects.DateOfBirth && this.signUpObjects.password) {

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
      this.formSubmitted = false;
    }
  }
}
