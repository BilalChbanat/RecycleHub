import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObjects: any = {
    email: '',
    password: '',
  };

  loginFormSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  onLogin() {
    this.loginFormSubmitted = true;

    if (this.loginObjects.email && this.loginObjects.password) {
      this.authService.login(this.loginObjects).subscribe({
        next: () => {
          console.log('Login successful');
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = err.message || 'Invalid email or password';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }

  onSignUp() {
    this.router.navigate(['/register']);
  }
}
