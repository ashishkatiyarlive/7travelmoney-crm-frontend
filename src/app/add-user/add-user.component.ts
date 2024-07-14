import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import{ UserService} from '../services/user.service';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

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
  rowUserId: number = 0;
  updatedUserData: any;
  editUser: boolean = false;
  constructor( private fb: FormBuilder, private userService: UserService, private messageService: MessageService, private primeNGConfig: PrimeNGConfig, private activatedRoute: ActivatedRoute, private router: Router ){
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
    this.activatedRoute.params.subscribe((params) => {
     this.rowUserId = params['id'];
    });
    if(this.rowUserId !== 0){
      this.getUserById();
      this.editUser = true;
    }
  }
  
  getUserById(){
    this.userService.getUserById(this.rowUserId).subscribe((res) => {
      console.log(res);
      this.updatedUserData = res;
      this.addUser.setValue({
        userName: this.updatedUserData.name,
        email: this.updatedUserData.email,
        password: this.updatedUserData.password,
        mobile: this.updatedUserData.phone,
        city: this.updatedUserData.city,
        state: this.updatedUserData.state,
        address: this.updatedUserData.address
      })
    })
  }

  get userData(){
    return this.addUser.controls;
  }

  submitUserForm(){
    this.submitted = true;
    const payload = {
        "name": this.addUser.controls['userName'].value,
        "email": this.addUser.controls['email'].value,
        "password": this.addUser.controls['password'].value,
        "phone": parseInt(this.addUser.controls['mobile'].value),
        "city": this.addUser.controls['city'].value,
        "state": this.addUser.controls['state'].value,
        "address": this.addUser.controls['address'].value,
        "status": true,
        "created_at": new Date()
    }
    const editpayload = {
      "name": this.addUser.controls['userName'].value,
      "email": this.addUser.controls['email'].value,
      "phone": parseInt(this.addUser.controls['mobile'].value),
      "city": this.addUser.controls['city'].value,
      "state": this.addUser.controls['state'].value,
      "address": this.addUser.controls['address'].value
  }
    if(this.editUser){
      this.userService.editUser(this.rowUserId, editpayload).subscribe((res) => {
          this.editSuccess();
          this.router.navigate(['/dashboard']);
      })
    }else{
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
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'User added successfully'});
}
editSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'User updated successfully!'});
}
clear() {
  this.messageService.clear();
}

}
