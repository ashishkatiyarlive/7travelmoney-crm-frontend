import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TravelmoneyService } from 'src/app/services/travelmoney.service';
import { firstValueFrom } from 'rxjs';
import { Table } from 'primeng/table';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.css'
})
export class CurrenciesComponent {
  orders!: any;
  cols!: Column[];
  userData: any;
  searchValue: any = '';

  constructor(private travelMoneyService: TravelmoneyService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getCurrencies();
    this.cols = [
      { field: 'name', header: 'Currency' },
      { field: 'symbol', header: 'Symbol' },
      { field: 'rate', header: 'Rate' },
      { field: 'buy_rate', header: 'Buy Rate' },
      { field: 'sell_rate', header: 'Sell Rate' },
      { field: 'priority', header: 'Priority' },
      { field: 'created_at', header: 'Created Date' },
      { field: 'updated_at', header: 'Updated Date' },
      { field: 'status', header: 'Status' }
    ];
  }

  getCurrencies() {
    this.travelMoneyService.getCurrencies().subscribe((data: any) => {
      if (data) {
        data.map((value: any) => {
          value.created_at = this.datePipe.transform(value.created_at, 'dd/MM/yyyy, HH:MM');
          value.updated_at = this.datePipe.transform(value.updated_at, 'dd/MM/yyyy, HH:MM');
          return value;
        })
        this.orders = data;
      }
    });
  }

 async updateCurrencies() {
    await firstValueFrom(this.travelMoneyService.fetchCurrencies());
    this.getCurrencies();
  }

  viewOrder(data: any) {
  }

  editOrder(data: any) {
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
}
}
