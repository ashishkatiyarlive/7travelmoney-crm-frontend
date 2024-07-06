import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import{ UserService} from '../services/user.service';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  providers: [MessageService]
})
export class AddUserComponent implements OnInit {
  addUser!: FormGroup;
  submitted = false;
  loginError: boolean = false;
  constructor( private fb: FormBuilder, private userService: UserService, private messageService: MessageService, private primeNGConfig: PrimeNGConfig ){
  }

  ngOnInit(){
    this.addUser = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required], 
      address: ['', Validators.required]
    });

    this.primeNGConfig.ripple = true;
  }

  get userData(){
    return this.addUser.controls;
  }

  submitUserForm(){
    this.submitted = true;
    const payload = {
        "name": this.addUser.controls['userName'].value,
        "email": this.addUser.controls['email'].value,
        "password": this.addUser.controls['email'].value,
        "phone": parseInt(this.addUser.controls['mobile'].value),
        "city": this.addUser.controls['city'].value,
        "state": this.addUser.controls['state'].value,
        "address": this.addUser.controls['address'].value,
        "status": true,
        "created_at": new Date()
    }
    this.userService.postData(payload)
      .subscribe(success => {
        if (success) {
          // Navigate to home page or perform desired actions on successful login
          this.showSuccess();
        //  debugger;
          this.addUser.reset();
        } else {
          // Handle login failure
          this.loginError = true;
        }
      });

  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'User added successfully'});
}

clear() {
  this.messageService.clear();
}

}
