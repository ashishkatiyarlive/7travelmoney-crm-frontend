import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import Validation from './utils/validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    
  }
  

  onSubmit() {
    if (this.loginForm.valid) {
      // console.log('Form Submitted!');
      // console.log('Email:', this.loginForm.value.email);
      // console.log('Password:', this.loginForm.value.password);
      // You can add your authentication logic here
    } else {
      console.error('Form is invalid');
    }
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  touched = false;

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  login(){
    this.router.navigate(['/user-dashboard']);
  }
}
