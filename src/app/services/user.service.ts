import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.base_url;

  constructor(private http: HttpClient, private authService: AuthService) {
   }

  //  getData(): Observable<any> {
  //   // Include authorization header with Bearer token in the request
  //   const headers = this.authService.getAuthorizationHeader();
  //   return this.http.get<any>(`${this.apiUrl}/data`, { headers });
  // }

  postData(data: any) : Observable<any> {
    // Include authorization header with Bearer token in the request
    const headers = this.authService.getAuthorizationHeader();
    // console.log('headers', headers);
    // debugger;
    return this.http.post<any>(`${this.apiUrl}/users/signup`, data, { headers })
    .pipe(
      tap(response => {
        // Assuming your API returns a token upon successful login
        console.log(response, 'response')
      }),
      catchError(error => {
        console.error('Error User not added', error);
        return of(false); // Return observable of false on error
      })
    );
  }

  userInfo() {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/users/me`, { headers });
  }

  deleteUser(Id:number, status: boolean) : Observable<any> {
    const headers = this.authService.getAuthorizationHeader();
    const payload = {'status': status};
    return this.http.patch<any>(`${this.apiUrl}/users/${Id}`, payload, { headers });
  }

  getUsers() {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/users`, { headers });
  }

}
