import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookedCurrencyDialogComponent } from '../booked-currency-dialog/booked-currency-dialog.component';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-currency-listing',
  templateUrl: './currency-listing.component.html',
  styleUrl: './currency-listing.component.css',
  providers: [DialogService]
})
export class CurrencyListingComponent implements OnInit, OnDestroy {
  currencies!: any;

    cols!: Column[];
    userData: any;

    currrencySubscription:Subscription = new Subscription()

    constructor(private currencyService: CurrencyService, 
      private datePipe: DatePipe, private router: Router, private dialogService: DialogService) {}

    ngOnInit() {
      let data: any = localStorage.getItem('currentUser');
      this.userData = JSON.parse(data);

        this.currrencySubscription = this.currencyService.getCurrencies().subscribe(data => {
            if (data) {
                data.map((value: any) => {
                    value.updatedDate = this.datePipe.transform(value.updated_at, 'dd/MM/yyyy, HH:MM');
                    return value;
                })
              this.currencies = data;
            }
          });

         
          if(this.userData.role === 'Admin') {
            this.cols = [
                { field: 'symbol', header: 'Currency Symbol' },
                { field: 'name', header: 'Currency Name' },
                { field: 'rate', header: 'Buy Rate' },
                { field: 'status', header: 'Status' },
                { field: 'updatedDate', header: 'Updated Date' }
            ];
          } else {
            this.cols = [
              { field: 'symbol', header: 'Currency Symbol' },
              { field: 'name', header: 'Currency Name' },
              { field: 'rate', header: 'Buy Rate' },
              { field: 'updatedDate', header: 'Updated Date' }
            ];
          }
    }
    addCurrency(){
      this.router.navigate(['add-currency']);
    }

    editCurrency(data: any){
      const currencyId = data.id;
      this.router.navigate(['/add-currency', currencyId ]);

    }

    bookedCurrency(data: any) {
      const ref: DynamicDialogRef  = this.dialogService.open(BookedCurrencyDialogComponent, {
        header: 'Book your currency',
        width: '70%',
        data: data
      });
      ref.onClose.subscribe((submittedData: any) => {
        if (submittedData) {
          console.log('Data returned from dialog:', submittedData);
          // Handle returned data here
          this.router.navigate(['/booked-currency']);
        } else {
          console.log('close dialog');
        }
      });
    }
  
    ngOnDestroy(): void {
      this.currrencySubscription.unsubscribe();
      
    }

}
