import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TravelmoneyService } from 'src/app/services/travelmoney.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent {
  orders!: any;
  cols!: Column[];
  userData: any;

  constructor(private travelMoneyService: TravelmoneyService, private datePipe: DatePipe) { }

  ngOnInit() {
      this.getOrders();
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
  }

  getOrders() {
      this.travelMoneyService.getEnquiries().subscribe((data: any) => {
          if (data) {
              data.map((value: any) => {
                  value.created_at = this.datePipe.transform(value.created_at, 'dd/MM/yyyy, HH:MM');
                  value.status = this.travelMoneyService.enquiryStatus(value.status);
                  return value;
              })
              this.orders = data;
          }
      });
  }

  viewOrder(data: any) {
      //  this.dialogService.open(ViewOrderDialogComponent, {
      //     header: 'Order Details',
      //     width: '70%',
      //     data: data
      //   });
  }

  editOrder(data: any) {
      // const ref: DynamicDialogRef = this.dialogService.open(EditOrderDialogComponent, {
      //     header: 'Order Details',
      //     width: '70%',
      //     data: data
      //   });
      //   ref.onClose.subscribe((submittedData: any) => {
      //     if (submittedData) {
      //       console.log('Data returned from dialog:', submittedData);
      //       // Handle returned data here
      //       this.getOrders();
      //     } else {
      //       console.log('close dialog');
      //     }
      //   });
  }

}
