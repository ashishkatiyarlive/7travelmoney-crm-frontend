import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TravelmoneyService } from 'src/app/services/travelmoney.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent {
  orders!: any;
  cols!: Column[];
  userData: any;

  constructor(private travelMoneyService: TravelmoneyService, private datePipe: DatePipe) { }

  ngOnInit() {
      this.getOrders();
          this.cols = [
              { field: 'name', header: 'City Name' },
              { field: 'created_at', header: 'Created Date' },
              { field: 'updated_at', header: 'Updated Date' },
              { field: 'status', header: 'Status' }
          ];
  }

  getOrders() {
      this.travelMoneyService.getCities().subscribe((data: any) => {
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

  viewOrder(data: any) {
  }

  editOrder(data: any) {
  }

}
