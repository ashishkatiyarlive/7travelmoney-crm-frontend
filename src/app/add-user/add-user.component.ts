import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  addUser!: FormGroup;
  submitted = false;
  constructor( private fb: FormBuilder){
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
    })
  }

  get userData(){
    return this.addUser.controls;
  }

  submitUserForm(){
    this.submitted = true;
    console.log(this.addUser.value)

  }

}
