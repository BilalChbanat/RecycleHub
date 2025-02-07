import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, tap, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient, private router: Router) {
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData).pipe(
      switchMap((response: any) => {
        console.log('Registration successful', response);
        return this.login({
          email: userData.email,
          password: userData.password
        }).pipe(
          tap(() => this.router.navigate(['/']))
        );
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`
    ).pipe(
      tap((users) => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/']);
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put(url, user);
  }


  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
