import { Component } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { DatePipe } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-currency-listing',
  templateUrl: './currency-listing.component.html',
  styleUrl: './currency-listing.component.css'
})
export class CurrencyListingComponent {
  currencies!: any;

    cols!: Column[];
    userData: any;

    constructor(private currencyService: CurrencyService, private datePipe: DatePipe) {}

    ngOnInit() {
      let data: any = localStorage.getItem('currentUser');
      this.userData = JSON.parse(data);
        this.currencyService.getCurrencies().subscribe(data => {
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
                { field: 'symbol', header: 'Symbol' },
                { field: 'name', header: 'Name' },
                { field: 'rate', header: 'Buy Rate' },
                { field: 'status', header: 'Status' },
                { field: 'updatedDate', header: 'Updated Date' }
            ];
          } else {
            this.cols = [
              { field: 'symbol', header: 'Symbol' },
              { field: 'name', header: 'Name' },
              { field: 'rate', header: 'Buy Rate' },
              { field: 'updatedDate', header: 'Updated Date' }
            ];
          }
    }
    

}
