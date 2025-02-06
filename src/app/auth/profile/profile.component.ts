import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from '../auth-service.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,  // If using standalone components
  imports: [NgIf, FormsModule]
})
export class ProfileComponent implements OnInit {
  currentUser: any = null;
  editMode: boolean = false;
  users: any[] = [];

  constructor(private authService: AuthServiceService, private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }


  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onSave() {
    this.authService.updateUser(this.currentUser).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        this.editMode = false;

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
      },
    });
  }

  onDelete() {
    if (!this.currentUser) return;

    this.authService.getAllUsers().subscribe((data) => {

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === this.currentUser.id) {
          data[i] = this.currentUser;
          data[i].email = '';
          data[i].password = '';
          data[i].userName = '';
          data[i].DateOfBirth = '';
          data[i].photo = '';
          data[i].address = '';
          data[i].telephone = '';
          data[i].role = '';
        }
      }

    });
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
