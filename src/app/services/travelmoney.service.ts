import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelmoneyService {

  private apiUrl = environment.base_url_travel;

  constructor(private http: HttpClient, private authService: AuthService) {
   }
  
  getEnquiries() {
    const headers = this.authService.getAuthorizationHeader();
    const filter: any = JSON.stringify({
      "offset": 0,
      "limit": 100,
      "skip": 0,
      "order": "id DESC",
      "where": {
        "additionalProp1": {}
      }
    })
    return this.http.get<any>(`${this.apiUrl}/enquiry?filter=${filter}`, {headers});
  }

  getContactus() {
    const headers = this.authService.getAuthorizationHeader();
    const filter: any = JSON.stringify({
      "offset": 0,
      "limit": 100,
      "skip": 0,
      "order": "id DESC",
      "where": {
        "additionalProp1": {}
      }
    })
    return this.http.get<any>(`${this.apiUrl}/contactus?filter=${filter}`, {headers});
  }

  getCities() {
    const headers = this.authService.getAuthorizationHeader();
    const filter: any = JSON.stringify({
      "offset": 0,
      "limit": 100,
      "skip": 0,
      "order": "name DESC",
      "where": {
        "additionalProp1": {}
      }
    })
    return this.http.get<any>(`${this.apiUrl}/cities?filter=${filter}`, {headers});
  }

  getCurrencies() {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/currencies`, {headers});
  }

  fetchCurrencies() {
   // const headers = this.authService.getAuthorizationHeader();
    return this.http.post<any>(`${this.apiUrl}/currencies/exchange-rates`,{});
  }

  enquiryStatus(status: number) {
    if (status === 0) {
        return 'Pending';
    } else if (status === 1) {
        return 'Confirm';
    } else if (status === 2) {
        return 'In-Progress';
    } else if (status === 3) {
        return 'Accept';
    } else if (status === 4) {
        return 'Hold';
    } else if (status === 5) {
        return 'Ready';
    } else if (status === 6) {
        return 'Completed';
    } else if (status === 7) {
        return 'Cancel';
    } else {
        return 'Fake';
    }
  }
}
