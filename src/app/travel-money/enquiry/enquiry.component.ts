import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TravelmoneyService } from 'src/app/services/travelmoney.service';
import { Table } from 'primeng/table';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css'] // ✅ Corrected from styleUrl
})
export class EnquiryComponent implements OnInit {
  orders: any[] = [];
  cols: Column[] = [];
  globalFilterFields: string[] = [];

  constructor(
    private travelMoneyService: TravelmoneyService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initializeColumns();
    this.getOrders();
  }

  initializeColumns(): void {
    this.cols = [
      { field: 'order_number', header: 'Order Number' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'address', header: 'Address' },
      { field: 'city', header: 'City' },
      { field: 'request_type', header: 'Request Type' },
      { field: 'created_at', header: 'Order Date' },
      { field: 'status', header: 'Status' }
    ];

    // ✅ Avoid expressions in HTML — prepare data in TS
    // this.globalFilterFields = this.cols.map(col => col.field);
    
  }

   
  getOrders(): void {
    this.travelMoneyService.getEnquiries().subscribe((data: any[]) => {
      if (data) {
        this.orders = data.map(item => ({
          ...item,
          created_at: this.datePipe.transform(item.created_at, 'dd/MM/yyyy, HH:mm'),
          status: this.travelMoneyService.enquiryStatus(item.status)
        }));
      }
    });
  }

  viewOrder(data: any): void {
    // TODO: Implement view dialog if needed
    console.log('Viewing order:', data);
  }

  editOrder(data: any): void {
    // TODO: Implement edit dialog if needed
    console.log('Editing order:', data);
  }

  clear(table: Table): void {
    table.clear();
  }
  onGlobalFilter(event: Event, table: Table): void {
    const input = (event.target as HTMLInputElement).value;
    table.filterGlobal(input, 'contains');
  }
}
