import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData).pipe(
      switchMap((response: any) => {
        console.log('Registration successful', response);
        return this.login({ email: userData.email, password: userData.password }).pipe(
          tap(() => this.router.navigate(['/']))
        );
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((users) => {
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          console.log('Login successful', user);
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Invalid credentials');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
