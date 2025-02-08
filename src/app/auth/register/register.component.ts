import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth/auth-service.service';

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
    role: 'particulier',
    password: '',
    photo: '',
    points: 0,
  };

  formSubmitted: boolean = false;
  errorMessage: string = '';
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private authService: AuthServiceService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  onSignUp() {
    this.formSubmitted = true;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.signUpObjects.photo = reader.result?.toString();
        this.completeRegistration();
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.completeRegistration();
    }
  }

  private completeRegistration() {
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
          this.resetForm();
        },
        error: (err) => {
          console.error('Registration failed:', err);
          this.handleError(err);
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }

  private resetForm() {
    this.signUpObjects = {
      userName: '',
      email: '',
      address: '',
      telephone: '',
      DateOfBirth: '',
      role: 'particulier',
      password: '',
      photo: ''
    };
    this.previewImage = null;
    this.selectedFile = null;
    this.formSubmitted = false;
    this.errorMessage = '';
  }

  private handleError(err: any) {
    this.errorMessage = err.status === 404
      ? 'Server not found. Please check the API URL.'
      : 'Registration failed. Please try again.';
  }
}
