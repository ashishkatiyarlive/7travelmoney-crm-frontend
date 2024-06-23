import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { CurrencyListingComponent } from './currency-listing/currency-listing.component';
import { OrderListingComponent } from './order-listing/order-listing.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: UserDashboardComponent},
  {path:'user-listing', component: UserListingComponent},
  {path: 'currency-listing', component: CurrencyListingComponent},
  {path: 'order-listing', component: OrderListingComponent},
  {path: 'add-user', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
