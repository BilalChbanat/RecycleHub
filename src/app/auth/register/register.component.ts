import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service'; // Import AuthService

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  signUpObjects: any = {
    userName: '',
    email: '',
    address: '',
    telephone: '',
    DateOfBirth: '',
    password: '',
  };

  formSubmitted: boolean = false;
  errorMessage: string = ''; // To store error messages

  constructor(private authService: AuthServiceService) {} // Inject AuthService

  onSignUp() {
    this.formSubmitted = true;

    if (
      this.signUpObjects.userName &&
      this.signUpObjects.email &&
      this.signUpObjects.address &&
      this.signUpObjects.telephone &&
      this.signUpObjects.DateOfBirth &&
      this.signUpObjects.password
    ) {

      this.authService.register(this.signUpObjects).subscribe({

        next: (response) => {
          console.log('Registration successful', response);

          this.signUpObjects = {
            userName: '',
            email: '',
            address: '',
            telephone: '',
            DateOfBirth: '',
            password: '',
          };

          this.formSubmitted = false;
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Registration failed:', err);
          this.errorMessage = err.status === 404
            ? 'Server not found. Please check the API URL.'
            : 'Registration failed. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }

}
