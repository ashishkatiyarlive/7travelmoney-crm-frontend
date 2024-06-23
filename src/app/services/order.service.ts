import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.base_url;

  constructor(private http: HttpClient, private authService: AuthService) {
   }

  getOrders() {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/orders`, { headers });
  }
}
