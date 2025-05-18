import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  constructor(private formBuilder: FormBuilder,
     private router: Router, 
     private authService: AuthService) {
  }

  ngOnInit(): void{
  }

  onLogin(): void {
      this.authService.login(this.email, this.password)
      .subscribe(success => {
        if (success) {
          // Navigate to home page or perform desired actions on successful login
          console.log('Login successful');
          this.login();
        } else {
          // Handle login failure
          this.loginError = true;
        }
      });
  }
 
  login(){
    let userData: any = localStorage.getItem('currentUser');
    userData = JSON.parse(userData);
    if(userData.role === 'AdminCRM')
      this.router.navigate(['/dashboard']);
    else if(userData.role === 'Admin')
      this.router.navigate(['/travel-money']);
    else
      this.router.navigate(['/best-buy']);
  }

  onLogout(): void {
    localStorage.clear();
    this.authService.logout();
    // Perform additional logout actions (e.g., navigate to login page)
    console.log('Logged out');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
