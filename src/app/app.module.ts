import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { AddUserComponent } from './add-user/add-user.component';
import { OrderListingComponent } from './order-listing/order-listing.component';
import { CurrencyListingComponent } from './currency-listing/currency-listing.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListingComponent } from './user-listing/user-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserComponent,
    OrderListingComponent,
    CurrencyListingComponent,
    UserDashboardComponent,
    UserListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
