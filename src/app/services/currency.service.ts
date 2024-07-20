import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiUrl = environment.base_url;

  constructor(private http: HttpClient, private authService: AuthService) {
   }

  getCurrencies() {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/currencies`, { headers });
  }

  addCurrency(data: any) : Observable<any> {
    // Include authorization header with Bearer token in the request
    const headers = this.authService.getAuthorizationHeader();
    // console.log('headers', headers);
    // debugger;
    return this.http.post<any>(`${this.apiUrl}/currencies`, data, { headers })
    .pipe(
      tap(response => {
        // Assuming your API returns a token upon successful login
        console.log(response, 'response')
      }),
      catchError(error => {
        console.error('Error currency not added', error);
        return of(false); // Return observable of false on error
      })
    );
  }

  editCurrency(Id:number, payload: any) : Observable<any> {
    const headers = this.authService.getAuthorizationHeader();
    //const payload = {body};
    return this.http.put<any>(`${this.apiUrl}/currencies/${Id}`, payload, { headers });
  }

  getCurrencyById(Id:number) {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/currencies/${Id}`, { headers });
  }

}
