import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelMoneyRoutingModule } from './travel-money-routing.module';
import { TravelMoneyComponent } from './travel-money.component';
import { SharedModule } from '../shared/shared.module';
import { CitiesComponent } from './cities/cities.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SettingsComponent } from './settings/settings.component';
import { IconField } from 'primeng/iconfield';

@NgModule({
  declarations: [
    TravelMoneyComponent,
    CitiesComponent,
    ContactusComponent,
    CurrenciesComponent,
    EnquiryComponent,
    FaqsComponent,
    FeedbackComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    TravelMoneyRoutingModule,
    SharedModule,
   // IconField
  ],
  exports: [
   // IconField
  ]
})
export class TravelMoneyModule { }
