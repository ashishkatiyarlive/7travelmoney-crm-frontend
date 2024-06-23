import { Component } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

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

    constructor(private currencyService: CurrencyService) {}

    ngOnInit() {
        this.currencyService.getCurrencies().subscribe(data => {
            if (data) {
              this.currencies = data;
            }
          });

        this.cols = [
            { field: 'symbol', header: 'Symbol' },
            { field: 'name', header: 'Name' },
            { field: 'rate', header: 'Buy Rate' },
            { field: 'status', header: 'Status' },
            { field: 'updated_at', header: 'Updated Date' }
        ];
    }
    

}
