import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  // postData(data: any): Observable<any> {
  //   // Include authorization header with Bearer token in the request
  //   const headers = this.authService.getAuthorizationHeader();
  //   return this.http.post<any>(`${this.apiUrl}/data`, data, { headers });
  // }

  userInfo() {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/users/me`, { headers });
  }

  getUsers() {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/users`, { headers });
  }

}
