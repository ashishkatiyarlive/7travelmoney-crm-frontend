import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelMoneyComponent } from './travel-money.component';
import { CitiesComponent } from './cities/cities.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{ path: '', component: TravelMoneyComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'currencies', component: CurrenciesComponent },
  { path: 'enquiry', component: EnquiryComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelMoneyRoutingModule { }
