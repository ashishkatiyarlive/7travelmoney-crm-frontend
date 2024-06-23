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
    this.router.navigate(['/dashboard']);
  }

  onLogout(): void {
    this.authService.logout();
    // Perform additional logout actions (e.g., navigate to login page)
    console.log('Logged out');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
