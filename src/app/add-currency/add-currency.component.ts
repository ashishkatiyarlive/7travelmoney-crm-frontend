import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-add-currency',
  standalone: false,
  templateUrl: './add-currency.component.html',
  styleUrl: './add-currency.component.css',
  providers: [MessageService]
})
export class AddCurrencyComponent {

  AddCurrency!: FormGroup;
  submitted = false;
  loginError: boolean = false;
  AddCurrencyId: number = 0;
  updatedCurrencyData: any;
  editCurrency: boolean = false;
  constructor( private fb: FormBuilder, private currencyService: CurrencyService, private messageService: MessageService, private primeNGConfig: PrimeNGConfig, private activatedRoute: ActivatedRoute, private router: Router ){
  }

  ngOnInit(){
    this.AddCurrency = this.fb.group({
      currencyName: ['', Validators.required],
      currencySymbol: ['', Validators.required],
      currenntRate: ['', Validators.required],
    });

    this.primeNGConfig.ripple = true;
    this.activatedRoute.params.subscribe((params) => {
     this.AddCurrencyId = params['id'];
     console.log(this.AddCurrencyId, 'this.AddCurrencyId');
    });
    if(this.AddCurrencyId){
      this.getUserById();
      this.editCurrency = true;
      console.log(this.editCurrency, 'editCurrency');
    }
  }
  
  getUserById(){
    this.currencyService.getCurrencyById(this.AddCurrencyId).subscribe((res) => {
      console.log(res);
      this.updatedCurrencyData = res;
      this.AddCurrency.setValue({
        currencyName: this.updatedCurrencyData.name,
        currencySymbol: this.updatedCurrencyData.symbol,
        currenntRate: this.updatedCurrencyData.rate,
      })
    })
  }

  get currencyData(){
    return this.AddCurrency.controls;
  }

  submitUserForm(){
    this.submitted = true;
    const payload = {
        "name": this.AddCurrency.controls['currencyName'].value,
        "symbol": this.AddCurrency.controls['currencySymbol'].value,
        "rate": parseInt(this.AddCurrency.controls['currenntRate'].value),
        "status": true,
        "priority": 0,
        "created_at": new Date()
    }
    const editpayload = {
      "name": this.AddCurrency.controls['currencyName'].value,
      "symbol": this.AddCurrency.controls['currencySymbol'].value,
      "rate": parseInt(this.AddCurrency.controls['currenntRate'].value),
      "status": true,
      "priority": 0,
      "updated_at": new Date()
  }
    if(this.editCurrency){
      this.currencyService.editCurrency(this.AddCurrencyId, editpayload).subscribe((res) => {
          this.editSuccess();
          this.router.navigate(['/best-buy']);
      })
    }else{
    this.currencyService.addCurrency(payload)
      .subscribe(success => {
        if (success) {
          // Navigate to home page or perform desired actions on successful login
          this.showSuccess();
        //  debugger;
          this.AddCurrency.reset();
          this.router.navigate(['/best-buy']);
        } else {
          // Handle login failure
          this.loginError = true;
        }
      });
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Currency added successfully'});
}
editSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Currency updated successfully!'});
}
clear() {
  this.messageService.clear();
}

resetCurrency(){
  this.AddCurrency.reset();
}

}
