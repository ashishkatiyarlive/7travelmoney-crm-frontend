import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TravelmoneyService } from 'src/app/services/travelmoney.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  orders!: any;
  cols!: Column[];
  userData: any;

  constructor(private travelMoneyService: TravelmoneyService, private datePipe: DatePipe) { }

  ngOnInit() {
      this.getOrders();
          this.cols = [
              { field: 'name', header: 'Name' },
              { field: 'email', header: 'Email' },
              { field: 'mobile', header: 'Mobile' },
              { field: 'location', header: 'Location' },
              { field: 'inquiry_type', header: 'Inquiry Type' },
              { field: 'message', header: 'Message' },
              { field: 'created_at', header: 'Created Date' },
              { field: 'status', header: 'Status' }
          ];
  }

  getOrders() {
      this.travelMoneyService.getContactus().subscribe((data: any) => {
          if (data) {
              data.map((value: any) => {
                  value.created_at = this.datePipe.transform(value.created_at, 'dd/MM/yyyy, HH:MM');
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
