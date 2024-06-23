import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.base_url;
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Retrieve token from localStorage if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.token = currentUser.token || null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        tap(response => {
          // Assuming your API returns a token upon successful login
          this.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify({ email, token: this.token }));
        }),
        catchError(error => {
          console.error('Error logging in', error);
          return of(false); // Return observable of false on error
        })
      );
  }

  logout(): void {
    // Clear authentication details from local storage and reset token
    localStorage.removeItem('currentUser');
    this.token = null;
  }

  isLoggedIn(): boolean {
    // Check if user is logged in by verifying presence of authentication details
    return !!this.token;
  }

  getAuthorizationHeader(): HttpHeaders {
    // Create authorization header with Bearer token
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

}
