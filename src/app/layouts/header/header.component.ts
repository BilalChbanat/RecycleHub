import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  showDropdown: boolean = false; // Control dropdown visibility
  currentUser: any = null; // Store current user data

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser(); // Get current user data
  }

  authenticated() {
    return this.authService.isLoggedIn();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown; // Toggle dropdown visibility
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  onProfile() {
    this.router.navigate(['/profile']); // Navigate to profile page
  }
}
