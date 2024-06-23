import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentDate: any;
  userInfo: any;
  isShownavbar: boolean = false
  constructor( private router: Router, private datePipe: DatePipe, private userService: UserService, private authService: AuthService){
    this.currentDate = this.datePipe.transform(new Date(), 'E, dd MMM yyyy, HH:MM');
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.userInfo()
      .subscribe(data => {
        if (data) {
          this.userInfo = data;
          // Navigate to home page or perform desired actions on successful login
          console.log('Login successful');
        }
      });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  shownavbar(){
    this.isShownavbar = !this.isShownavbar;
  }
}

